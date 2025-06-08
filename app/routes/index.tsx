import { createRoute } from "honox/factory";
import Events from "../islands/events";
import { DiscordIcon, ConnpassIcon } from "../components/icons";

export default createRoute((c) => {
  return c.render(
    <div class="bg-gray-50 text-gray-900 min-h-screen">

      <div class="max-w-6xl mx-auto px-6 py-8 relative z-10">
        {/* ヘッダー */}
        <header class="text-center py-8" role="banner">
          {/* ロゴ */}
          <div class="mb-6 inline-block">
            <img
              src="/logo-simple.png"
              alt="Senju.dev - 千住大橋をモチーフとしたロゴ"
              class="w-64 h-auto mx-auto"
            />
          </div>

          {/* サイトタイトル */}
          <h1 class="text-6xl font-bold text-gray-800 mb-2 relative">
            <span class="sr-only">千住ドット開発</span>
            <span aria-hidden="true">senju.dev</span>
          </h1>
          <h2 class="text-2xl text-gray-600 mb-4">
            <span class="sr-only">千住エリア技術コミュニティのウェブサイトです。</span>
            <span aria-hidden="true">千住エリア技術コミュニティ</span>
          </h2>

          {/* シンプルな装飾線 */}
          <div class="w-24 h-1 bg-gray-400 mx-auto mb-6 rounded-full"></div>

          <p class="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            千住エリアを中心とした足立区で活動する
            <br />
            技術者のためのコミュニティです
          </p>

          {/* メインCTA */}
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/gMgdDhbjVg"
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg px-8 py-4 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-3 min-h-[44px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordIcon className="w-6 h-6" />
              Discord に参加する
            </a>
            <a
              href="https://senju.connpass.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-gray-600 hover:bg-gray-700 text-white font-medium text-lg px-8 py-4 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300 flex items-center justify-center gap-3 min-h-[44px]"
            >
              <ConnpassIcon className="w-6 h-6" />
              connpass でイベント確認
            </a>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main class="mt-16" id="main-content" role="main">
          {/* イベントセクション */}
          <section id="events" aria-labelledby="events-heading">
            <h3 id="events-heading" class="text-4xl font-bold text-center mb-12 text-gray-800">
              イベント情報
            </h3>
            <Events />
          </section>

          {/* コミュニティ情報セクション */}
          <section class="mt-20" aria-labelledby="about-heading">
            <div class="max-w-2xl mx-auto">
              {/* About */}
              <div class="bg-white border border-gray-200 rounded-xl p-8 text-gray-800 text-center shadow-sm">
                <h4 id="about-heading" class="text-2xl font-bold mb-6 text-gray-800">
                  About senju.dev
                </h4>
                <p class="text-gray-700 leading-relaxed text-lg">
                  千住大橋と荒川で結ばれる千住エリアを拠点とした技術コミュニティ。
                  <br />
                  定期的な勉強会やもくもく会を通じて、足立区の技術者同士の交流を深めています。
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* フッター */}
        <footer class="mt-20 pt-8 border-t border-gray-200" role="contentinfo">
          <div class="text-center">
            <div class="w-24 h-1 bg-gray-400 mx-auto mb-6 rounded-full"></div>
            <p class="text-gray-600 mb-4">千住.dev コミュニティ</p>
            <nav aria-label="外部リンク" class="flex justify-center space-x-6 text-sm">
              <a
                href="https://discord.gg/gMgdDhbjVg"
                class="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 hover:underline"
              >
                <DiscordIcon className="w-4 h-4" />
                Discord
              </a>
              <a
                href="https://senju.connpass.com/"
                class="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 hover:underline"
                target="_blank"
              >
                <ConnpassIcon className="w-4 h-4" />
                connpass
              </a>
              <a
                href="https://github.com/1010-dev"
                class="text-gray-600 hover:text-gray-800 transition-colors hover:underline"
                target="_blank"
              >
                GitHub
              </a>
            </nav>
            <p class="text-gray-500 text-xs mt-4">
              © 2025 senju.dev - 千住エリア技術コミュニティ
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
});
