import { SnippetItem } from "@/frontend/types/snippet";
import { flutterSnippets } from "./flutterSnippets";
import { flutterComponents } from "./flutterComponents";
import { webBackendSnippets } from "./webBackendSnippets";

export const initialSnippets: SnippetItem[] = [
  ...flutterSnippets,
  ...flutterComponents,
  ...webBackendSnippets,
];

export const initialCategories = [
  "All",
  "Authentication",
  "UI Components",
  "Payment Gateway",
  "Backend API",
  "State Management",
  "Firebase",
];

export const initialTechnologies = [
  "Flutter",
  "React",
  "Backend",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Dart",
];

