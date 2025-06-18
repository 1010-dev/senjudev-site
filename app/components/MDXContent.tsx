import { compile } from "@mdx-js/mdx";
import { jsx, jsxs, Fragment } from "hono/jsx";

interface MDXContentProps {
  content: string;
}

export async function MDXContent({ content }: MDXContentProps) {
  const compiled = await compile(content, {
    outputFormat: "function-body",
    development: false,
  });

  const code = String(compiled);
  const Component = new Function("_jsx", "_jsxs", "_Fragment", code);

  return (
    <div class="prose prose-lg max-w-none">
      {Component(jsx, jsxs, Fragment)}
    </div>
  );
}