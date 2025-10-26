import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";

type PageMeta = {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
};

export default jsxRenderer(({ children, frontmatter }: { children: any; frontmatter?: PageMeta }) => {
  // デフォルト値
  const defaultMeta = {
    title: "千住.dev - 千住エリア技術者コミュニティ",
    description: "千住エリアを中心とした足立区で活動する技術者のためのコミュニティです。定期的な勉強会やもくもく会を開催しています。",
    keywords: "千住,北千住,南千住,足立区,開発者,エンジニア,プログラマー,コミュニティ,勉強会,もくもく会,senju.dev",
    ogTitle: "千住.dev - 千住エリア技術者コミュニティ",
    ogDescription: "千住エリアを中心とした足立区で活動する技術者のためのコミュニティです。",
    ogImage: "https://senju.dev/og-image.jpg",
    ogType: "website",
    canonicalUrl: "https://senju.dev"
  };

  // ページ固有のメタデータとデフォルトをマージ
  const meta = { ...defaultMeta, ...frontmatter };

  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* 基本メタデータ */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="author" content="senju.dev community" />

        {/* OGPタグ */}
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:url" content={meta.canonicalUrl} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="og:site_name" content="senju.dev" />
        <meta property="og:locale" content="ja_JP" />

        {/* Twitter Cardタグ */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.ogTitle} />
        <meta name="twitter:description" content={meta.ogDescription} />
        <meta name="twitter:image" content={meta.ogImage} />

        {/* その他のメタタグ */}
        <meta name="theme-color" content="#374151" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={meta.canonicalUrl} />

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
