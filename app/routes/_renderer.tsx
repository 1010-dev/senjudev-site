import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";

export default jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* 基本メタデータ */}
        <title>千住.dev - 千住エリア技術者コミュニティ</title>
        <meta name="description" content="千住エリアを中心とした足立区で活動する技術者のためのコミュニティです。定期的な勉強会やもくもく会を開催しています。" />
        <meta name="keywords" content="千住,北千住,南千住,足立区,開発者,エンジニア,プログラマー,コミュニティ,勉強会,もくもく会,senju.dev" />
        <meta name="author" content="senju.dev community" />

        {/* OGPタグ */}
        <meta property="og:title" content="千住.dev - 千住エリア技術者コミュニティ" />
        <meta property="og:description" content="千住エリアを中心とした足立区で活動する技術者のためのコミュニティです。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://senju.dev" />
        <meta property="og:image" content="https://senju.dev/og-image.jpg" />
        <meta property="og:site_name" content="senju.dev" />
        <meta property="og:locale" content="ja_JP" />

        {/* Twitter Cardタグ */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="千住.dev - 千住エリア技術者コミュニティ" />
        <meta name="twitter:description" content="千住エリアを中心とした足立区で活動する技術者のためのコミュニティです。" />
        <meta name="twitter:image" content="https://senju.dev/og-image.jpg" />

        {/* その他のメタタグ */}
        <meta name="theme-color" content="#374151" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://senju.dev" />

        {/* ファビコン */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />

        {/* スタイルとスクリプト */}
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
        <Style />

        {/* 構造化データ (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "千住.dev",
            url: "https://senju.dev",
            logo: "https://senju.dev/logo.jpg",
            description: "千住エリアを中心とした足立区で活動する技術者のためのコミュニティ",
            foundingLocation: {
              "@type": "Place",
              name: "千住エリア",
              address: {
                "@type": "PostalAddress",
                addressLocality: "足立区",
                addressRegion: "東京都",
                addressCountry: "JP"
              }
            },
            sameAs: [
              "https://discord.gg/gMgdDhbjVg",
              "https://senju.connpass.com/"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "community support",
              url: "https://discord.gg/gMgdDhbjVg"
            }
          })}
        </script>
      </head>
      <body>{children}</body>
    </html>
  );
});
