import { BackgroundColour } from "./bg-gen";


export default function Tags(tags: string[]) {
    return (
      <div className="flex flex-wrap">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`max-w-full pixel-font text-sm border-black border-2 rounded-md ${BackgroundColour()} p-1 me-2 mb-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]`}
        >
            {tag}
          </span>
        ))}
      </div>
    );
  }