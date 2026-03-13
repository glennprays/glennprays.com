import Contact from "./_sections/Contact";
import HomePage from "./_sections/HomePage";
import Portfolio from "./_sections/Portfolio";
import Skills from "./_sections/Skills";
import Resume from "./_sections/Resume";
import BlogPreview from "./_sections/BlogPreview";

export default function Home() {
    return (
        <>
            <HomePage />
            <Skills />
            <Resume />
            <Portfolio />
            <BlogPreview />
            <Contact />
        </>
    );
}
