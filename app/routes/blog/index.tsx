import { css } from "hono/css";
import { Navigation } from "@/components/Navigation";
import { FC } from "hono/jsx";

const blogPageStyle = css`
  .blog-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .blog-title {
    font-size: 3rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .blog-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 2rem;
  }

  .blog-item {
    border-bottom: 1px solid #e5e7eb;
  }

  .blog-item:last-child {
    border-bottom: none;
  }

  .blog-item-link {
    display: block;
    padding: 1.5rem 0;
    color: inherit;
    text-decoration: none;
    transition: background-color 0.2s;
  }

  .blog-item:first-child .blog-item-link {
    padding-top: 0;
  }

  .blog-item-link:hover {
    background-color: #f9fafb;
    margin-left: -1rem;
    margin-right: -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .blog-item-header {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .blog-item-title {
    font-size: 1.25rem;
    font-weight: 600;
    flex-grow: 1;
  }

  .blog-item-link:hover .blog-item-title {
    color: #3b82f6;
  }

  .blog-item-date {
    color: #6b7280;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .blog-item-excerpt {
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
  }

  .blog-item-footer {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .blog-item-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .blog-item-tag {
    background: #f3f4f6;
    color: #6b7280;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
  }

  .blog-item-author {
    color: #6b7280;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .blog-title {
      font-size: 2rem;
    }
    
    .blog-item-header {
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .blog-item-date {
      font-size: 0.75rem;
    }
  }
`;

const Posts: FC = () => {
  const posts = import.meta.glob<{
    frontmatter: {
      title: string;
      date: string;
      excerpt?: string;
      tags?: string[];
      author?: string;
      published?: boolean;
    };
  }>("/app/routes/posts/*.mdx", { eager: true });
  
  const entries = Object.entries(posts).filter(
    ([_, module]) => module.frontmatter.published !== false
  );
  
  const sortedEntries = entries
    .sort((a, b) => {
      const dateA = new Date(a[1].frontmatter.date).getTime();
      const dateB = new Date(b[1].frontmatter.date).getTime();
      return dateB - dateA;
    });

  return (
    <div class="blog-list">
      {sortedEntries.map(([id, module]) => {
        const slug = id.replace("/app/routes/posts/", "").replace(/\.mdx$/, "");
        return (
          <article key={slug} class="blog-item">
            <a href={`/posts/${slug}`} class="blog-item-link">
              <div class="blog-item-header">
                <h2 class="blog-item-title">
                  {module.frontmatter.title}
                </h2>
                <time class="blog-item-date">
                  {new Date(module.frontmatter.date).toLocaleDateString("ja-JP")}
                </time>
              </div>
              {module.frontmatter.excerpt && (
                <p class="blog-item-excerpt">{module.frontmatter.excerpt}</p>
              )}
              <div class="blog-item-footer">
                {module.frontmatter.tags && module.frontmatter.tags.length > 0 && (
                  <div class="blog-item-tags">
                    {module.frontmatter.tags.map((tag) => (
                      <span key={tag} class="blog-item-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {module.frontmatter.author && (
                  <span class="blog-item-author">by {module.frontmatter.author}</span>
                )}
              </div>
            </a>
          </article>
        );
      })}
      {sortedEntries.length === 0 && (
        <div class="text-center text-gray-500 mt-8">
          <p>まだ記事がありません。</p>
        </div>
      )}
    </div>
  );
};

export default function BlogIndex() {
  return (
    <div class="bg-gray-50 min-h-screen">
      <Navigation />
      <div class={blogPageStyle}>
        <div class="blog-container">
          <header class="blog-header">
            <h1 class="blog-title">senju.dev Blog</h1>
            <p class="text-gray-600">千住エリアの技術者による技術記事</p>
          </header>
          <Posts />
        </div>
      </div>
    </div>
  );
}