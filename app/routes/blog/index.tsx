import { css } from "hono/css";
import { Navigation } from "@/components/Navigation";
import { FC } from "hono/jsx";

const blogPageStyle = css`
  .blog-container {
    max-width: 1200px;
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

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .blog-card {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .blog-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .blog-card-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  .blog-link {
    color: #1f2937;
    text-decoration: none;
  }

  .blog-link:hover {
    color: #3b82f6;
  }

  .blog-card-date {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .blog-card-excerpt {
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .blog-card-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .blog-card-tag {
    background: #e5e7eb;
    color: #4b5563;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    .blog-title {
      font-size: 2rem;
    }
    
    .blog-grid {
      grid-template-columns: 1fr;
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
    <div class="blog-grid">
      {sortedEntries.map(([id, module]) => {
        const slug = id.replace("/app/routes/posts/", "").replace(/\.mdx$/, "");
        return (
          <article key={slug} class="blog-card">
            <h2 class="blog-card-title">
              <a href={`/posts/${slug}`} class="blog-link">
                {module.frontmatter.title}
              </a>
            </h2>
            <time class="blog-card-date">
              {new Date(module.frontmatter.date).toLocaleDateString("ja-JP")}
            </time>
            {module.frontmatter.excerpt && (
              <p class="blog-card-excerpt">{module.frontmatter.excerpt}</p>
            )}
            {module.frontmatter.tags && module.frontmatter.tags.length > 0 && (
              <div class="blog-card-tags">
                {module.frontmatter.tags.map((tag) => (
                  <span key={tag} class="blog-card-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
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