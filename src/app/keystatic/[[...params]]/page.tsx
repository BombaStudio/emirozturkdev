// src/app/keystatic/[[...params]]/page.tsx
"use client";

import { makePage } from "@keystatic/next/ui/app";
import keystaticConfig from "@/../keystatic.config";

export default makePage(keystaticConfig);
