import Link from "next/link";
import path from "path";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

class PaginationSegment {
    /** Total of segments */
    segments: number;
    /** Current segment */
    current: number;
    /** Page order index is position of the showed page */
    pageIndex: number;
    /** Segment page first number (page index 0) */
    firstPage: number;
    /** Segment page last number (page last index) */
    lastPage: number;

    constructor(totalPages: number, showedPages: number, currentPage: number) {
        this.segments = Math.ceil(totalPages / showedPages);
        this.current = Math.ceil(currentPage / showedPages);
        this.pageIndex =
            showedPages - (this.current * showedPages - currentPage) - 1;
        this.firstPage = this.current * showedPages - showedPages + 1;
        this.lastPage = this.current * showedPages;
    }
}

export default function Pagination({
    basePath,
    firstPagePath,
    totalPages,
    currentPage,
    showedPages,
}: {
    basePath: string;
    firstPagePath?: string;
    totalPages: number;
    currentPage: number;
    showedPages: number;
}) {
    const segment = new PaginationSegment(
        totalPages,
        showedPages,
        currentPage
    );

    return (
        <div className="flex gap-3 items-center text-xl mt-16 ">
            {segment.current > 1 ? (
                <Link
                    href={
                        segment.current === 2
                            ? "/blog"
                            : `/blog/page/${segment.firstPage - 1}`
                    }
                >
                    <IoIosArrowBack className="dark:text-neutral-100" />
                </Link>
            ) : null}
            {Array.from(
                {
                    length:
                        segment.current === segment.segments
                            ? totalPages % showedPages
                            : showedPages,
                },
                (_, i) => (
                    <Link
                        className={
                            segment.pageIndex === i
                                ? "rounded-full flex justify-center items-center bg-neutral-300 dark:bg-neutral-700 w-[27px] h-[27px] mx-[-3px]"
                                : ""
                        }
                        href={
                            firstPagePath && segment.firstPage + i === 1
                                ? firstPagePath
                                : path.join(
                                      basePath,
                                      (segment.firstPage + i).toString()
                                  )
                        }
                    >
                        {segment.firstPage + i}
                    </Link>
                )
            )}
            {segment.current < segment.segments ? (
                <Link href={`/blog/page/${segment.lastPage + 1}`}>
                    <IoIosArrowForward className="dark:text-neutral-100" />
                </Link>
            ) : null}
        </div>
    );
}
