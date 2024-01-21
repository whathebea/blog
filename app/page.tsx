import Link from "next/link";
import { BackgroundColour } from "@/app/components/bg-gen";
import Card from "@/app/components/card";
import TagFilter from "@/app/components/tag-filter";
import { getAllTags, getSlug, getSlugsByTag, getTimeToRead, parseFrontMatter } from "@/app/postHelperFunctions";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  const postSlugs = getSlug();
  const postSortedByDate = postSlugs.sort((a, b) => {
    const aDate = new Date(parseFrontMatter(a).date);
    const bDate = new Date(parseFrontMatter(b).date);
    return bDate.getTime() - aDate.getTime();
  });

  return (
    <div className={`${BackgroundColour()} flex items-center justify-center min-h-screen`}>
      <div className="container mx-auto p-4">
      {Header()}
        {TagFilter()}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-3">
          {postSortedByDate.map((slug) => Card(slug))}
        </div>
        {Footer()}
      </div>
    </div>
  );
}
