import { useState } from 'hono/jsx'

export default function LoadingSpinner() {
  return (
    <div class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-400"></div>
    </div>
  )
}
