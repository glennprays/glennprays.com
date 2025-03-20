import { debounced } from "@/utils/input";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";

export function SearchBlog() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }
    return (
        <div className="relative">
            <input
                type="text"
                className="py-[2px] px-5 border dark:border-white dark:bg-neutral-800 border-black rounded-full w-[260px]"
                placeholder="Search Blog"
                onChange={handleInput}
                value={query}
            />
            <div className="w-full absolute max-h-[40vh] overflow-y-auto">
                <SuggestionToggle open={open} setOpen={setOpen} query={query} />
            </div>
        </div>
    );
}

type blogData = {
    title: string;
    url: string;
};

function SuggestionToggle({
    open,
    setOpen,
    query,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    query: string;
}) {
    const toggleRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                toggleRef.current &&
                !toggleRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const delayTime = 500;

    const debouncedFingSuggestions = debounced(() => {
        setOpen(true);
        setLoading(true);
        findSuggestions();
        setLoading(false);
    }, delayTime);

    useEffect(() => {
        if (query) {
            debouncedFingSuggestions();
        } else {
            setOpen(false);
            setSuggestions([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const allBlogsData = allBlogs.map(
        (blog): blogData => ({
            title: blog.title,
            url: blog.url,
        })
    );
    const [suggestions, setSuggestions] = useState<blogData[]>([]);
    const [loading, setLoading] = useState(false);
    function findSuggestions() {
        const suggestions = allBlogsData.filter((blog) =>
            blog.title.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(suggestions);
    }

    return open ? (
        <div
            ref={toggleRef}
            className={`bg-white dark:bg-neutral-800 mt-2 rounded-lg w-full overflow-hidden"
            }`}
        >
            {loading ? (
                "Loading..."
            ) : suggestions.length > 0 ? (
                suggestions.map((blog, index) => (
                    <SuggestionItem blog={blog} key={blog.url} index={index} />
                ))
            ) : (
                <span className="py-2 px-3">Data not found</span>
            )}
        </div>
    ) : null;
}

function SuggestionItem({ blog, index }: { blog: blogData; index: number }) {
    return (
        <div
            className={`py-1 px-4 w-full border-neutral-950 dark:border-neutral-600 text-sm hover:bg-neutral-300 hover:dark:bg-neutral-700 ${index > 0 ? "border-t-[0.01px]" : null
                }`}
        >
            <Link href={blog.url} target="_top" className="line-clamp-2">
                {blog.title}
            </Link>
        </div>
    );
}