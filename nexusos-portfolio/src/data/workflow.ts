/**
 * How NexusOS is built. Wording is the supplied development workflow,
 * kept as written.
 */

export const workflowIntro =
  "NexusOS is developed using an iterative, modular full-stack development workflow designed to maintain clear separation of concerns, scalability, and maintainability.";

export const workflowSteps = [
  {
    index: "01",
    title: "Architecture & Codebase Structure",
    body: "Defined the application architecture and organized the codebase into modular frontend components, backend services, configuration, and supporting infrastructure.",
  },
  {
    index: "02",
    title: "Frontend Development",
    body: "Built the user interface with React and TypeScript, using reusable components, structured layouts, and interactive elements to deliver a consistent application experience.",
  },
  {
    index: "03",
    title: "Backend Development & API Integration",
    body: "Implemented backend functionality with FastAPI, connecting frontend components to server-side business logic through HTTP APIs and structured data exchange.",
  },
  {
    index: "04",
    title: "Database & Data Management",
    body: "Integrated PostgreSQL for persistent data storage and designed data interactions to support business modules, CRM functionality, and multi-tenant application requirements.",
  },
  {
    index: "05",
    title: "Testing & Quality Assurance",
    body: "Used automated tests, type checking, build validation, and iterative debugging to identify issues, verify functionality, and reduce regressions during development.",
  },
  {
    index: "06",
    title: "Version Control & Iteration",
    body: "Managed source code with Git and GitHub, using commits and isolated branches to track changes, develop features, and maintain separation between application and portfolio work.",
  },
  {
    index: "07",
    title: "Deployment & Production",
    body: "Structured deployment around Vercel for the frontend, Railway for backend services, and Cloudflare for domain infrastructure, with production verification to validate the deployed application.",
  },
] as const;

export const workflowCycle = "Architecture → Implementation → Integration → Testing → Refinement → Deployment";

export const workflowStack = "React · TypeScript · FastAPI · PostgreSQL · Redis · Git · GitHub · Vercel · Railway · Cloudflare";
