import { hostName } from "@/constans/general";

export function PersonJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Glenn Pray",
        url: hostName,
        image: `${hostName}/images/profile-transparent-bg.png`,
        jobTitle: "Software Engineer",
        description:
            "Software Engineering enthusiast with a practical mindset and a strong drive for continuous growth. Experienced in building scalable and efficient software systems.",
        sameAs: [
            "https://github.com/glennpray",
            "https://linkedin.com/in/glennpray",
            "https://instagram.com/glennprays",
        ],
        knowsAbout: [
            "Software Engineering",
            "Web Development",
            "Data Science",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function WebsiteJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "glennprays",
        url: hostName,
        description:
            "Personal portfolio and blog of Glenn Pray - Software Engineer",
        author: {
            "@type": "Person",
            name: "Glenn Pray",
        },
        potentialAction: {
            "@type": "SearchAction",
            target: `${hostName}/blog?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export default function JsonLd() {
    return (
        <>
            <PersonJsonLd />
            <WebsiteJsonLd />
        </>
    );
}
