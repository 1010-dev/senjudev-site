import { useState, useEffect } from "hono/jsx";
import LoadingSpinner from "./loading-spinner";
import { DiscordIcon, ConnpassIcon } from "../components/icons";

type Event = {
  id: number;
  title: string;
  catch: string;
  description: string;
  url: string;
  image_url: string;
  hash_tag: string;
  started_at: string;
  ended_at: string;
  limit: number;
  event_type: string;
  open_status: string;
  group: {
    id: number;
    subdomain: string;
    title: string;
    url: string;
  };
  address: string;
  place: string;
  lat: string;
  lon: string;
  owner_id: number;
  owner_nickname: string;
  owner_display_name: string;
  accepted: number;
  waiting: number;
  updated_at: string;
};

type ApiResponse = {
  upcoming: {
    events: Event[];
    results_returned: number;
    results_available: number;
    results_start: number;
  };
  past: {
    events: Event[];
    results_returned: number;
    results_available: number;
    results_start: number;
  };
  total: {
    events: Event[];
    results_returned: number;
    results_available: number;
    results_start: number;
  };
};

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function for fallback data
  const getFallbackData = (): { upcoming: Event[]; past: Event[] } => {
    return { upcoming: [], past: [] };
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch from our API endpoint properly routed
        const response = await fetch("/api/events");

        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        console.log("Connpass API response:", data);

        // Set upcoming and past events
        setUpcomingEvents(data.upcoming.events || []);
        setPastEvents(data.past.events || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(
          "イベント情報の取得に失敗しました。後でもう一度お試しください。"
        );

        // Use fallback data on error
        const fallbackData = getFallbackData();
        setUpcomingEvents(fallbackData.upcoming);
        setPastEvents(fallbackData.past);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {/* スキップリンク */}
      <a href="#events-content" class="skip-link">
        イベント一覧へスキップ
      </a>

      {loading && (
        <div
          class="flex flex-col items-center justify-center py-12 bg-white/95 backdrop-blur-lg rounded-xl mx-4"
          role="status"
          aria-live="polite"
        >
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div
          class="bg-red-50/95 backdrop-blur-lg border-2 border-red-200 rounded-xl p-6 text-center border-l-4 border-l-red-500"
          role="alert"
          aria-live="assertive"
        >
          <div class="text-red-700 text-xl font-bold mb-3">
            ⚠️ エラーが発生しました
          </div>
          <p class="text-red-600 mb-4 text-lg">{error}</p>
          <p class="text-gray-700 mb-6">しばらくしてから再度お試しください</p>
          <a
            href="https://senju.connpass.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center gap-3 justify-center min-h-[44px] border-2 border-transparent hover:border-blue-200 inline-flex"
            aria-label="connpassで千住.devのイベントを直接確認する（新しいタブで開きます）"
          >
            <ConnpassIcon className="w-5 h-5" />
            connpassで直接確認する
          </a>
        </div>
      )}

      <div id="events-content" tabindex="-1">
        {/* 開催予定のイベントセクション */}
        <div class="mb-16">
          <div class="mb-8 text-center">
            <h4 class="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <span class="text-4xl">📅</span>
              開催予定のイベント
            </h4>
            {upcomingEvents.length > 0 ? (
              <p class="text-blue-100 text-lg" aria-live="polite">
                {upcomingEvents.length}件の予定されたイベントがあります
              </p>
            ) : (
              <p class="text-blue-200 text-lg">
                現在予定されているイベントはありません
              </p>
            )}
          </div>

          {upcomingEvents.length > 0 ? (
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div class="bg-white/95 backdrop-blur-lg border-2 border-blue-200/30 rounded-xl p-8 text-center max-w-2xl mx-auto">
              <div class="text-6xl mb-4" role="img" aria-label="カレンダー">
                📅
              </div>
              <h5 class="text-xl font-bold text-gray-800 mb-4">
                現在予定されているイベントはありません
              </h5>
              <p class="text-gray-600 mb-6 leading-relaxed">
                新しいイベントが開催されると、ここに表示されます。
                <br />
                DiscordやConnpassで最新情報をチェックしてください！
              </p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://discord.gg/gMgdDhbjVg"
                  class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-300 flex items-center gap-2 justify-center border-2 border-transparent hover:border-orange-200"
                  aria-label="千住.dev Discordコミュニティに参加する（新しいタブで開きます）"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DiscordIcon className="w-4 h-4" />
                  Discord に参加
                </a>
                <a
                  href="https://senju.connpass.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center gap-2 justify-center border-2 border-transparent hover:border-blue-200"
                  aria-label="connpassで千住.devのイベントをチェックする（新しいタブで開きます）"
                >
                  <ConnpassIcon className="w-4 h-4" />
                  connpass をチェック
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 過去のイベントセクション */}
        <div class="mb-12">
          <div class="mb-8 text-center">
            <h4 class="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <span class="text-4xl">📚</span>
              過去のイベント
            </h4>
            {pastEvents.length > 0 ? (
              <p class="text-blue-100 text-lg" aria-live="polite">
                直近{pastEvents.length}件の過去のイベント
              </p>
            ) : (
              <p class="text-blue-200 text-lg">
                まだ過去のイベントはありません
              </p>
            )}
          </div>

          {pastEvents.length > 0 ? (
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast={true} />
              ))}
            </div>
          ) : (
            <div class="bg-white/90 backdrop-blur-lg border-2 border-gray-200/50 rounded-xl p-8 text-center max-w-2xl mx-auto">
              <div class="text-6xl mb-4" role="img" aria-label="本">
                📚
              </div>
              <h5 class="text-xl font-bold text-gray-700 mb-4">
                まだ過去のイベントはありません
              </h5>
              <p class="text-gray-600 leading-relaxed">
                コミュニティが始まったばかりです。
                <br />
                開催されたイベントの履歴がこちらに表示されます。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// イベントカードコンポーネント
function EventCard({
  event,
  isPast = false,
}: {
  event: Event;
  isPast?: boolean;
}) {
  // Format date from ISO string to Japanese format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const currentYear = new Date().getFullYear();
    const yearPrefix = year !== currentYear ? `${year}年` : "";

    return `${yearPrefix}${month}月${day}日(${dayOfWeek}) ${hours}:${minutes}〜`;
  };

  // より詳細な日時フォーマット（アクセシビリティ用）
  const formatDateForScreen = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ][date.getDay()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}年${month}月${day}日 ${dayOfWeek} ${hours}時${minutes}分開始`;
  };

  // Determine if registration is open
  const getEventStatus = (event: Event) => {
    const now = new Date();
    const eventDate = new Date(event.started_at);

    // 過去のイベントかチェック
    if (eventDate < now || isPast) {
      return "開催済み";
    }

    // open_statusをチェック
    if (event.open_status === "close") {
      return "募集終了";
    }

    if (event.limit === 0 || event.accepted < event.limit) {
      return "参加者募集中";
    } else if (event.waiting > 0) {
      return "補欠者募集中";
    } else {
      return "満員";
    }
  };

  // Get status color classes
  const getEventStatusClass = (event: Event) => {
    const status = getEventStatus(event);
    switch (status) {
      case "参加者募集中":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xs px-4 py-2 rounded-full border-2 border-green-400/30 min-w-[120px] text-center inline-block uppercase tracking-wide";
      case "補欠者募集中":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-xs px-4 py-2 rounded-full border-2 border-yellow-400/30 min-w-[120px] text-center inline-block uppercase tracking-wide";
      case "開催済み":
        return "bg-gray-100 text-gray-600 font-semibold text-xs px-4 py-2 rounded-full border-2 border-gray-200 min-w-[120px] text-center inline-block uppercase tracking-wide";
      case "募集終了":
      case "満員":
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold text-xs px-4 py-2 rounded-full border-2 border-gray-400/30 min-w-[120px] text-center inline-block uppercase tracking-wide";
      default:
        return "bg-gray-100 text-gray-600 font-semibold text-xs px-4 py-2 rounded-full border-2 border-gray-200 min-w-[120px] text-center inline-block uppercase tracking-wide";
    }
  };

  // 参加者情報のフォーマット
  const formatParticipants = (event: Event) => {
    const total = event.limit === 0 ? "無制限" : `${event.limit}名`;
    let text = `参加者 ${event.accepted}名 / ${total}`;
    if (event.waiting > 0) {
      text += ` (補欠 ${event.waiting}名)`;
    }
    return text;
  };

  // スクリーンリーダー用の詳細説明
  const getEventAriaLabel = (event: Event) => {
    const status = getEventStatus(event);
    const date = formatDateForScreen(event.started_at);
    const place = event.place || event.address || "場所未定";
    const participants = formatParticipants(event);

    return `${event.title}。${date}。場所：${place}。${participants}。ステータス：${status}。詳細を見るにはクリックまたはエンターキーを押してください。`;
  };

  return (
    <article
      class={`bg-white/98 backdrop-blur-lg border-2 border-blue-200/20 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:border-blue-300/40 min-h-[280px] group ${
        isPast ? "opacity-90" : ""
      }`}
    >
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={getEventAriaLabel(event)}
        class="block h-full focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
      >
        {/* イベント画像 */}
        {event.image_url && (
          <div class="relative overflow-hidden rounded-lg mb-4">
            <img
              src={event.image_url}
              alt=""
              class={`w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105 ${
                isPast ? "grayscale-[0.3]" : ""
              }`}
              loading="lazy"
            />
            <div class="absolute top-3 right-3">
              <span
                class={getEventStatusClass(event)}
                role="status"
                aria-label={`イベントステータス: ${getEventStatus(event)}`}
              >
                {getEventStatus(event)}
              </span>
            </div>
          </div>
        )}

        {/* イベントタイトル */}
        <h4
          class={`text-xl font-bold mb-3 group-hover:text-blue-900 transition-colors line-clamp-2 min-h-[3.5rem] leading-tight ${
            isPast ? "text-gray-700" : "text-gray-900"
          }`}
        >
          {event.title}
        </h4>

        {/* イベント概要 */}
        {event.catch && (
          <p class="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem] leading-relaxed">
            {event.catch}
          </p>
        )}

        {/* イベント詳細情報 */}
        <div class="space-y-4 mb-6">
          {/* 日時 */}
          <div class="flex items-start gap-3">
            <span
              class="text-blue-600 text-xl mt-1 flex-shrink-0"
              role="img"
              aria-label="日時"
            >
              📅
            </span>
            <div class="flex-1">
              <div
                class={`font-bold text-base ${
                  isPast ? "text-gray-600" : "text-blue-700"
                }`}
              >
                {formatDate(event.started_at)}
              </div>
              <div class="sr-only">{formatDateForScreen(event.started_at)}</div>
            </div>
          </div>

          {/* 場所 */}
          <div class="flex items-start gap-3">
            <span
              class="text-orange-600 text-xl mt-1 flex-shrink-0"
              role="img"
              aria-label="場所"
            >
              📍
            </span>
            <div
              class={`font-semibold text-sm flex-1 break-words ${
                isPast ? "text-gray-600" : "text-blue-800"
              }`}
            >
              {event.place || event.address || "場所未定"}
            </div>
          </div>

          {/* 参加者数 */}
          <div class="flex items-start gap-3">
            <span
              class="text-green-600 text-xl mt-1 flex-shrink-0"
              role="img"
              aria-label="参加者数"
            >
              👥
            </span>
            <div class="text-green-700 font-semibold text-sm flex-1">
              <span
                class={`font-bold ${
                  isPast ? "text-gray-600" : "text-gray-800"
                }`}
              >
                {event.accepted}
              </span>
              <span class="text-gray-600">
                /{event.limit === 0 ? "∞" : event.limit}名
              </span>
              {event.waiting > 0 && (
                <div class="text-orange-600 font-semibold mt-1">
                  補欠 {event.waiting}名
                </div>
              )}
            </div>
          </div>
        </div>

        {/* フッター情報 */}
        <div class="border-t-2 border-gray-100 pt-4 flex items-center justify-between">
          <div class="text-sm text-gray-500 font-medium">
            {event.group.title}
          </div>
          <div
            class={`text-sm font-bold flex items-center gap-2 group-hover:text-blue-800 ${
              isPast ? "text-gray-500" : "text-blue-600"
            }`}
          >
            詳細を見る
            <span
              aria-hidden="true"
              class="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}
