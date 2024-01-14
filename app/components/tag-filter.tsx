import { getAllTags } from "../postHelperFunctions";
import { BackgroundColour } from "./bg-gen";
import Link from "next/link";
export default function TagFilter() {
    // get all tags from every post
    const tags = getAllTags();
    return (
      <div className="flex flex-wrap justify-center">
        {tags.map((tag, index) => (
          tag = tag.replace(/"/g, ""),
          <span
            key={index}
            className={`mt-2 pixel-font text-sm border-black border-2 rounded-md ${BackgroundColour()} p-1 me-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]`}
          >
            <Link href={`/tags/${tag}`}>{tag}</Link>
          </span>
        ))}
        <span
          key="limpar"
          className={`mt-2 pixel-font text-sm border-black border-2 rounded-md bg-white p-1 me-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]`}
        >
          <Link href={`/`}>Limpar</Link>
        </span>
      </div>
      );
    }
