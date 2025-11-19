import { DiscordIcon, ConnpassIcon, BuyMeCoffeeIcon } from "./icons";

export function Navigation() {
  return (
    <nav class="flex justify-between items-center mb-8 max-w-6xl mx-auto px-6 py-4" aria-label="メインナビゲーション">
      <div class="flex items-center">
        <a href="/" class="text-2xl font-bold text-gray-800 hover:text-gray-900 transition-colors">
          senju.dev
        </a>
      </div>
      <div class="flex items-center gap-6">
        <a
          href="/blog"
          class="text-gray-700 hover:text-gray-900 font-medium transition-colors hover:underline"
        >
          ブログ
        </a>
        <a
          href="/map"
          class="text-gray-700 hover:text-gray-900 font-medium transition-colors hover:underline"
        >
          マップ
        </a>
        <a
          href="https://discord.gg/gMgdDhbjVg"
          class="text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiscordIcon className="w-5 h-5" />
          <span class="hidden sm:inline">Discord</span>
        </a>
        <a
          href="https://senju.connpass.com/"
          class="text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ConnpassIcon className="w-5 h-5" />
          <span class="hidden sm:inline">connpass</span>
        </a>
        <a
          href="https://buymeacoffee.com/senjudev"
          class="text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BuyMeCoffeeIcon className="w-5 h-5" />
          <span class="hidden sm:inline">Support</span>
        </a>
      </div>
    </nav>
  );
}