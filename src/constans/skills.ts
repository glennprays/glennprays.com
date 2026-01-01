import javascript from "public/images/icon/stack/javascript.svg"
import typescript from "public/images/icon/stack/typescript.svg"
import golang from "public/images/icon/stack/golang.svg"
import python from "public/images/icon/stack/python.svg"
import html from "public/images/icon/stack/html.svg"
import css from "public/images/icon/stack/css.svg"
import react from "public/images/icon/stack/react.svg"
import next from "public/images/icon/stack/next js.svg"
import tailwind from "public/images/icon/stack/tailwind.svg"
import bootstrap from "public/images/icon/stack/bootstrap.svg"
import framer from "public/images/icon/stack/framer.svg"
import mysql from "public/images/icon/stack/mysql.svg"
import neo4j from "public/images/icon/stack/neo4j.svg"
import node from "public/images/icon/stack/node js.svg"
import vite from "public/images/icon/stack/vite.svg"
import contentlayer from "public/images/icon/stack/contentlayer.svg"
import git from "public/images/icon/tools/git.svg"
import docker from "public/images/icon/tools/docker.svg"
import figma from "public/images/icon/tools/figma.svg"
import flask from "public/images/icon/stack/flask.svg"
import nginx from "public/images/icon/stack/nginx.svg"
import postgresql from "public/images/icon/stack/postgresql.svg"
import svelte from "public/images/icon/stack/svelte.svg"
import mongodb from "public/images/icon/stack/mongo.svg"
import redis from "public/images/icon/stack/redis.svg"
import nestjs from "public/images/icon/stack/nestjs.svg"
import linux from "public/images/icon/tools/linux.svg"
import aws from "public/images/icon/tools/aws.svg"
import cloudflare from "public/images/icon/tools/cloudflare.svg"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
export interface SkillItem {
    name: string,
    icon: StaticImport,
    alt: string,
}

export const stackList: SkillItem[] = [
    {
        name: "Javascript",
        icon: javascript,
        alt: "Javascript Icon",
    },
    {
        name: "TypeScript",
        icon: typescript,
        alt: "TypeScript Icon",
    },
    {
        name: "Golang",
        icon: golang,
        alt: "Golang Icon",
    },
    {
        name: "Flask",
        icon: flask,
        alt: "Flask Icon",
    },
    {
        name: "Nest JS",
        icon: nestjs,
        alt: "Nest JS Icon",
    },
    {
        name: "Python",
        icon: python,
        alt: "Python Icon",
    },
    {
        name: "HTML",
        icon: html,
        alt: "HTML Icon",
    },
    {
        name: "CSS",
        icon: css,
        alt: "CSS Icon",
    },
    {
        name: "React JS",
        icon: react,
        alt: "React JS Icon",
    },
    {
        name: "Next JS",
        icon: next,
        alt: "Next JS Icon",
    },
    {
        name: "Svelte",
        icon: svelte,
        alt: "Svelte Icon",
    },
    {
        name: "Tailwind",
        icon: tailwind,
        alt: "Tailwind Icon",
    },
    {
        name: "Bootstrap",
        icon: bootstrap,
        alt: "Bootstrap Icon",
    },
    {
        name: "Contentlayer",
        icon: contentlayer,
        alt: "Contentlayer Icon",
    },
    {
        name: "Framer",
        icon: framer,
        alt: "Framer Motion Icon",
    },
    {
        name: "MySQL",
        icon: mysql,
        alt: "MySQL Icon",
    },
    {
        name: "PostgreSQL",
        icon: postgresql,
        alt: "PostgreSQL Icon",
    },
    {
        name: "MongoDB",
        icon: mongodb,
        alt: "MongoDB Icon",
    },
    {
        name: "Redis",
        icon: redis,
        alt: "Redis Icon",
    },
    {
        name: "Neo4j",
        icon: neo4j,
        alt: "Neo4j",
    },
    {
        name: "Nginx",
        icon: nginx,
        alt: "Nginx Icon",
    },
    {
        name: "Node JS",
        icon: node,
        alt: "Node JS Icon",
    },
    {
        name: "Vite",
        icon: vite,
        alt: "Vite Icon",
    },
]

export const toolsList: SkillItem[] = [
    {
        name: "Linux",
        icon: linux,
        alt: "Linux Icon"
    },
    {
        name: "Git",
        icon: git,
        alt: "Git Icon"
    },
    {
        name: "AWS",
        icon: aws,
        alt: "AWS Icon"
    },
    {
        name: "Cloudflare",
        icon: cloudflare,
        alt: "Cloudflare Icon"
    },
    {
        name: "Docker",
        icon: docker,
        alt: "Docker Icon"
    },
    {
        name: "Figma",
        icon: figma,
        alt: "Figma Icon"
    },
]