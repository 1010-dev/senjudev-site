---
title: Next.js App Routerの実践的なTips
date: 2025-06-17
excerpt: Next.js 14のApp Routerを使った開発で得た実践的なTipsを共有します。パフォーマンス最適化やエラーハンドリングなど。
tags: [Next.js, React, TypeScript]
author: 開発者A
---

# Next.js App Routerの実践的なTips

Next.js 14のApp Routerを使った開発で得た実践的なTipsを共有します。

## 1. ローディング状態の実装

App Routerでは、`loading.tsx`を使って簡単にローディング状態を実装できます：

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}
```

## 2. エラーハンドリング

`error.tsx`を使ってエラー境界を実装：

```tsx
// app/dashboard/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">エラーが発生しました</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        再試行
      </button>
    </div>
  );
}
```

## 3. データフェッチングのベストプラクティス

### Server Components でのデータフェッチング

```tsx
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // 1時間ごとに再検証
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

## 4. Parallel Routes の活用

複数のコンポーネントを並列でレンダリング：

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">{children}</div>
      <div>
        {analytics}
        {team}
      </div>
    </div>
  );
}
```

## 5. Route Handlers でのAPI実装

```tsx
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  
  // データベースから投稿を取得
  const posts = await fetchPostsFromDB(query);
  
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // バリデーション
  if (!body.title || !body.content) {
    return NextResponse.json(
      { error: 'Title and content are required' },
      { status: 400 }
    );
  }
  
  // データベースに保存
  const newPost = await createPost(body);
  
  return NextResponse.json(newPost, { status: 201 });
}
```

## まとめ

Next.js App Routerは、従来のPages Routerと比べて以下の利点があります：

- **Server Components by default**: パフォーマンスの向上
- **Nested Layouts**: 柔軟なレイアウト管理
- **Streaming**: 段階的なレンダリング
- **Built-in Loading/Error states**: UXの向上

これらの機能を活用することで、より高速で使いやすいWebアプリケーションを構築できます。