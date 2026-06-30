import Image from "next/image";

export default function Figure({
    src,
    alt = "",
    caption,
}: {
    src: string;
    alt?: string;
    caption?: string;
}) {
    return (
        <figure className="not-prose my-8">
            <Image
                src={src}
                alt={alt || caption || "Figure"}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 720px"
                className="h-auto w-full rounded-xl border border-neutral-200 dark:border-neutral-800"
            />
            {caption && (
                <figcaption className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
