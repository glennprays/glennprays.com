import Provider from "@/components/middleware/provider";
import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { hostName } from "@/constans/general";

const fontFamily = Poppins({
    weight: ["100", "200", "400", "500", "600", "700", "800", "900", "300"],
    subsets: ["latin"],
});

export const metadata = {
    metadataBase: new URL(hostName),
    title: {
        default: "Homepage",
        template: `%s | glennprays;`,
    },
    description:
        "Hello, i'm Glenn Pray. Here, you will find a comprehensive collection of my professional journey, including my resume, portfolio, showcased projects, and blog posts.",
    viewport: {
        width: "device-width",
        height: "device-height",
        initialScale: 1,
        maximumScale: 1,
        minimumScale: 1,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={fontFamily.className}>
                <Provider>
                    <div className="bg-neutral-200 dark:bg-neutral-900">
                        <div className="min-h-screen w-full overflow-x-hidden flex flex-col pt-24">
                            {children}
                        </div>
                        <Footer />
                    </div>
                </Provider>
            </body>
        </html>
    );
}
