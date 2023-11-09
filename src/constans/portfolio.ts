import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { stackList, SkillItem } from "./skills";
import personalWebsite from "public/images/portfolio/personal-website.png";
import ipac from "public/images/portfolio/3ipac.png";
import quoteGenerator from "public/images/portfolio/quote-generator.png";
import pomodoroTimer from "public/images/portfolio/pomodoro-timer.png";
import markdownPreviewer from "public/images/portfolio/markdown-previewer.png";
import calculator from "public/images/portfolio/calculator.png";
import drumMachine from "public/images/portfolio/drum-machine.png";
import tixid from "public/images/portfolio/tix-id.png";
import twitterClone from "public/images/portfolio/twitter-clone.png";
import trafficSignDetection from "public/images/portfolio/traffic-sign-detection.png";
import documentationPage from "public/images/portfolio/documentation-page.png";
import productLanding from "public/images/portfolio/product-landing.png";
import sentimentAnalysis from "public/images/portfolio/sentimen-analysis.png";
import surveyForm from "public/images/portfolio/survey-form.png";
import tributePage from "public/images/portfolio/tribute-page.png";
import findYourLove from "public/images/portfolio/find-your-love.png";


export interface PortfolioItem {
    title: string;
    tumbnail: StaticImport;
    stacks: SkillItem[] | undefined;
    description: string;
    url: string;
}

function getSkillItems(skillList: string[]): SkillItem[] {
    const data = stackList;

    const skillItems: SkillItem[] = skillList.flatMap((skillName, index) => {
        const foundSkill = data.find(
            (skill) =>
                skill.name.toLocaleLowerCase() === skillName.toLocaleLowerCase()
        );
        return foundSkill ? [foundSkill] : [];
    });

    return skillItems;
}

export const portfolioItems: PortfolioItem[] = [
    {
        title: "Find Your Love AI",
        tumbnail: findYourLove,
        stacks: getSkillItems(["Python"]),
        description: "This is a python game using pygame library. Implementing Breadth First Search (BFS), Depth First Search (DFS), and Uniform Cost Search (UCS) algorithm.",
        url: "https://github.com/glennprays/pygame-maze",
    },
    {
        title: "Personal Website",
        tumbnail: personalWebsite,
        stacks: getSkillItems(["Next JS", "Typescript", "Tailwind", "Framer", "Contentlayer"]),
        description: "This is my personal website",
        url: "https://github.com/glennprays/glennprays.github.io",
    },
    {
        title: "3rd IPAC 2023",
        tumbnail: ipac,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap", "Vite"]),
        description:
            "As a Frontend Web Developer, I have contributed my expertise to the development web applications tailored for registration, operational management, and service provisioning during the 3rd Indonesia Pathfinder Camporee in 2023. My role encompassed the creation of dynamic and user-centric interfaces, ensuring seamless navigation and optimal user experiences for attendees and stakeholders alike.",
        url: "https://glennprays.tech/files/portfolio-3ipac.pdf",
    },
    {
        title: "Movie Ticketin API",
        tumbnail: tixid,
        stacks: getSkillItems(["Golang", "MySQL"]),
        description:
            "This project aims to develop an application similar to TIX-ID, a well-established platform for booking tickets online. The program uses go-gin as the framework, MySQL as the database.",
        url: "https://github.com/glennprays/tix-id",
    },
    {
        title: "Twitter Clone API",
        tumbnail: twitterClone,
        stacks: getSkillItems(["Golang", "Neo4j"]),
        description:
            "This project just a simple implementation of a social media platform similar to Twitter. The program uses go-gin as the framework, neo4j as the No-SQL Database (Graph Database)",
        url: "https://github.com/glennprays/twitter-clone-api",
    },
    {
        title: "Traffic Sign Detection",
        tumbnail: trafficSignDetection,
        stacks: getSkillItems(["Python"]),
        description:
            "This project presents an approach for detecting traffic signs in the unique context of Indonesia's road environment. Leveraging advanced image processing techniques, specifically the Hue-Saturation-Value (HSV) color space and morphological operations.",
        url: "https://github.com/glennprays/traffic-sign-detection",
    },
    {
        title: "Sentiment Analysis",
        tumbnail: sentimentAnalysis,
        stacks: getSkillItems(["Python"]),
        description:
            "This project presents a sophisticated sentiment analysis implementation utilizing Convolutional Neural Networks (CNN) to analyze and classify sentiments expressed in US airlines' Twitter data. The objective is to harness the power of deep learning techniques to categorize tweets as positive, negative, or neutral sentiments, thereby gaining valuable insights into customer opinions and experiences.",
        url: "https://github.com/glennprays/CNN-Sentiment-Analysis",
    },
    {
        title: "Quote Generator",
        tumbnail: quoteGenerator,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap"]),
        description:
            'This project entails the creation of a "Random Quote Generator" utilizing an array of quotes. With each interaction, the application will present a randomly selected quote from the array to users',
        url: "https://codepen.io/glennpray/pen/oNJNZRv",
    },
    {
        title: "Pomodoro Timer",
        tumbnail: pomodoroTimer,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap"]),
        description:
            'This timer application is designed based on the Pomodoro technique, offering two distinct timer modes: "Session" and "Break". The default duration for a session is set to 25 minutes, while the break interval is set to 5 minutes. However, users have the flexibility to customize these durations according to their preferences.',
        url: "https://codepen.io/glennpray/pen/oNJNZRv",
    },
    {
        title: "Markdown Previewer",
        tumbnail: markdownPreviewer,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap"]),
        description:
            "This project serves the purpose of providing a interface for both previewing and editing Markdown text. It empowers users to create, modify, and visualize Markdown documents with ease.",
        url: "https://codepen.io/glennpray/pen/YzdXZLd",
    },
    {
        title: "Calculator",
        tumbnail: calculator,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap"]),
        description:
            "This project a calculator application developed using the ReactJS. The primary objective behind this endeavor is to provide users with a feature-rich, dynamic, and visually appealing tool for performing calculations.",
        url: "https://codepen.io/glennpray/pen/ZEVGjqE",
    },
    {
        title: "Drum Machine",
        tumbnail: drumMachine,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap"]),
        description:
            "This project implementation of a drum application, designed to with the added versatility of two distinct sound groups.",
        url: "https://codepen.io/glennpray/pen/mdaJwWM",
    },
    {
        title: "Documentation Page",
        tumbnail: documentationPage,
        stacks: getSkillItems(["HTML", "CSS"]),
        description:
            "Simple implementation of technical documentation page.",
        url: "https://codepen.io/glennpray/pen/WNZOaYR",
    },
    {
        title: "Product Landing",
        tumbnail: productLanding,
        stacks: getSkillItems(["HTML", "CSS"]),
        description:
            "This is a simple implementation of Shoes Product landing page.",
        url: "https://codepen.io/glennpray/pen/qBPrQWd",
    },
    {
        title: "Survey Form",
        tumbnail: surveyForm,
        stacks: getSkillItems(["HTML", "CSS"]),
        description:
            "This is a simple Survey Form aplication.",
        url: "https://codepen.io/glennpray/pen/KKXNRpa",
    },
    {
        title: "Tribute Page",
        tumbnail: tributePage,
        stacks: getSkillItems(["HTML", "CSS"]),
        description:
            "Simple webpage of Artist Tribute Page.",
        url: "https://codepen.io/glennpray/pen/eYGZrrq",
    },
];
