import { getAllTags, getSlug, getSlugsByTag, getTimeToRead, parseFrontMatter } from "@/app/postHelperFunctions";
import Link from "next/link";
import Tags from "./tags";

export default function Card(slug: string) {
    const postMetadata = parseFrontMatter(slug);
    // remove quotes from metaData
    postMetadata.title = postMetadata.title.replace(/"/g, "");
    postMetadata.subtitle = postMetadata.subtitle.replace(/"/g, "");
    postMetadata.date = postMetadata.date.replace(/"/g, "");
    postMetadata.author = postMetadata.author.replace(/"/g, "");
    postMetadata.tags = postMetadata.tags.map((tag) => tag.replace(/"/g, ""));
    const timeToRead = getTimeToRead(slug);
    return (
      <div>
        <article className=" border-black border-2 rounded-md hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] p-4 bg-white min-h-52">
          <h3 className="text-sm font-bold flex justify-between">{postMetadata.date} <span className="text-gray-500">{timeToRead}</span></h3>
          <Link key={slug} href={`/posts/${slug}`}>
            <h1 className="font-bold text-xl pixel-font">{postMetadata.title}</h1>
          </Link>
          <h2 className="text-gray-800 font-bold text-sm mb-2">
            {postMetadata.author}
          </h2>
          <h2 className="text-gray-700 text-base mb-2">
            {postMetadata.subtitle}
          </h2>
          <h3>{Tags(postMetadata.tags)}</h3>
        </article>
      </div>
    );
  }