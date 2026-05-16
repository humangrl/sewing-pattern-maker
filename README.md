# sewing-pattern-maker



Summary

Full Next.js 14 (App Router, TypeScript, Tailwind CSS) implementation of the PatternMaker opal.google app

6-step wizard collects a garment reference image plus user context (intended use, skill level, measurements, material choice)

Streaming API route calls Claude claude-sonnet-4-6 with vision to analyze the garment and generate a complete sewing pattern guide as a self-contained HTML document

"Let AI choose material" toggle — Claude examines the garment image and recommends the best fabric with rationale

Guide rendered in a sandboxed <iframe srcDoc> with Download HTML and Print actions

Color palette, step structure, and prompt logic faithful to the original opal.google JSON spec

Getting Started

cp .env.example .env.local

\# Add your Anthropic API key to .env.local

npm install

npm run dev

Then open http://localhost:3000.

