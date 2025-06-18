import { css } from "hono/css";
import { getAllPosts } from "@/utils/mdx";

const blogPageStyle = css`
  .blog-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .blog-title {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }

  .blog-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .blog-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .blog-card-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1f2937;
  }

  .blog-card-date {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 1rem;
  }

  .blog-card-excerpt {
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .blog-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .blog-tag {
    background: #e5e7eb;
    color: #4b5563;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
  }

  .blog-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
  }

  .blog-link:hover {
    text-decoration: underline;
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

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <div class={blogPageStyle}>
      <div class="blog-container">
        <header class="blog-header">
          <h1 class="blog-title">senju.dev Blog</h1>
          <p class="text-gray-600">千住エリアの技術者による技術記事</p>
        </header>

        <div class="blog-grid">
          {posts.map((post) => (
            <article key={post.slug} class="blog-card">
              <h2 class="blog-card-title">
                <a href={`/blog/${post.slug}`} class="blog-link">
                  {post.title}
                </a>
              </h2>
              <time class="blog-card-date">
                {new Date(post.date).toLocaleDateString("ja-JP")}
              </time>
              {post.excerpt && (
                <p class="blog-card-excerpt">{post.excerpt}</p>
              )}
              {post.tags && post.tags.length > 0 && (
                <div class="blog-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} class="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div class="text-center text-gray-500 mt-8">
            <p>まだ記事がありません。</p>
          </div>
        )}
      </div>
    </div>
  );
}