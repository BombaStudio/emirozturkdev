// src/middleware.ts

import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/keystatic",
    "/keystatic/:path*",
  ],
};

const GITHUB_REPO = process.env.KEYSTATIC_REPO || "BombaStudio/emirozturkdev";

export async function middleware(req: NextRequest) {
  // 1. Bypass route protection in non-production environments
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  // 2. Extract Keystatic GitHub access token cookie
  const token = req.cookies.get("keystatic-gh-access-token")?.value;

  // 3. Unauthenticated -> Redirect to Keystatic GitHub OAuth login
  if (!token) {
    const loginUrl = new URL("/api/keystatic/github/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Verify GitHub write permissions for the repository
  try {
    const ghRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "emirozturkdev-route-guard",
      },
    });

    // Token expired or invalid -> delete cookie and re-authenticate
    if (ghRes.status === 401) {
      const loginUrl = new URL("/api/keystatic/github/login", req.url);
      loginUrl.searchParams.set("from", req.nextUrl.pathname);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete("keystatic-gh-access-token");
      return res;
    }

    // Repository not accessible (private repo or forbidden)
    if (!ghRes.ok) {
      return new NextResponse(
        `Forbidden: Access restricted to accounts with write permissions to ${GITHUB_REPO}.`,
        {
          status: 403,
          headers: { "Content-Type": "text/plain" },
        }
      );
    }

    const data = (await ghRes.json()) as {
      permissions?: {
        push?: boolean;
        admin?: boolean;
      };
    };

    const hasWritePermission = Boolean(
      data.permissions?.push || data.permissions?.admin
    );

    if (!hasWritePermission) {
      return new NextResponse(
        `Forbidden: Access restricted to accounts with write permissions to ${GITHUB_REPO}.`,
        {
          status: 403,
          headers: { "Content-Type": "text/plain" },
        }
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Keystatic route protection error:", error);
    return new NextResponse(
      "Internal Server Error: Unable to verify GitHub repository permissions.",
      {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      }
    );
  }
}
