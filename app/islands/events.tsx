import { useState } from 'hono/jsx'

type Event = {
  title: string
  date: string
  location: string
  status: string
}

export default function Events() {
  const [events] = useState<Event[]>([
    {
      title: 'もくもく会#10',
      date: '5月25日',
      location: '東京都北千住',
      status: '参加者募集中',
    },
    {
      title: '千住devミートアップ',
      date: '6月8日',
      location: '東京都の都内区',
      status: '参加者募集中',
    },
    {
      title: '千住エリアのWeb勉強会',
      date: '6月22日',
      location: '東京都座区',
      status: '参加者募集中',
    },
    {
      title: '北千住ハッカソン',
      date: '7月13日',
      location: '東京都北千住',
      status: '参加者募集中',
    },
  ])

  return (
    <div>
      <h3 class="text-2xl font-medium mt-16 mb-8">開催予定のイベント</h3>
      <div class="flex flex-wrap justify-center gap-5">
        {events.map((event) => (
          <div class="bg-gray-100 text-gray-800 w-64 rounded-lg p-5 text-left">
            <h4 class="text-xl font-bold mb-3">{event.title}</h4>
            <p class="text-base my-1">{event.date}</p>
            <p class="text-base my-1">{event.location}</p>
            <span class="inline-block bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm mt-3 float-right">
              {event.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
