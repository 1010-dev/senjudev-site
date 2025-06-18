import { compile } from "@mdx-js/mdx";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

interface MDXContentProps {
  content: string;
}

export async function MDXContent({ content }: MDXContentProps) {
  const compiled = await compile(content, {
    rehypePlugins: [rehypeHighlight, rehypeStringify],
  });

  const html = String(compiled);

  return (
    <div 
      class="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}