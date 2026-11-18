// scripts/test-filter-projects.js
import test from "node:test";
import assert from "node:assert";
import { filterProjects } from "../src/lib/filterProjects.ts";

const mockProjects = [
  {
    title: "Talu Engine",
    description: "2D game engine in Rust",
    category: "game",
    technologies: ["Rust", "WolfLang"],
    tags: ["engine", "game"],
    featured: true,
    order: 1,
    date: "2024-05-01",
  },
  {
    title: "Entropy",
    description: "React Native offline task app",
    category: "mobile",
    technologies: ["React Native", "SQLite"],
    tags: ["mobile", "app"],
    featured: true,
    order: 2,
    date: "2024-06-01",
  },
  {
    title: "Ethuzzle",
    description: "Ethereum puzzle game",
    category: "web3",
    technologies: ["Solidity", "Web3"],
    tags: ["web3", "game"],
    featured: false,
    order: 5,
    date: "2024-01-01",
  },
  {
    title: "Lorenz Attractor",
    description: "Chaos simulation in Unity and Godot",
    category: "game",
    technologies: ["Unity", "C#"],
    tags: ["physics", "simulation"],
    featured: false,
    order: 3,
    date: "2024-03-01",
  },
];

test("filterProjects by category 'game'", () => {
  const result = filterProjects(mockProjects, { category: "game" });
  assert.strictEqual(result.length, 2);
  assert.ok(result.every((p) => p.category === "game"));
});

test("filterProjects with category 'all' returns all items", () => {
  const result = filterProjects(mockProjects, { category: "all" });
  assert.strictEqual(result.length, 4);
});

test("filterProjects by tag 'game'", () => {
  const result = filterProjects(mockProjects, { tag: "game" });
  assert.strictEqual(result.length, 2);
});

test("filterProjects by search query 'Rust'", () => {
  const result = filterProjects(mockProjects, { search: "Rust" });
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].title, "Talu Engine");
});

test("filterProjects by featured = true", () => {
  const result = filterProjects(mockProjects, { featured: true });
  assert.strictEqual(result.length, 2);
  assert.ok(result.every((p) => p.featured));
});

test("filterProjects sorts featured first, then by order", () => {
  const result = filterProjects(mockProjects, { category: "all" });
  assert.strictEqual(result[0].title, "Talu Engine"); // featured, order 1
  assert.strictEqual(result[1].title, "Entropy");     // featured, order 2
  assert.strictEqual(result[2].title, "Lorenz Attractor"); // non-featured, order 3
  assert.strictEqual(result[3].title, "Ethuzzle");    // non-featured, order 5
});

test("filterProjects memoization returns identical array reference on repeated calls", () => {
  const res1 = filterProjects(mockProjects, { category: "game" });
  const res2 = filterProjects(mockProjects, { category: "game" });
  assert.strictEqual(res1, res2, "WeakMap cache should return identical object reference");
});

test("filterProjects handles empty array and null options gracefully", () => {
  assert.deepStrictEqual(filterProjects([]), []);
  assert.deepStrictEqual(filterProjects(null), []);
  const res = filterProjects(mockProjects, null);
  assert.strictEqual(res.length, 4);
});

test("filterProjects handles null items within items array gracefully", () => {
  const res = filterProjects([null, mockProjects[0]]);
  assert.strictEqual(res.length, 1);
  assert.strictEqual(res[0].title, mockProjects[0].title);
});
