import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { glob } from "glob";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  author?: string;
  content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), "posts");
  const mdxFiles = await glob("**/*.mdx", { cwd: postsDirectory });

  const posts = await Promise.all(
    mdxFiles.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      const slug = filename.replace(/\.mdx$/, "");

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt,
        tags: data.tags || [],
        author: data.author,
        content,
      };
    })
  );

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}