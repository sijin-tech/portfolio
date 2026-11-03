// Single source of truth for the site. Edit content here, not in components.

// Public URL, used for link previews and the sitemap. Set NEXT_PUBLIC_SITE_URL once you
// have a custom domain; on Vercel the production URL is picked up automatically.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const profile = {
  name: "Sijin S",
  role: "Software Engineer · Full Stack Developer",
  location: "Trivandrum, Kerala, India",
  // Shown in the hero badge and the link-preview image.
  availability: "Trivandrum, India",
  email: "sijinsunil1999@gmail.com",
  linkedin: "https://www.linkedin.com/in/sijin-s-4a1121217",
  github: "https://github.com/sijin-tech",
  resume: "/Sijin_S_Resume.pdf",
  years: "4+",
  summary:
    "Full-stack software engineer with 4+ years of experience building web applications and serverless backends with React, Next.js, Node.js, NestJS and AWS. Experienced in authentication (AWS Cognito, Keycloak, OAuth 2.0), payment gateway integration (Stripe, CCV) and AI features using LangChain, LangGraph, RAG and hybrid search.",
};

export const job = {
  title: "Software Engineer",
  company: "Wiiz Business Solutions Pvt. Ltd.",
  place: "Trivandrum, Kerala",
  start: "Aug 2022",
  industries: ["Telecom", "Healthcare", "Enterprise AI"],
  highlights: [
    "Built and maintained full-stack web applications with React.js, Next.js, Node.js, Express.js and NestJS for clients in telecom, healthcare and enterprise AI.",
    "Designed REST APIs and data models on MongoDB and DynamoDB, and deployed serverless services on AWS Lambda.",
    "Implemented authentication and single sign-on with AWS Cognito and Keycloak (OAuth 2.0, JWT).",
    "Integrated Stripe and CCV payment gateways for subscriptions and one-time payments.",
    "Built event-driven processing with AWS SQS and email notifications with AWS SES.",
    "Developed AI features with LangChain and LangGraph, including RAG pipelines and hybrid search over a vector database and Neo4j knowledge graph.",
    "Built a React Native book-reading mobile app for school students.",
    "Worked in Agile sprints with product and QA teams; reviewed code and mentored junior developers.",
  ],
};

export const education = {
  degree: "B.Tech in Information Technology",
  school: "University College of Engineering, Kariavattom",
  university: "University of Kerala",
  years: "2018 – 2022",
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  domain: string;
  stack: string[];
  points: string[];
};

export const projects: Project[] = [
  {
    slug: "chordian",
    name: "Chordian",
    tagline: "AI Data Intelligence Platform",
    domain: "Enterprise AI",
    stack: ["Next.js", "MongoDB", "Keycloak", "LangChain", "LangGraph", "Qdrant", "Neo4j"],
    points: [
      "Built RAG and hybrid search over Qdrant and Neo4j for a multi-tenant enterprise AI platform, combining vector similarity, graph relationships and reranking.",
      "Implemented Keycloak OAuth sign-in so AI assistants such as ChatGPT and Claude can connect through MCP.",
    ],
  },
  {
    slug: "milta",
    name: "Milta",
    tagline: "B2B Telecom Dealer Platform",
    domain: "Telecom",
    stack: ["Next.js", "Node.js", "MongoDB", "CCV"],
    points: [
      "Integrated the CCV payment gateway for secure online payments of telecom orders.",
      "Built Next.js pages and Node.js REST APIs with MongoDB for the dealer platform.",
    ],
  },
  {
    slug: "envision",
    name: "Envision",
    tagline: "Project Proposal & Management Platform",
    domain: "Enterprise",
    stack: ["React.js", "NestJS", "DynamoDB", "AWS Lambda"],
    points: [
      "Built the React frontend and NestJS serverless APIs for project proposals, resource allocation and approval workflows.",
    ],
  },
  {
    slug: "speech4all",
    name: "Speech4all",
    tagline: "Clinical Software Platform",
    domain: "Healthcare",
    stack: ["React.js", "NestJS", "AWS Cognito", "DynamoDB", "AWS Lambda"],
    points: [
      "Built the React frontend and NestJS serverless APIs connecting practitioners and clients.",
      "Added Cognito authentication and an admin module.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React.js", "Next.js", "React Native", "JavaScript", "TypeScript", "HTML", "CSS"] },
  { group: "Backend", items: ["Node.js", "Express.js", "NestJS", "REST APIs", "Python (basic)"] },
  { group: "Databases", items: ["MongoDB", "DynamoDB", "Neo4j", "Qdrant"] },
  { group: "AWS & Cloud", items: ["Lambda", "Serverless Framework", "SQS", "SES", "Cognito"] },
  { group: "Auth & Payments", items: ["Keycloak", "OAuth 2.0", "SSO", "JWT", "Stripe", "CCV"] },
  { group: "AI & LLM", items: ["LangChain", "LangGraph", "RAG", "Hybrid Search", "Embeddings"] },
  { group: "Tools", items: ["Git", "Postman", "Jira", "VS Code"] },
];
