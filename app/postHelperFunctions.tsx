import fs from 'fs';
import { PostMetadata } from './components/PostMetadata';

export function getMarkdownFiles(): string[] {
    const folder = "./posts";
    // read all the files
    const files = fs.readdirSync(folder);
    // filter for the markdown files
    const markdownFiles = files.filter((fn) => fn.endsWith(".md"));
    return markdownFiles;
}

export function getSlug(): string[] {
    const slug = getMarkdownFiles().map((filename) => {
        return filename.replace(".md", "");
    });
    // return the slugs
    return slug;
}

export function getPostBody(slug: string): string {
    // get file by slug name
    const file = `./posts/${slug}.md`;
    // read the file 
    const content = fs.readFileSync(file, "utf-8");
    return content;
}

export function parseFrontMatter(slug: string): PostMetadata {
    const frontMatterString = getPostBody(slug);
    const content = frontMatterString.split('---')[1].trim();
    const lines = content.split('\n');
    const result: PostMetadata = {
        title: "",
        subtitle: "",
        date: "",
        author: "",
        tags: [],
        slug: slug
    };

    lines.forEach((line) => {
        const [key, value] = line.split(':').map(s => s.trim()) as [keyof PostMetadata, string];
    
        if (key === 'tags') {
            result[key] = value.slice(1, -1).split(',').map(s => s.trim());
        } else {
            result[key] = value.trim();
        }
    });

    return result;
}

export function removeFrontMatter(slug: string): string {
    const fileContent = getPostBody(slug);
    const frontMatterRegex = /^---([\s\S]*?)---\s*/;
    return fileContent.replace(frontMatterRegex, '');
}

export function getTimeToRead(slug: string): String {
    const content = removeFrontMatter(slug);
    const words = content.split(' ');
    const timeToRead = Math.ceil(words.length / 200);
    return timeToRead + "min"
}

export function getAllTags(): string[] {
    const tagsSet = new Set<string>();

    getMarkdownFiles().forEach((filename) => {
        const postMetadata = parseFrontMatter(filename.replace(".md", ""));
        postMetadata.tags.forEach((tag) => {
            tagsSet.add(tag);
        });
    });

    const uniqueTags = Array.from(tagsSet);

    return uniqueTags;
}

export function getSlugsByTag(tag: string): string[] {
    const slugs = getSlug();
    const slugsWithTag = slugs.filter((slug) => {
        const postMetadata = parseFrontMatter(slug);
        return postMetadata.tags.toString().includes(tag);
    });
    return slugsWithTag;
}