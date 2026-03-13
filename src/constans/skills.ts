import javascript from "public/images/icon/stack/javascript.svg"
import typescript from "public/images/icon/stack/typescript.svg"
import golang from "public/images/icon/stack/golang.svg"
import python from "public/images/icon/stack/python.svg"
import react from "public/images/icon/stack/react.svg"
import next from "public/images/icon/stack/next js.svg"
import svelte from "public/images/icon/stack/svelte.svg"
import tailwind from "public/images/icon/stack/tailwind.svg"
import node from "public/images/icon/stack/node js.svg"
import nestjs from "public/images/icon/stack/nestjs.svg"
import flask from "public/images/icon/stack/flask.svg"
import postgresql from "public/images/icon/stack/postgresql.svg"
import mysql from "public/images/icon/stack/mysql.svg"
import mongodb from "public/images/icon/stack/mongo.svg"
import redis from "public/images/icon/stack/redis.svg"
import neo4j from "public/images/icon/stack/neo4j.svg"
import docker from "public/images/icon/tools/docker.svg"
import kubernetes from "public/images/icon/tools/kubernetes.svg"
import rabbitmq from "public/images/icon/tools/rabbitmq.svg"
import nginx from "public/images/icon/stack/nginx.svg"
import linux from "public/images/icon/tools/linux.svg"
import aws from "public/images/icon/tools/aws.svg"
import cloudflare from "public/images/icon/tools/cloudflare.svg"
import git from "public/images/icon/tools/git.svg"
import figma from "public/images/icon/tools/figma.svg"
import vite from "public/images/icon/stack/vite.svg"
import contentlayer from "public/images/icon/stack/contentlayer.svg"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

export interface SkillItem {
    name: string,
    icon: StaticImport,
    alt: string,
}

// Core expertise items with descriptions
export const coreExpertise = [
    {
        title: "Engineering Team Leadership",
        description: "Guiding development teams through technical decisions, code reviews, and project delivery",
    },
    {
        title: "Backend & API Development",
        description: "Building reliable, well-structured services using Go and Node.js with clean API design",
    },
    {
        title: "Scalable Web Systems",
        description: "Designing applications that remain performant and maintainable as usage grows",
    },
    {
        title: "Cloud-Ready Applications",
        description: "Containerized apps designed for deployment on cloud platforms with proper infrastructure",
    },
    {
        title: "Data-Driven Systems",
        description: "Working with relational, document, cache, and graph databases to match data needs",
    },
    {
        title: "Distributed Systems & Messaging",
        description: "Building resilient systems with message queues, async processing, and container orchestration",
    },

]

// Engineering capabilities (text only, no icons)
export const engineeringCapabilities = [
    "System Design",
    "Technical Translation",
    "Team Leadership",
    "Code Review & Mentorship",
    "Project Planning",
    "Analytical Thinking",
    "Trade-off Analysis",
    "REST API Design",
    "Database Optimization",
    "Caching Strategies",
    "Authentication & Authorization",
    "Container Orchestration",
    "Linux Deployment",
    "Performance Tuning",
    "Git Workflows",
    "Message Queues",
]

// Grouped tech stack
export const techStackGroups = {
    languages: [
        { name: "Go", icon: golang, alt: "Go Icon" },
        { name: "TypeScript", icon: typescript, alt: "TypeScript Icon" },
        { name: "JavaScript", icon: javascript, alt: "JavaScript Icon" },
        { name: "Python", icon: python, alt: "Python Icon" },
    ],
    frontend: [
        { name: "React", icon: react, alt: "React Icon" },
        { name: "Next.js", icon: next, alt: "Next.js Icon" },
        { name: "Svelte", icon: svelte, alt: "Svelte Icon" },
        { name: "Tailwind CSS", icon: tailwind, alt: "Tailwind Icon" },
    ],
    backend: [
        { name: "Node.js", icon: node, alt: "Node.js Icon" },
        { name: "NestJS", icon: nestjs, alt: "NestJS Icon" },
        { name: "Flask", icon: flask, alt: "Flask Icon" },
    ],
    databases: [
        { name: "PostgreSQL", icon: postgresql, alt: "PostgreSQL Icon" },
        { name: "MySQL", icon: mysql, alt: "MySQL Icon" },
        { name: "MongoDB", icon: mongodb, alt: "MongoDB Icon" },
        { name: "Redis", icon: redis, alt: "Redis Icon" },
        { name: "Neo4j", icon: neo4j, alt: "Neo4j Icon" },
    ],
    cloudInfra: [
        { name: "AWS", icon: aws, alt: "AWS Icon" },
        { name: "Docker", icon: docker, alt: "Docker Icon" },
        { name: "Kubernetes", icon: kubernetes, alt: "Kubernetes Icon" },
        { name: "RabbitMQ", icon: rabbitmq, alt: "RabbitMQ Icon" },
        { name: "Nginx", icon: nginx, alt: "Nginx Icon" },
        { name: "Linux", icon: linux, alt: "Linux Icon" },
        { name: "Cloudflare", icon: cloudflare, alt: "Cloudflare Icon" },
    ],
    tooling: [
        { name: "Git", icon: git, alt: "Git Icon" },
        { name: "Figma", icon: figma, alt: "Figma Icon" },
        { name: "Vite", icon: vite, alt: "Vite Icon" },
        { name: "Contentlayer", icon: contentlayer, alt: "Contentlayer Icon" },
    ],
}

// Combined stack list for backward compatibility with portfolio
export const stackList: SkillItem[] = [
    ...techStackGroups.languages,
    ...techStackGroups.frontend,
    ...techStackGroups.backend,
    ...techStackGroups.databases,
    ...techStackGroups.cloudInfra,
    ...techStackGroups.tooling,
]