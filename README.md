# senju.dev

> 北千住を拠点とする技術者コミュニティの公式サイト

## 🎯 プロジェクトの目的

千住エリア＆足立区にゆかりのある技術者を繋ぐコミュニティサイトです。

### 主な機能

- **イベント & コミュニティハブ**: connpass で散らばるイベント情報を一箇所で管理
- **ローカル Tech ブログ**: Pull Request ベースの技術記事投稿（予定）

## 🛠️ 技術スタック

- **フレームワーク**: [HonoX](https://github.com/honojs/honox) (Hono + Vite)
- **スタイリング**: [TailwindCSS](https://tailwindcss.com/)
- **ホスティング**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **ランタイム**: [Cloudflare Workers](https://workers.cloudflare.com/)

## 🚀 開発環境のセットアップ

### 必要な環境

- Node.js 18.0.0 以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/1010-dev/senjudev-site
cd senjudev-site

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```