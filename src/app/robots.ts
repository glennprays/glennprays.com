import { MetadataRoute } from "next";
import { hostName } from "@/constans/general";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${hostName}/sitemap.xml`,
    };
}
