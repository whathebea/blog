
import { BackgroundColour } from "@/app/components/bg-gen";
import Tags from "@/app/components/tags";
import {
  getPostBody,
  parseFrontMatter,
  removeFrontMatter,
} from "@/app/postHelperFunctions";
import Markdown from "markdown-to-jsx";
import Link from "next/link";

const PostPage = (props: any) => {
  const slug = props.params.slug;
  const postMetadata = parseFrontMatter(slug);
  const postContent = removeFrontMatter(slug);
  postMetadata.title = postMetadata.title.replace(/"/g, "");
  postMetadata.subtitle = postMetadata.subtitle.replace(/"/g, "");
  postMetadata.date = postMetadata.date.replace(/"/g, "");
  postMetadata.author = postMetadata.author.replace(/"/g, "");
  postMetadata.tags = postMetadata.tags.map((tag) => tag.replace(/"/g, ""));
  const returnIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="48" width="48"><title>interface-essential-navigation-left-circle-1</title><path d="M22.86 6.855h-1.1475V4.5675h-1.1400000000000001V3.4275H19.424999999999997V2.2874999999999996h-2.2800000000000002V1.1400000000000001h-2.2874999999999996V0h-5.715v1.1400000000000001H6.855v1.1475H4.5675v1.1400000000000001H3.4275v1.1400000000000001H2.2874999999999996v2.2874999999999996H1.1400000000000001v2.2874999999999996H0v5.715h1.1400000000000001v2.2874999999999996h1.1475v2.2800000000000002h1.1400000000000001v1.1475h1.1400000000000001v1.1400000000000001h2.2874999999999996v1.1475h2.2874999999999996V24h5.715v-1.1400000000000001h2.2874999999999996v-1.1475h2.2800000000000002v-1.1400000000000001h1.1475V19.424999999999997h1.1400000000000001v-2.2800000000000002h1.1475v-2.2874999999999996H24v-5.715h-1.1400000000000001ZM19.424999999999997 15.997499999999999h-1.1400000000000001v1.1475h-1.1400000000000001v1.1400000000000001h-3.4275v-1.1400000000000001h1.1400000000000001v-1.1475h1.1400000000000001v-1.1400000000000001h-1.1400000000000001v-1.1400000000000001h-4.574999999999999v2.2800000000000002h-1.1400000000000001v-1.1400000000000001h-1.1400000000000001v-1.1400000000000001H6.855v-1.1475H5.715v-1.1400000000000001H4.5675v-1.1475h1.1475v-1.1400000000000001h1.1400000000000001v-1.1400000000000001h1.1475V6.855h1.1400000000000001V5.715h1.1400000000000001v2.2874999999999996h6.862500000000001v1.1400000000000001h1.1400000000000001v1.1400000000000001h1.1400000000000001Z" fill="#000000" stroke-width="1"></path></svg>;
  return (
    <div className={`${BackgroundColour()} min-h-screen`}>
      <div className="container lg:max-w-4xl mx-auto md:max-w-md sm:max-w-md mw-90 mx-3">
        <div className="grid grid-cols-1 gap-4">
          <div className="pt-10">
            <Link href="/">
            {returnIcon}
            </Link>
          </div>
          <div className="p-4 border-black border-2 rounded-md bg-white">
          <div className="flex items-center">
    <span>{CuteDate(postMetadata.date)}</span>
    <div className="mx-3 my-3">
      <h1 className="font-bold text-3xl pixel-font">{postMetadata.title}</h1>
    <h2 className="italic">{postMetadata.author}</h2>
    <div className="my-3">{Tags(postMetadata.tags)}</div>

    </div>
</div>
<article className="prose prose-md  max-w-none">
            <Markdown>{postContent}</Markdown>
            </article>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

const CuteDate = (date: string) => {
    // date is in format YYYY-MM-DD
    // return string DDmm 
    date = date.split("-").reverse().join("").substring(0, 4);
    return (
        <div className="rounded-md pixel-font border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-pink-100 text-2xl font-bold p-2 w-24 h-24 overflow-hidden inline-flex items-center justify-center">
            {date.substring(0, 2)}<br />{date.substring(2)}
        </div>
    );
};

export default PostPage;
