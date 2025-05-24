export default function LoadingSpinner() {
  return (
    <div class="flex flex-col items-center justify-center py-8">
      {/* 荒川虹の広場をイメージした虹色アニメーション */}
      <div class="relative w-20 h-20 mb-6" role="img" aria-label="読み込み中のアニメーション">
        <div class="absolute inset-0 border-4 border-blue-300 rounded-full animate-ping opacity-75"></div>
        <div class="absolute inset-2 border-4 border-purple-400 rounded-full animate-ping opacity-75" style="animation-delay: 0.5s;"></div>
        <div class="absolute inset-4 border-4 border-green-500 rounded-full animate-ping opacity-75" style="animation-delay: 1s;"></div>
        <div class="absolute inset-6 border-4 border-orange-500 rounded-full animate-pulse"></div>
      </div>
      
      {/* 荒川の流れをイメージしたローディングバー */}
      <div class="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div class="h-full rounded-full rainbow-loading"></div>
      </div>
      
      <div class="text-center">
        <p class="text-blue-600 font-bold text-lg mb-2">
          イベント情報を読み込み中...
        </p>
        <p class="text-blue-500 text-sm">
          荒川と千住大橋から最新情報をお届けします
        </p>
      </div>
      
      {/* スクリーンリーダー用の追加情報 */}
      <div class="sr-only" aria-live="polite">
        千住.devのイベント情報を取得しています。しばらくお待ちください。
      </div>
    </div>
  );
}
