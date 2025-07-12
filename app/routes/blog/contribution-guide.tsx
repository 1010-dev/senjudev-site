import { Navigation } from "@/components/Navigation";

export default function ContributionGuide() {
  return (
    <>
      <div class="bg-gray-50 min-h-screen">
        <Navigation />
        <div class="max-w-4xl mx-auto px-4 py-8">
          <article class="bg-white rounded-lg shadow-lg p-8">
            <header class="mb-8 pb-8 border-b">
              <h1 class="text-4xl font-bold text-gray-900 mb-4">
                senju.devブログ投稿ガイド
              </h1>
              <p class="text-lg text-gray-600">
                GitHub経由で簡単に技術記事を投稿する方法
              </p>
            </header>
            
            <div class="prose prose-lg max-w-none">
              <h2>はじめに</h2>
              <p>
                senju.devのブログは、千住エリアの技術者コミュニティメンバーが知見を共有するためのプラットフォームです。
                GitHub Pull Requestを使った投稿フローにより、エンジニアにとって馴染みのある方法で記事を投稿できます。
              </p>

              <h2>投稿の流れ（3ステップ）</h2>
              
              <h3>ステップ1: GitHubでブランチを作成</h3>
              <ol>
                <li>
                  <a href="https://github.com/1010-dev/senjudev-site" target="_blank" rel="noopener noreferrer">
                    senju.devのGitHubリポジトリ
                  </a>にアクセス
                </li>
                <li>「Fork」ボタンをクリックして、自分のアカウントにリポジトリをフォーク</li>
                <li>フォークしたリポジトリで新しいブランチを作成（例: <code>add-my-article</code>）</li>
              </ol>

              <h3>ステップ2: 記事ファイルを作成</h3>
              <ol>
                <li><code>app/routes/posts/</code>ディレクトリに移動</li>
                <li>「Create new file」ボタンをクリック</li>
                <li>ファイル名を<code>your-article-title.mdx</code>の形式で入力（例: <code>react-hooks-tips.mdx</code>）</li>
                <li>以下のテンプレートをコピーして内容を編集：</li>
              </ol>

              <pre><code>{`---
title: 記事のタイトル
date: 2025-07-12
excerpt: 記事の概要（SNSシェア時などに表示されます）
tags:
  - React
  - JavaScript
author: あなたの名前
published: true
---

# 記事のタイトル

## はじめに

ここに記事の導入を書きます。

## 本文

### 見出し3

本文の内容を書きます。

\`\`\`javascript
// コードブロックの例
function hello() {
  console.log("Hello, senju.dev!");
}
\`\`\`

## まとめ

記事のまとめを書きます。`}</code></pre>

              <h3>ステップ3: Pull Requestを作成</h3>
              <ol>
                <li>ファイルを保存（「Commit new file」ボタン）</li>
                <li>本家リポジトリに対してPull Requestを作成</li>
                <li>PRのタイトルと説明を記入して送信</li>
              </ol>

              <h2>記事を書く際のポイント</h2>
              
              <h3>frontmatter（メタデータ）の書き方</h3>
              <ul>
                <li><strong>title</strong>: 記事のタイトル（必須）</li>
                <li><strong>date</strong>: 投稿日（YYYY-MM-DD形式、必須）</li>
                <li><strong>excerpt</strong>: 記事の概要（100文字程度推奨）</li>
                <li><strong>tags</strong>: 関連するタグ（配列形式）</li>
                <li><strong>author</strong>: 著者名（必須）</li>
                <li><strong>published</strong>: 公開状態（true/false、デフォルトはtrue）</li>
              </ul>

              <h3>Markdownの書き方</h3>
              <ul>
                <li><strong>見出し</strong>: <code>#</code>、<code>##</code>、<code>###</code>を使用</li>
                <li><strong>強調</strong>: <code>**太字**</code>、<code>*斜体*</code></li>
                <li><strong>リンク</strong>: <code>[テキスト](URL)</code></li>
                <li><strong>画像</strong>: <code>![代替テキスト](画像URL)</code></li>
                <li><strong>コード</strong>: バッククォート3つで囲む（言語名を指定可能）</li>
                <li><strong>引用</strong>: <code>&gt;</code>を行頭に付ける</li>
              </ul>

              <h2>投稿可能な内容</h2>
              <p>以下のような内容を歓迎しています：</p>
              <ul>
                <li>技術的なTipsやハウツー</li>
                <li>勉強会やイベントのレポート</li>
                <li>個人プロジェクトの紹介</li>
                <li>新しい技術の試用レポート</li>
                <li>千住エリアならではの開発環境の紹介</li>
                <li>コミュニティ活動の報告</li>
              </ul>

              <h2>レビュープロセス</h2>
              <p>
                Pull Requestを作成すると、コミュニティメンバーがレビューを行います。
                技術的な正確性や読みやすさについてフィードバックを受けることができます。
              </p>
              <ul>
                <li>誤字脱字のチェック</li>
                <li>技術的な内容の確認</li>
                <li>コードサンプルの動作確認</li>
                <li>記事構成のアドバイス</li>
              </ul>

              <h2>よくある質問</h2>
              
              <h3>Q: 画像はどうやって追加しますか？</h3>
              <p>
                画像は<code>public/images/posts/</code>ディレクトリに配置し、
                相対パスで参照してください。GitHubのIssueに画像をドラッグ&ドロップして
                生成されるURLを使用することもできます。
              </p>

              <h3>Q: 下書きを保存したい場合は？</h3>
              <p>
                frontmatterの<code>published: false</code>を設定すると、
                記事は非公開状態になります。準備ができたら<code>true</code>に変更してください。
              </p>

              <h3>Q: 記事を修正したい場合は？</h3>
              <p>
                既存の記事を編集する場合も、同様にPull Requestを作成してください。
                GitHubの編集機能を使って直接ファイルを編集できます。
              </p>

              <h2>サポート</h2>
              <p>
                投稿方法について不明な点がある場合は、
                <a href="https://github.com/1010-dev/senjudev-site/issues" target="_blank" rel="noopener noreferrer">
                  GitHubのIssue
                </a>
                でお気軽にご質問ください。
              </p>

              <div class="mt-12 p-6 bg-blue-50 rounded-lg">
                <h3 class="text-xl font-bold text-blue-900 mb-3">さあ、投稿を始めましょう！</h3>
                <p class="text-blue-700 mb-4">
                  あなたの知見や経験をsenju.devコミュニティで共有してください。
                  技術者同士の学びと成長に貢献しましょう。
                </p>
                <a 
                  href="https://github.com/1010-dev/senjudev-site/fork" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors no-underline hover:no-underline"
                  style="color: white !important;"
                >
                  リポジトリをForkして始める →
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}