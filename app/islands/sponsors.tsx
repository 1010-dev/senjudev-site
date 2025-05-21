import { useState } from 'hono/jsx'

export default function Sponsors() {
  const [sponsors] = useState<string[]>(['ABC', 'cinca', 'ASIFO', 'Google'])

  return (
    <div class="mt-16">
      <h3 class="text-2xl font-medium mb-6">スポンサー</h3>
      <div class="flex justify-center items-center gap-10 flex-wrap mt-6">
        {sponsors.map((sponsor) => (
          <div class="text-gray-400 opacity-80 hover:opacity-100 transition-opacity">{sponsor}</div>
        ))}
      </div>
    </div>
  )
}
