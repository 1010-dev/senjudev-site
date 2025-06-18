import { marked } from "marked";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  author?: string;
  content: string;
  htmlContent?: string;
}

// ブログ記事を静的に定義
const posts: Omit<BlogPost, 'htmlContent'>[] = [
  {
    slug: "hello-senju-dev",
    title: "Hello, senju.dev!",
    date: "2025-06-16",
    excerpt: "senju.dev ブログへようこそ！北千住の技術コミュニティの新しい情報発信拠点です。",
    tags: ["コミュニティ", "お知らせ"],
    author: "senju.dev Team",
    content: `# Hello, senju.dev!

senju.dev ブログへようこそ！

このブログは、北千住エリアの技術者コミュニティ「senju.dev」の情報発信拠点として立ち上げました。

## 目的

- 地域の技術イベント情報の共有
- メンバーによる技術記事の投稿
- コミュニティ活動の記録

## 今後の予定

1. **定期的な技術記事の投稿**
   - メンバーの知見共有
   - 勉強会のレポート
   - 技術トレンドの紹介

2. **イベント情報の集約**
   - connpass 連携による自動更新
   - 参加レポートの掲載

3. **コミュニティの成長記録**
   - 活動報告
   - メンバー紹介

北千住から技術の輪を広げていきましょう！`
  },
  {
    slug: "next-js-app-router-tips",
    title: "Next.js App Router の実践的な Tips",
    date: "2025-06-15",
    excerpt: "Next.js 14 の App Router を使用する際の実践的な Tips を紹介します。",
    tags: ["Next.js", "React", "TypeScript"],
    author: "Tech Writer",
    content: `# Next.js App Router の実践的な Tips

Next.js 14 の App Router を使った開発で得た知見を共有します。

## 1. サーバーコンポーネントとクライアントコンポーネントの使い分け

### サーバーコンポーネント（デフォルト）

\`\`\`typescript
// app/components/ServerComponent.tsx
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data')
  const json = await data.json()
  
  return <div>{json.title}</div>
}
\`\`\`

### クライアントコンポーネント

\`\`\`typescript
// app/components/ClientComponent.tsx
'use client'

import { useState } from 'react'

export function ClientComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
\`\`\`

## 2. ローディング状態の管理

\`\`\`typescript
// app/posts/loading.tsx
export default function Loading() {
  return <div>読み込み中...</div>
}
\`\`\`

## 3. エラーハンドリング

\`\`\`typescript
// app/posts/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>エラーが発生しました</h2>
      <button onClick={() => reset()}>再試行</button>
    </div>
  )
}
\`\`\`

## まとめ

App Router は従来の Pages Router と比べて学習曲線は高いですが、
一度理解すれば非常に強力な機能を提供してくれます。

特に、サーバーコンポーネントによるパフォーマンスの向上と、
より直感的なファイルベースのルーティングは大きなメリットです。`
  }
];

// 全記事を取得（HTMLに変換済み）
export async function getAllPosts(): Promise<BlogPost[]> {
  const processedPosts = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      htmlContent: await marked(post.content)
    }))
  );
  
  return processedPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// スラッグで記事を取得
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  
  return {
    ...post,
    htmlContent: await marked(post.content)
  };
}