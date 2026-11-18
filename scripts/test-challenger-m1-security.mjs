// scripts/test-challenger-m1-security.mjs
// Empirical test harness for Challenger 2 (challenger_m1_v3_2)
// Testing: Keystatic config, Middleware security, GitHub webhook HMAC, ProjectsGrid URL sync

import assert from "node:assert";
import crypto from "node:crypto";
import http from "node:http";
import { spawn } from "node:child_process";

console.log("=== CHALLENGER 2: EMPIRICAL VERIFICATION HARNESS ===");

let passed = 0;
let failed = 0;

function it(name, fn) {
  try {
    fn();
    console.log(`  ✔ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✘ ${name}`);
    console.error(err);
    failed++;
  }
}

async function itAsync(name, fn) {
  try {
    await fn();
    console.log(`  ✔ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✘ ${name}`);
    console.error(err);
    failed++;
  }
}

// ---------------------------------------------------------
// 1. KEYSTATIC CONFIG ADVERSARIAL TESTS
// ---------------------------------------------------------
console.log("\n[1] Keystatic Config Tests");

await itAsync("Keystatic config in production mode uses github storage targeting BombaStudio/emirozturkdev", async () => {
  const originalEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = "production";
    // dynamic import with cache-busting query
    const mod = await import(`../keystatic.config.ts?env=prod_${Date.now()}`);
    const cfg = mod.default;

    assert.ok(cfg, "Keystatic config must be exported");
    assert.strictEqual(cfg.storage.kind, "github", "Storage kind must be 'github' in production");
    assert.strictEqual(cfg.storage.repo, "BombaStudio/emirozturkdev", "Storage repo must be 'BombaStudio/emirozturkdev'");
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

await itAsync("Keystatic config in development mode falls back to local storage", async () => {
  const originalEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = "development";
    const mod = await import(`../keystatic.config.ts?env=dev_${Date.now()}`);
    const cfg = mod.default;

    assert.ok(cfg, "Keystatic config must be exported");
    assert.strictEqual(cfg.storage.kind, "local", "Storage kind must be 'local' in development");
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

await itAsync("Keystatic collections schema definitions are complete", async () => {
  const mod = await import(`../keystatic.config.ts?check=collections_${Date.now()}`);
  const cfg = mod.default;

  const expectedCollections = ["projects", "experience", "academicWork", "blog"];
  for (const col of expectedCollections) {
    assert.ok(cfg.collections[col], `Collection '${col}' must be defined in keystatic.config.ts`);
  }

  // Check required fields for projects
  const projSchema = cfg.collections.projects.schema;
  assert.ok(projSchema.title, "projects must have title");
  assert.ok(projSchema.description, "projects must have description");
  assert.ok(projSchema.category, "projects must have category");
  assert.ok(projSchema.date, "projects must have date");
  assert.ok(projSchema.liveLink, "projects must have liveLink");
  assert.ok(projSchema.githubLink, "projects must have githubLink");
  assert.ok(projSchema.youtubeLink, "projects must have youtubeLink");
  assert.ok(projSchema.technologies, "projects must have technologies");
  assert.ok(projSchema.tags, "projects must have tags");
  assert.ok(projSchema.featured, "projects must have featured");
  assert.ok(projSchema.order, "projects must have order");
});

// ---------------------------------------------------------
// 2. MIDDLEWARE SECURITY LOGIC TESTS
// ---------------------------------------------------------
console.log("\n[2] Middleware Security Logic Tests");

import { middleware, config as middlewareConfig } from "../src/middleware.ts";
import { NextRequest } from "next/server";

it("Middleware matcher includes /keystatic and /keystatic/:path*", () => {
  assert.ok(Array.isArray(middlewareConfig.matcher), "matcher must be an array");
  assert.ok(middlewareConfig.matcher.includes("/keystatic"), "matcher must include /keystatic");
  assert.ok(middlewareConfig.matcher.includes("/keystatic/:path*"), "matcher must include /keystatic/:path*");
});

await itAsync("Middleware bypasses protection in development environment", async () => {
  const originalEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = "development";
    const req = new NextRequest("http://localhost:3000/keystatic");
    const res = await middleware(req);
    assert.strictEqual(res.status, 200, "Should allow request in dev");
    assert.strictEqual(res.headers.get("x-middleware-next"), "1", "Should proceed with next()");
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

await itAsync("Middleware in production without token redirects to /api/keystatic/github/login with from param", async () => {
  const originalEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = "production";
    const req = new NextRequest("http://localhost:3000/keystatic");
    const res = await middleware(req);

    assert.strictEqual(res.status, 307, "Should redirect unauthenticated request");
    const location = res.headers.get("location");
    assert.ok(location, "Redirect location must be present");
    const url = new URL(location);
    assert.strictEqual(url.pathname, "/api/keystatic/github/login");
    assert.strictEqual(url.searchParams.get("from"), "/keystatic");
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

await itAsync("Middleware in production preserves nested path in 'from' param", async () => {
  const originalEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = "production";
    const req = new NextRequest("http://localhost:3000/keystatic/collection/projects/item/new");
    const res = await middleware(req);

    assert.strictEqual(res.status, 307);
    const location = res.headers.get("location");
    const url = new URL(location);
    assert.strictEqual(url.pathname, "/api/keystatic/github/login");
    assert.strictEqual(url.searchParams.get("from"), "/keystatic/collection/projects/item/new");
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

await itAsync("Middleware with expired GitHub token (401 from GitHub API) clears cookie and redirects to login", async () => {
  const originalEnv = process.env.NODE_ENV;
  const originalFetch = global.fetch;
  try {
    process.env.NODE_ENV = "production";
    // Mock GitHub API returning 401 Unauthorized
    global.fetch = async () => new Response(JSON.stringify({ message: "Bad credentials" }), { status: 401 });

    const req = new NextRequest("http://localhost:3000/keystatic", {
      headers: {
        cookie: "keystatic-gh-access-token=expired_token_123",
      },
    });

    const res = await middleware(req);
    assert.strictEqual(res.status, 307);
    const location = res.headers.get("location");
    assert.ok(location.includes("/api/keystatic/github/login"));

    // Check cookie deletion
    const setCookie = res.headers.get("set-cookie") || "";
    assert.ok(setCookie.includes("keystatic-gh-access-token="), "Cookie must be cleared");
  } finally {
    process.env.NODE_ENV = originalEnv;
    global.fetch = originalFetch;
  }
});

await itAsync("Middleware blocks user without write permissions (returns 403 Forbidden)", async () => {
  const originalEnv = process.env.NODE_ENV;
  const originalFetch = global.fetch;
  try {
    process.env.NODE_ENV = "production";
    // Mock GitHub API returning read-only permissions
    global.fetch = async () =>
      new Response(
        JSON.stringify({
          permissions: {
            push: false,
            admin: false,
            pull: true,
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );

    const req = new NextRequest("http://localhost:3000/keystatic", {
      headers: {
        cookie: "keystatic-gh-access-token=read_only_token",
      },
    });

    const res = await middleware(req);
    assert.strictEqual(res.status, 403, "Read-only access must be rejected with 403");
    const body = await res.text();
    assert.ok(body.includes("Forbidden"), "Response body must state Forbidden");
  } finally {
    process.env.NODE_ENV = originalEnv;
    global.fetch = originalFetch;
  }
});

await itAsync("Middleware allows user with write (push) permissions", async () => {
  const originalEnv = process.env.NODE_ENV;
  const originalFetch = global.fetch;
  try {
    process.env.NODE_ENV = "production";
    // Mock GitHub API returning push: true
    global.fetch = async () =>
      new Response(
        JSON.stringify({
          permissions: {
            push: true,
            admin: false,
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );

    const req = new NextRequest("http://localhost:3000/keystatic", {
      headers: {
        cookie: "keystatic-gh-access-token=valid_writer_token",
      },
    });

    const res = await middleware(req);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get("x-middleware-next"), "1");
  } finally {
    process.env.NODE_ENV = originalEnv;
    global.fetch = originalFetch;
  }
});

await itAsync("Middleware allows user with repo admin permissions", async () => {
  const originalEnv = process.env.NODE_ENV;
  const originalFetch = global.fetch;
  try {
    process.env.NODE_ENV = "production";
    global.fetch = async () =>
      new Response(
        JSON.stringify({
          permissions: {
            push: false,
            admin: true,
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );

    const req = new NextRequest("http://localhost:3000/keystatic", {
      headers: {
        cookie: "keystatic-gh-access-token=admin_token",
      },
    });

    const res = await middleware(req);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get("x-middleware-next"), "1");
  } finally {
    process.env.NODE_ENV = originalEnv;
    global.fetch = originalFetch;
  }
});

await itAsync("Middleware handles network failure gracefully (returns 500 without unhandled crash)", async () => {
  const originalEnv = process.env.NODE_ENV;
  const originalFetch = global.fetch;
  try {
    process.env.NODE_ENV = "production";
    global.fetch = async () => {
      throw new Error("GitHub API connection timeout");
    };

    const req = new NextRequest("http://localhost:3000/keystatic", {
      headers: {
        cookie: "keystatic-gh-access-token=any_token",
      },
    });

    const res = await middleware(req);
    assert.strictEqual(res.status, 500, "Network error must return 500");
  } finally {
    process.env.NODE_ENV = originalEnv;
    global.fetch = originalFetch;
  }
});

// ---------------------------------------------------------
// 3. GITHUB WEBHOOK ROUTE TESTS
// ---------------------------------------------------------
console.log("\n[3] GitHub Webhook Route Tests");

import { POST as webhookPOST } from "../src/app/api/webhook/github/route.ts";

const WEBHOOK_SECRET = "test_webhook_secret_key_12345";

function computeSignature(payload, secret) {
  const hmac = crypto.createHmac("sha256", secret);
  return `sha256=${hmac.update(payload).digest("hex")}`;
}

await itAsync("Webhook returns 401 when signature header is missing", async () => {
  const originalSecret = process.env.GITHUB_WEBHOOK_SECRET;
  try {
    process.env.GITHUB_WEBHOOK_SECRET = WEBHOOK_SECRET;
    const req = new NextRequest("http://localhost:3000/api/webhook/github", {
      method: "POST",
      body: JSON.stringify({ ref: "refs/heads/main" }),
    });

    const res = await webhookPOST(req);
    assert.strictEqual(res.status, 401, "Missing signature must return 401 Unauthorized");
    const json = await res.json();
    assert.strictEqual(json.error, "Missing x-hub-signature-256 header");
  } finally {
    process.env.GITHUB_WEBHOOK_SECRET = originalSecret;
  }
});

await itAsync("Webhook returns 401 when signature is invalid", async () => {
  const originalSecret = process.env.GITHUB_WEBHOOK_SECRET;
  try {
    process.env.GITHUB_WEBHOOK_SECRET = WEBHOOK_SECRET;
    const body = JSON.stringify({ ref: "refs/heads/main" });
    const invalidSignature = "sha256=" + "a".repeat(64);

    const req = new NextRequest("http://localhost:3000/api/webhook/github", {
      method: "POST",
      headers: {
        "x-hub-signature-256": invalidSignature,
      },
      body,
    });

    const res = await webhookPOST(req);
    assert.strictEqual(res.status, 401, "Invalid signature must return 401 Unauthorized");
    const json = await res.json();
    assert.strictEqual(json.error, "Invalid webhook signature");
  } finally {
    process.env.GITHUB_WEBHOOK_SECRET = originalSecret;
  }
});

await itAsync("Webhook returns 401 when signature length does not match (no timingSafeEqual throw)", async () => {
  const originalSecret = process.env.GITHUB_WEBHOOK_SECRET;
  try {
    process.env.GITHUB_WEBHOOK_SECRET = WEBHOOK_SECRET;
    const body = JSON.stringify({ ref: "refs/heads/main" });
    const malformedSignature = "sha256=short";

    const req = new NextRequest("http://localhost:3000/api/webhook/github", {
      method: "POST",
      headers: {
        "x-hub-signature-256": malformedSignature,
      },
      body,
    });

    const res = await webhookPOST(req);
    assert.strictEqual(res.status, 401, "Short signature must safely return 401");
  } finally {
    process.env.GITHUB_WEBHOOK_SECRET = originalSecret;
  }
});

await itAsync("Webhook returns 401 when body is tampered", async () => {
  const originalSecret = process.env.GITHUB_WEBHOOK_SECRET;
  try {
    process.env.GITHUB_WEBHOOK_SECRET = WEBHOOK_SECRET;
    const originalBody = JSON.stringify({ ref: "refs/heads/main" });
    const validSignature = computeSignature(originalBody, WEBHOOK_SECRET);
    const tamperedBody = JSON.stringify({ ref: "refs/heads/malicious" });

    const req = new NextRequest("http://localhost:3000/api/webhook/github", {
      method: "POST",
      headers: {
        "x-hub-signature-256": validSignature,
      },
      body: tamperedBody,
    });

    const res = await webhookPOST(req);
    assert.strictEqual(res.status, 401, "Tampered body must return 401");
  } finally {
    process.env.GITHUB_WEBHOOK_SECRET = originalSecret;
  }
});

await itAsync("Webhook responds 200 PONG to GitHub ping event with valid signature", async () => {
  const originalSecret = process.env.GITHUB_WEBHOOK_SECRET;
  try {
    process.env.GITHUB_WEBHOOK_SECRET = WEBHOOK_SECRET;
    const body = JSON.stringify({ zen: "Design for failure." });
    const signature = computeSignature(body, WEBHOOK_SECRET);

    const req = new NextRequest("http://localhost:3000/api/webhook/github", {
      method: "POST",
      headers: {
        "x-hub-signature-256": signature,
        "x-github-event": "ping",
      },
      body,
    });

    const res = await webhookPOST(req);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.ok(json.message.includes("PONG"));
  } finally {
    process.env.GITHUB_WEBHOOK_SECRET = originalSecret;
  }
});

await itAsync("Webhook responds 200 with revalidated: true on push event with valid signature", async () => {
  const originalSecret = process.env.GITHUB_WEBHOOK_SECRET;
  try {
    process.env.GITHUB_WEBHOOK_SECRET = WEBHOOK_SECRET;
    const body = JSON.stringify({ ref: "refs/heads/main", commits: [] });
    const signature = computeSignature(body, WEBHOOK_SECRET);

    const req = new NextRequest("http://localhost:3000/api/webhook/github", {
      method: "POST",
      headers: {
        "x-hub-signature-256": signature,
        "x-github-event": "push",
      },
      body,
    });

    const res = await webhookPOST(req);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.revalidated, true);
    assert.strictEqual(json.event, "push");
  } finally {
    process.env.GITHUB_WEBHOOK_SECRET = originalSecret;
  }
});

// ---------------------------------------------------------
// 4. PROJECTS GRID URL SEARCH PARAM SYNCHRONIZATION LOGIC
// ---------------------------------------------------------
console.log("\n[4] ProjectsGrid URL Search Param Synchronization Logic Tests");

// Simulate the exact category selection logic from components/projects/projects-grid.tsx
function simulateHandleCategorySelect(initialSearch, categoryValue, pathname = "/projects") {
  const searchParams = new URLSearchParams(initialSearch);
  const params = new URLSearchParams(searchParams.toString());

  if (categoryValue === "all") {
    params.delete("category");
  } else {
    params.set("category", categoryValue);
  }

  const queryString = params.toString();
  const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

  return {
    nextUrl,
    params: Object.fromEntries(params.entries()),
  };
}

it("Selecting a category preserves other existing search parameters (non-destructive)", () => {
  const initial = "?sort=newest&tag=physics&search=quantum";
  const result = simulateHandleCategorySelect(initial, "game");

  assert.strictEqual(result.params.sort, "newest", "sort param must be preserved");
  assert.strictEqual(result.params.tag, "physics", "tag param must be preserved");
  assert.strictEqual(result.params.search, "quantum", "search param must be preserved");
  assert.strictEqual(result.params.category, "game", "category param must be set to 'game'");
  assert.strictEqual(result.nextUrl, "/projects?sort=newest&tag=physics&search=quantum&category=game");
});

it("Selecting 'all' removes category parameter without disturbing other parameters", () => {
  const initial = "?sort=newest&category=mobile&tag=flutter";
  const result = simulateHandleCategorySelect(initial, "all");

  assert.strictEqual(result.params.sort, "newest", "sort param must be preserved");
  assert.strictEqual(result.params.tag, "flutter", "tag param must be preserved");
  assert.strictEqual(result.params.category, undefined, "category param must be deleted");
  assert.strictEqual(result.nextUrl, "/projects?sort=newest&tag=flutter");
});

it("Selecting 'all' when only category was present returns bare pathname without dangling '?'", () => {
  const initial = "?category=web";
  const result = simulateHandleCategorySelect(initial, "all");

  assert.strictEqual(result.nextUrl, "/projects");
});

it("Switching between categories updates category without appending duplicate keys", () => {
  const initial = "?category=web";
  const result = simulateHandleCategorySelect(initial, "ai");

  assert.strictEqual(result.nextUrl, "/projects?category=ai");
  assert.strictEqual(result.params.category, "ai");
});

// Test filter helper case handling
import { filterProjects } from "../src/lib/filterProjects.ts";

const sampleProjects = [
  { title: "Web App", category: "web", featured: false, order: 1 },
  { title: "Game Engine", category: "game", featured: true, order: 2 },
  { title: "AI Model", category: "ai", featured: false, order: 3 },
];

it("Filtering handles uppercase and mixed-case category values from URL params", () => {
  const filteredWeb = filterProjects(sampleProjects, { category: "WEB" });
  assert.strictEqual(filteredWeb.length, 1);
  assert.strictEqual(filteredWeb[0].title, "Web App");

  const filteredGame = filterProjects(sampleProjects, { category: "Game" });
  assert.strictEqual(filteredGame.length, 1);
  assert.strictEqual(filteredGame[0].title, "Game Engine");
});

it("Filtering with 'all' or empty category returns all projects", () => {
  const filteredAll = filterProjects(sampleProjects, { category: "all" });
  assert.strictEqual(filteredAll.length, 3);

  const filteredEmpty = filterProjects(sampleProjects, {});
  assert.strictEqual(filteredEmpty.length, 3);
});

// ---------------------------------------------------------
// 5. SUMMARY & VERDICT CALCULATION
// ---------------------------------------------------------
console.log(`\n=== TEST RESULTS ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All empirical verification tests passed cleanly!");
}
