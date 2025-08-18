import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx', '**/*.mdoc'], base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
  }),
});

const homepage = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx', '**/*.mdoc'], base: "./src/content/homepage" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
  }),
});

export const collections = { pages, homepage };
