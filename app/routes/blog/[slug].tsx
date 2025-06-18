import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { getPostBySlug } from "@/utils/mdx";
import { MDXContent } from "@/components/MDXContent";

const articleStyle = css`
  .article-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .article-header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .article-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .article-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #6b7280;
    font-size: 0.875rem;
  }

  .article-tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .article-tag {
    background: #e5e7eb;
    color: #4b5563;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
  }

  .article-content {
    color: #374151;
    line-height: 1.8;
  }

  .article-content h1,
  .article-content h2,
  .article-content h3,
  .article-content h4,
  .article-content h5,
  .article-content h6 {
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #1f2937;
  }

  .article-content h1 { font-size: 2rem; }
  .article-content h2 { font-size: 1.75rem; }
  .article-content h3 { font-size: 1.5rem; }
  .article-content h4 { font-size: 1.25rem; }
  .article-content h5 { font-size: 1.125rem; }
  .article-content h6 { font-size: 1rem; }

  .article-content p {
    margin-bottom: 1.5rem;
  }

  .article-content ul,
  .article-content ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  .article-content li {
    margin-bottom: 0.5rem;
  }

  .article-content pre {
    background: #1f2937;
    color: #f9fafb;
    padding: 1.5rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }

  .article-content code {
    background: #e5e7eb;
    color: #1f2937;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }

  .article-content pre code {
    background: transparent;
    color: inherit;
    padding: 0;
  }

  .article-content blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    color: #6b7280;
    font-style: italic;
  }

  .article-content a {
    color: #3b82f6;
    text-decoration: underline;
  }

  .article-content a:hover {
    color: #2563eb;
  }

  .article-content img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 2rem 0;
  }

  .article-content hr {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 2rem 0;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #3b82f6;
    text-decoration: none;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .article-title {
      font-size: 2rem;
    }
  }
`;

export default createRoute(async (c) => {
  const slug = c.req.param("slug");
  const post = await getPostBySlug(slug);

  if (!post) {
    return c.notFound();
  }

  return c.render(
    <div class={articleStyle}>
      <div class="article-container">
        <a href="/blog" class="back-link">
          ← ブログ一覧に戻る
        </a>

        <article>
          <header class="article-header">
            <h1 class="article-title">{post.title}</h1>
            <div class="article-meta">
              <time>{new Date(post.date).toLocaleDateString("ja-JP")}</time>
              {post.author && <span>by {post.author}</span>}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div class="article-tags">
                {post.tags.map((tag) => (
                  <span key={tag} class="article-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div class="article-content">
            <MDXContent content={post.content} />
          </div>
        </article>
      </div>
    </div>
  );
});