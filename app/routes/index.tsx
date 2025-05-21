import { createRoute } from 'honox/factory'
import Events from '../islands/events'
import Sponsors from '../islands/sponsors'

export default createRoute((c) => {
  return c.render(
    <div class="bg-[#1a2a42] text-white min-h-screen">
      <div class="max-w-3xl mx-auto px-6 py-8 text-center">
        <title>千住.dev コミュニティハブ</title>
        
        {/* Logo */}
        <div class="mt-10 mb-4">
          <svg class="w-32 h-auto mx-auto mb-3" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ff8c00" d="M220,75 L80,75 L80,50 C80,36.2 91.2,25 105,25 L195,25 C208.8,25 220,36.2 220,50 L220,75 Z M250,75 L220,75 L220,50 C220,36.2 208.8,25 195,25 L250,25 L250,75 Z M50,75 L80,75 L80,50 C80,36.2 91.2,25 105,25 L50,25 L50,75 Z" 
                class="filter drop-shadow-[0_0_15px_rgba(255,140,0,0.5)]" />
          </svg>
        </div>
        
        {/* Site Name and Description */}
        <h1 class="text-5xl font-medium text-gray-300 my-2">senju.dev</h1>
        <h2 class="text-3xl my-5">千住.dev コミュニティハブ</h2>
        <p class="text-xl my-5 mb-10">千住エリアの開発者向けイベントをまとめて紹介</p>
        
        {/* Slack Button */}
        <a href="#" 
           class="inline-block bg-[#e67e22] hover:bg-[#d35400] text-white px-8 py-4 rounded text-lg transition-colors my-4 mb-12">
          Slack に参加する
        </a>
        
        {/* Events Section */}
        <Events />
        
        {/* Sponsors Section */}
        <Sponsors />
      </div>
    </div>
  )
})
