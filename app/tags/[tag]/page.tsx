import { BackgroundColour } from "@/app/components/bg-gen";
import Card from "@/app/components/card";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import TagFilter from "@/app/components/tag-filter";
import { getAllTags, getSlug, getSlugsByTag, getTimeToRead, parseFrontMatter } from "@/app/postHelperFunctions";
import Link from "next/link";

const PostTags = (props: any) => {
  const tag = props.params.tag;
  const slugs = getSlugsByTag(tag);
  return (
    <div className={`${BackgroundColour()} flex items-center justify-center min-h-screen`}>
      <div className="container mx-auto p-4">
      {Header()}
        {TagFilter()}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-3">
          {slugs.map((slug) => Card(slug))}
        </div>
        {Footer()}
      </div>
    </div>
  );
}





export default PostTags;