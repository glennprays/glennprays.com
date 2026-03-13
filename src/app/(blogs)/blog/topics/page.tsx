import { Metadata } from "next";
import AnimatedSection from "@/components/element/AnimatedSection";
import TopicsList from "@/components/blog/TopicsList";

export const metadata: Metadata = {
    title: "Blog's Topics",
    description: "Topics explored in my blog",
};

export default function TopicsPage() {
    return (
        <AnimatedSection className="min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">
                Blog Topics
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TopicsList />
            </div>
        </AnimatedSection>
    );
}