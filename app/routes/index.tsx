import { createRoute } from "honox/factory";
import Events from "../islands/events";
import { DiscordIcon, ConnpassIcon } from "../components/icons";

export default createRoute((c) => {
  return c.render(
    <div class="bg-blue-900 text-white min-h-screen relative overflow-hidden">
      {/* スキップリンク */}
      <a href="#main-content" class="skip-link">
        メインコンテンツへスキップ
      </a>
      {/* 荒川をイメージした背景グラデーション */}
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900"></div>

      {/* 水の波紋パターン */}
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/5 w-64 h-64 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
        <div class="absolute top-1/3 right-1/5 w-48 h-48 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div class="absolute bottom-1/4 left-2/5 w-56 h-56 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div class="max-w-6xl mx-auto px-6 py-8 relative z-10">
        {/* ヘッダー */}
        <header class="text-center py-8" role="banner">
          {/* ロゴ */}
          <div class="mb-6 inline-block bg-white">
            <img
              src="/logo2.png"
              alt="Senju.dev - 千住大橋をモチーフとしたロゴ"
              class="w-48 h-auto mx-auto drop-shadow-2xl hover:drop-shadow-[0_0_30px_rgba(234,88,12,0.6)] transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* サイトタイトル */}
          <h1 class="text-6xl font-bold text-white mb-2 relative">
            <span class="sr-only">千住ドット開発</span>
            <span aria-hidden="true">senju.dev</span>
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 "></div>
          </h1>
          <h2 class="text-2xl text-blue-200 mb-4">
            <span class="sr-only">千住エリア技術コミュニティのウェブサイトです。</span>
            <span aria-hidden="true">千住エリア技術コミュニティ</span>
          </h2>

          {/* 荒川の流れをイメージした装飾 */}
          <div class="relative w-96 max-w-md mx-auto h-1 bg-blue-800 rounded-full overflow-hidden mb-6 arakawa-flow" role="img" aria-label="荒川の流れをイメージしたアニメーション装飾"></div>

          <p class="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            千住エリアを中心とした足立区で活動する
            <br />
            技術者のためのコミュニティです
          </p>

          {/* メインCTA */}
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/gMgdDhbjVg"
              class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-300 flex items-center justify-center gap-3 min-h-[44px] border-2 border-transparent hover:border-white/20"
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
              class="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-3 min-h-[44px] border-2 border-transparent hover:border-white/20"
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
            <h3 id="events-heading" class="text-4xl font-bold text-center mb-12 text-white relative">
              イベント情報
              <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 mt-2" aria-hidden="true"></div>
            </h3>
            <Events />
          </section>

          {/* コミュニティ情報セクション */}
          <section class="mt-20" aria-labelledby="about-heading">
            <div class="max-w-2xl mx-auto">
              {/* About */}
              <div class="bg-white/95 backdrop-blur-lg border-2 border-blue-200/20 rounded-xl p-8 text-gray-800 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:border-blue-300/30">
                <h4 id="about-heading" class="text-2xl font-bold mb-6 text-blue-900">
                  <span class="text-2xl" role="img" aria-label="家のアイコン">🏠</span> About senju.dev
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
        <footer class="mt-20 pt-8 border-t border-blue-800/30" role="contentinfo">
          <div class="text-center">
            <div class="relative w-80 max-w-xs mx-auto h-1 bg-blue-800 rounded-full overflow-hidden mb-6 arakawa-flow" role="img" aria-label="荒川の流れをイメージしたアニメーション装飾"></div>
            <p class="text-blue-200 mb-4">千住.dev コミュニティ</p>
            <nav aria-label="外部リンク" class="flex justify-center space-x-6 text-sm">
              <a
                href="https://discord.gg/gMgdDhbjVg"
                class="text-blue-300 hover:text-white transition-colors flex items-center gap-2 hover:underline"
              >
                <DiscordIcon className="w-4 h-4" />
                Discord
              </a>
              <a
                href="https://senju.connpass.com/"
                class="text-blue-300 hover:text-white transition-colors flex items-center gap-2 hover:underline"
                target="_blank"
              >
                <ConnpassIcon className="w-4 h-4" />
                connpass
              </a>
              <a
                href="https://github.com/1010-dev"
                class="text-blue-300 hover:text-white transition-colors hover:underline"
                target="_blank"
              >
                GitHub
              </a>
            </nav>
            <p class="text-blue-400 text-xs mt-4">
              © 2025 senju.dev - 荒川と千住大橋が結ぶ技術コミュニティ
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
});
