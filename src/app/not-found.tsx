import { hostName } from '@/constans/general';
import { Metadata } from 'next';
import Link from 'next/link';
import notFoundImage from 'public/images/not-found-image.png';

const baseURL = new URL(hostName);
const notFoundImageURL = new URL(notFoundImage.src, baseURL);
export const metadata: Metadata = {
    metadataBase: baseURL,
    title: "This page cound not be found.",
    description: "This page cound not be found.",
    openGraph: {
        title: "This page cound not be found.",
        description: "This page cound not be found.",
        siteName: "glennprays.com",
        images: notFoundImageURL.href,
    },
    twitter: {
        title: "This page cound not be found.",
        description: "This page cound not be found.",
        card: "summary_large_image",
        site: "@glennprays",
        images: notFoundImageURL.href,
    }
}


export default async function NotFound() {
    return (
        <>
            <div className='mt-20 flex flex-col items-center justify-center select-none'>
                <div className='text-5xl flex items-center'>
                    <span className='font-bold text-cyan-500 dark:text-amber-500'>404</span><span className='font-thin ms-5 me-5'>|</span><span className='text-2xl'>Not Found</span>
                </div>
                <button className='mt-5 font-bold px-4 py-1 rounded bg-transparent hover:bg-neutral-950 hover:text-neutral-50 hover:dark:bg-neutral-50 dark:text-neutral-50 hover:dark:text-neutral-950'><Link href='/'>Return home</Link></button>
            </div>
        </>
    )
}