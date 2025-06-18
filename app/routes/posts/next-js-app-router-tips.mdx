---
title: Next.js App Router の実践的な Tips
date: 2025-06-15
excerpt: Next.js 14 の App Router を使用する際の実践的な Tips を紹介します。
tags:
  - Next.js
  - React
  - TypeScript
author: Tech Writer
---

# Next.js App Router の実践的な Tips

Next.js 14 の App Router を使った開発で得た知見を共有します。

## 1. サーバーコンポーネントとクライアントコンポーネントの使い分け

### サーバーコンポーネント（デフォルト）

```typescript
// app/components/ServerComponent.tsx
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data')
  const json = await data.json()
  
  return <div>{json.title}</div>
}
```

### クライアントコンポーネント

```typescript
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
```

## 2. ローディング状態の管理

```typescript
// app/posts/loading.tsx
export default function Loading() {
  return <div>読み込み中...</div>
}
```

## 3. エラーハンドリング

```typescript
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
```

## まとめ

App Router は従来の Pages Router と比べて学習曲線は高いですが、
一度理解すれば非常に強力な機能を提供してくれます。

特に、サーバーコンポーネントによるパフォーマンスの向上と、
より直感的なファイルベースのルーティングは大きなメリットです。