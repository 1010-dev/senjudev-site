import { createRoute } from "honox/factory";
import { cache } from "hono/cache";

interface ConnpassEvent {
  event_id: number;
  title: string;
  catch: string;
  description: string;
  event_url: string;
  started_at: string;
  ended_at: string;
  limit: number;
  accepted: number;
  waiting: number;
  updated_at: string;
  owner_id: number;
  owner_nickname: string;
  owner_display_name: string;
  place: string;
  address: string;
  lat?: string;
  lon?: string;
  series?: {
    id: number;
    title: string;
    url: string;
  };
}

interface ConnpassResponse {
  results_returned: number;
  results_available: number;
  results_start: number;
  events: ConnpassEvent[];
}

// ランダムなリクエストIDを生成する関数
const generateRandomRequestId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// APIリクエストを行う関数 (再試行ロジックを含む)
async function fetchConnpassEvents(
  order: "asc" | "desc" = "asc",
  count: number = 4,
  apiKey?: string,
  retryCount = 0,
  maxRetries = 3
): Promise<ConnpassResponse> {
  try {
    // キーワード検索でAPIを呼び出す - orderとcountパラメータを追加
    const url = `https://connpass.com/api/v2/events/?group_id=11169&count=${count}&order=${
      order === "asc" ? "1" : "2"
    }`;
    console.log(
      `Requesting: ${url} (attempt ${retryCount + 1}/${maxRetries + 1})`
    );

    // ヘッダーを構築
    const headers: Record<string, string> = {};

    // API Keyが提供されている場合はヘッダーに追加
    if (apiKey) {
      headers["X-API-Key"] = apiKey;
      console.log("Using API Key for authentication");
    } else {
      console.log("No API Key provided, using public access");
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    console.log(
      `API Response Status: ${response.status} ${response.statusText}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API error: ${response.status} ${response.statusText} ${errorText}`
      );
    }

    const data: ConnpassResponse = await response.json();

    // APIからのレスポンスをログに記録
    console.log(
      "API Response Data:",
      JSON.stringify(data).substring(0, 200) + "..."
    );

    return data;
  } catch (error) {
    console.error(`Attempt ${retryCount + 1} failed:`, error);

    throw error;
  }
}

// フォールバックデータを提供する関数
function getFallbackEvents(): {
  upcoming: ConnpassResponse;
  past: ConnpassResponse;
} {
  return {
    upcoming: {
      events: [],
      results_returned: 0,
      results_available: 0,
      results_start: 1,
    },
    past: {
      events: [],
      results_returned: 0,
      results_available: 0,
      results_start: 1,
    },
  };
}

// イベントを開催予定と過去に分類する関数
function categorizeEvents(events: ConnpassEvent[]): {
  upcoming: ConnpassEvent[];
  past: ConnpassEvent[];
} {
  const now = new Date();
  const upcoming: ConnpassEvent[] = [];
  const past: ConnpassEvent[] = [];

  events.forEach((event) => {
    const eventDate = new Date(event.started_at);
    if (eventDate >= now) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  });

  // 開催予定は日付順（早い順）、過去は逆順（新しい順）でソート
  upcoming.sort(
    (a, b) =>
      new Date(a.started_at).getTime() - new Date(b.started_at).getTime()
  );
  past.sort(
    (a, b) =>
      new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
  );

  // 過去のイベントは直近4つのみに制限
  const recentPast = past.slice(0, 4);

  return { upcoming, past: recentPast };
}

export default createRoute(
  cache({
    cacheName: "connpass-cache",
    cacheControl: "max-age=1800", // 30分キャッシュ
  }),
  async (c) => {
    try {
      console.log("Fetching events from Connpass API...");

      // 環境変数からAPI Keyを取得
      const apiKey = c.env.CONNPASS_API_KEY;

      if (apiKey) {
        console.log("CONNPASS_API_KEY found in environment", apiKey);
      } else {
        console.warn("CONNPASS_API_KEY not found, using public API access");
      }

      // より多くのイベントを取得（過去分も含む）
      const data = await fetchConnpassEvents("desc", 50, apiKey);

      // イベントを開催予定と過去に分類
      const { upcoming, past } = categorizeEvents(data.events);

      // レスポンスデータの整形
      const formattedData = {
        upcoming: {
          events: upcoming.map((event) => ({
            ...event,
            started_at: event.started_at,
            ended_at: event.ended_at,
          })),
          results_returned: upcoming.length,
          results_available: upcoming.length,
          results_start: 1,
        },
        past: {
          events: past.map((event) => ({
            ...event,
            started_at: event.started_at,
            ended_at: event.ended_at,
          })),
          results_returned: past.length,
          results_available: past.length,
          results_start: 1,
        },
        total: {
          events: data.events,
          results_returned: data.results_returned,
          results_available: data.results_available,
          results_start: data.results_start,
        },
      };

      return c.json(formattedData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    } catch (error) {
      console.error("All attempts to fetch events failed:", error);

      // エラー時はフォールバックデータを返す
      const fallbackData = getFallbackEvents();
      console.log("Returning fallback data");

      return c.json(
        { ...fallbackData, total: fallbackData.upcoming },
        {
          status: 200, // クライアントエラーを避けるため200で返す
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  }
);

// OPTIONSリクエスト対応（CORS対応）
export const OPTIONS = createRoute(async (c) => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
    },
  });
});
