export default function LoadingSpinner() {
  return (
    <div class="flex flex-col items-center justify-center py-8">
      {/* シンプルなローディングスピナー */}
      <div class="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4" role="img" aria-label="読み込み中のアニメーション"></div>
      
      <div class="text-center">
        <p class="text-gray-600 font-medium text-lg mb-2">
          イベント情報を読み込み中...
        </p>
        <p class="text-gray-500 text-sm">
          しばらくお待ちください
        </p>
      </div>
      
      {/* スクリーンリーダー用の追加情報 */}
      <div class="sr-only" aria-live="polite">
        千住.devのイベント情報を取得しています。しばらくお待ちください。
      </div>
    </div>
  );
}
