import { jsxRenderer } from "hono/jsx-renderer";
import { Navigation } from "@/components/Navigation";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
  return (
    <Layout title={frontmatter?.title || "Blog Post"}>
      <div class="bg-gray-50 min-h-screen">
        <Navigation />
        <div class="max-w-4xl mx-auto px-4 py-8">
          <article class="bg-white rounded-lg shadow-lg p-8">
            <header class="mb-8 pb-8 border-b">
              <h1 class="text-4xl font-bold text-gray-900 mb-4">
                {frontmatter?.title}
              </h1>
              <div class="flex items-center gap-4 text-gray-600">
                <time>{new Date(frontmatter?.date).toLocaleDateString("ja-JP")}</time>
                {frontmatter?.author && <span>by {frontmatter.author}</span>}
              </div>
              {frontmatter?.tags && frontmatter.tags.length > 0 && (
                <div class="flex gap-2 mt-4">
                  {frontmatter.tags.map((tag: string) => (
                    <span
                      key={tag}
                      class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
            <div class="prose prose-lg max-w-none">{children}</div>
          </article>
        </div>
      </div>
    </Layout>
  );
});