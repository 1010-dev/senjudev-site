import { useState, useEffect } from "hono/jsx";
import LoadingSpinner from "./loading-spinner";

type Event = {
  event_id: number;
  title: string;
  started_at: string;
  place: string;
  address: string;
  limit: number;
  accepted: number;
  waiting: number;
  event_url: string;
};

type ApiResponse = {
  events: Event[];
  results_returned: number;
  results_available: number;
  results_start: number;
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function for fallback data
  const getFallbackData = (): Event[] => {
    return [];
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

        // Check if we got any events back
        if (data.events && data.events.length > 0) {
          setEvents(data.events);
        } else {
          console.log(
            "No events found in the API response, using fallback data"
          );
          // Use fallback data if no events were returned
          setEvents(getFallbackData());
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(
          "イベント情報の取得に失敗しました。後でもう一度お試しください。"
        );

        // Use fallback data on error
        setEvents(getFallbackData());
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format date from ISO string to Japanese format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  };

  // Determine if registration is open
  const getEventStatus = (event: Event) => {
    if (event.limit === 0 || event.accepted < event.limit) {
      return "参加者募集中";
    } else if (event.waiting > 0) {
      return "補欠者募集中";
    } else {
      return "募集終了";
    }
  };

  return (
    <div>
      <h3 class="text-2xl font-medium mt-16 mb-8">開催予定のイベント</h3>

      {loading && <LoadingSpinner />}

      {error && (
        <div class="py-6 px-4 border border-red-200 bg-red-50 rounded-lg text-center">
          <p class="text-red-600 mb-2">{error}</p>
          <p class="text-gray-600">しばらくしてから再度お試しください</p>
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div class="py-8 px-4 border border-gray-200 bg-gray-50 rounded-lg text-center">
          <p class="text-lg text-gray-600 mb-2">
            現在予定されているイベントはありません
          </p>
          <p class="text-gray-500">
            新しいイベントが開催されると、ここに表示されます
          </p>
          <a
            href="https://senju.connpass.com/"
            target="_blank"
            class="inline-block mt-4 text-orange-500 hover:text-orange-600 underline"
          >
            connpassで最新情報をチェック
          </a>
        </div>
      )}

      <div class="flex flex-wrap justify-center gap-5">
        {events.map((event) => (
          <a
            href={event.event_url}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gray-100 text-gray-800 w-64 rounded-lg p-5 text-left block hover:bg-gray-200 transition-colors"
          >
            <h4 class="text-xl font-bold mb-3">{event.title}</h4>
            <p class="text-base my-1">{formatDate(event.started_at)}</p>
            <p class="text-base my-1">
              {event.place || event.address || "場所未定"}
            </p>
            <span class="inline-block bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm mt-3 float-right">
              {getEventStatus(event)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
