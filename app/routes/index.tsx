import { createRoute } from "honox/factory";
import Events from "../islands/events";

export default createRoute((c) => {
  return c.render(
    <div class="bg-[#1a2a42] text-white min-h-screen">
      <div class="max-w-3xl mx-auto px-6 py-8 text-center">
        <title>千住.dev コミュニティハブ</title>

        {/* Logo */}
        <div class="mt-10 mb-4">
          <img
            src="/logo.jpg"
            alt="Senju.dev Logo"
            class="w-60 h-auto mx-auto mb-3 logo-glow"
          />
        </div>

        {/* Site Name and Description */}
        <h1 class="text-5xl font-medium text-gray-300 my-2">senju.dev</h1>
        <h2 class="text-3xl my-5">千住.dev コミュニティハブ</h2>
        <p class="text-xl my-5 mb-10">
          千住エリアの開発者向けイベントをまとめて紹介
        </p>

        {/* Discord Button */}
        <a
          href="https://discord.gg/gMgdDhbjVg"
          class="inline-block bg-[#e67e22] hover:bg-[#d35400] text-white px-8 py-4 rounded text-lg transition-colors my-4 mb-12"
        >
          Discord に参加する
        </a>

        {/* Events Section */}
        <Events />
      </div>
    </div>
  );
});
