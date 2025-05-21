import { createRoute } from 'honox/factory'
import { cache } from 'hono/cache'

// ランダムなリクエストIDを生成する関数
const generateRandomRequestId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// APIリクエストを行う関数 (再試行ロジックを含む)
async function fetchConnpassEvents(retryCount = 0, maxRetries = 3) {
  try {
    // リクエストごとにユニークなIDを生成
    const requestId = generateRandomRequestId();

    // キーワード検索でAPIを呼び出す - リクエストIDを追加
    const url = `https://connpass.com/api/v1/event/?keyword=senju.dev&order=2&count=10&format=json&_=${requestId}`;
    console.log(`Requesting: ${url} (attempt ${retryCount + 1}/${maxRetries + 1})`);

    const response = await fetch(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
          'Referer': 'https://senju.dev/',
          'Origin': 'https://senju.dev',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
      }
    );

    console.log(`API Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Attempt ${retryCount + 1} failed:`, error);

    // 再試行回数上限に達していない場合は再試行
    if (retryCount < maxRetries) {
      // 指数関数的に待機時間を増やす (1秒、2秒、4秒...)
      const waitTime = 1000 * Math.pow(2, retryCount);
      console.log(`Retrying in ${waitTime}ms...`);

      await new Promise(resolve => setTimeout(resolve, waitTime));
      return fetchConnpassEvents(retryCount + 1, maxRetries);
    }

    // 再試行回数を超えた場合はエラーをスロー
    throw error;
  }
};

// フォールバックデータを提供する関数
function getFallbackEvents() {
  return {
    events: [],
    results_returned: 0,
    results_available: 0,
    results_start: 1
  };
}

export default createRoute(
  cache({
    cacheName: 'connpass-cache',
    cacheControl: 'max-age=1800', // 1時間キャッシュ
  }),
  async (c) => {
    try {
      console.log('Fetching events from Connpass API...');

      // 再試行ロジック付きのAPI呼び出し関数を使用
      const data = await fetchConnpassEvents();

      // APIからのレスポンスをログに記録
      console.log('API Response Data:', JSON.stringify(data).substring(0, 200) + '...');

      return c.json(data);
    } catch (error) {
      console.error('All attempts to fetch events failed:', error);

      // エラー時はフォールバックデータを返す
      const fallbackData = getFallbackEvents();
      console.log('Returning fallback data');

      return c.json(fallbackData);
    }
  }
)
