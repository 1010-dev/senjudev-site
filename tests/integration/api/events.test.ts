import { describe, it, expect, vi, beforeEach } from 'vitest'
import { unstable_dev } from 'wrangler'
import type { UnstableDevWorker } from 'wrangler'
import mockEventsResponse from '../../fixtures/connpass-response.json'

describe('API Events Integration Tests', () => {
  let worker: UnstableDevWorker

  beforeEach(async () => {
    // Mock fetch to prevent real API calls
    global.fetch = vi.fn()
    
    worker = await unstable_dev('app/server.ts', {
      experimental: { disableExperimentalWarning: true },
    })
  })

  afterEach(async () => {
    await worker.stop()
    vi.restoreAllMocks()
  })

  describe('GET /api/events', () => {
    it('should return events data with proper structure', async () => {
      // Mock successful connpass API response
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockEventsResponse,
      } as Response)

      const resp = await worker.fetch('/api/events', {
        headers: { 'CONNPASS_API_KEY': 'test-api-key' }
      })
      
      expect(resp.status).toBe(200)
      
      const data = await resp.json()
      
      // Check response structure
      expect(data).toHaveProperty('upcoming')
      expect(data).toHaveProperty('past')
      expect(data).toHaveProperty('total')
      
      // Check upcoming events structure
      expect(data.upcoming).toHaveProperty('events')
      expect(data.upcoming).toHaveProperty('results_returned')
      expect(data.upcoming).toHaveProperty('results_available')
      expect(data.upcoming).toHaveProperty('results_start')
      
      // Check past events structure
      expect(data.past).toHaveProperty('events')
      expect(data.past).toHaveProperty('results_returned')
      expect(data.past).toHaveProperty('results_available')
      expect(data.past).toHaveProperty('results_start')
    })

    it('should categorize events correctly into upcoming and past', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockEventsResponse,
      } as Response)

      const resp = await worker.fetch('/api/events', {
        headers: { 'CONNPASS_API_KEY': 'test-api-key' }
      })
      
      const data = await resp.json()
      
      // Future event should be in upcoming
      const futureEvent = data.upcoming.events.find((e: any) => e.event_id === 123456)
      expect(futureEvent).toBeDefined()
      expect(new Date(futureEvent.started_at).getTime()).toBeGreaterThan(Date.now())
      
      // Past event should be in past
      const pastEvent = data.past.events.find((e: any) => e.event_id === 654321)
      expect(pastEvent).toBeDefined()
      expect(new Date(pastEvent.started_at).getTime()).toBeLessThan(Date.now())
    })

    it('should return fallback data when API fails', async () => {
      // Mock API failure
      vi.mocked(fetch).mockRejectedValueOnce(new Error('API Error'))

      const resp = await worker.fetch('/api/events', {
        headers: { 'CONNPASS_API_KEY': 'test-api-key' }
      })
      
      expect(resp.status).toBe(200) // Should still return 200 with fallback data
      
      const data = await resp.json()
      
      // Should have fallback structure
      expect(data).toHaveProperty('upcoming')
      expect(data).toHaveProperty('past')
      expect(data).toHaveProperty('error')
      
      // Should have empty events arrays
      expect(data.upcoming.events).toEqual([])
      expect(data.past.events).toEqual([])
      
      // Should have error message
      expect(data.error).toContain('Error fetching events')
    })

    it('should return fallback data when API key is missing', async () => {
      const resp = await worker.fetch('/api/events')
      
      expect(resp.status).toBe(200)
      
      const data = await resp.json()
      
      // Should have fallback data with error
      expect(data).toHaveProperty('error')
      expect(data.error).toContain('CONNPASS_API_KEY not found')
      expect(data.upcoming.events).toEqual([])
      expect(data.past.events).toEqual([])
    })

    it('should include CORS headers', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockEventsResponse,
      } as Response)

      const resp = await worker.fetch('/api/events', {
        headers: { 'CONNPASS_API_KEY': 'test-api-key' }
      })
      
      expect(resp.headers.get('Access-Control-Allow-Origin')).toBe('*')
      expect(resp.headers.get('Access-Control-Allow-Methods')).toBe('GET, OPTIONS')
      expect(resp.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type')
    })
  })

  describe('OPTIONS /api/events', () => {
    it('should handle CORS preflight requests', async () => {
      const resp = await worker.fetch('/api/events', {
        method: 'OPTIONS'
      })
      
      expect(resp.status).toBe(204)
      expect(resp.headers.get('Access-Control-Allow-Origin')).toBe('*')
      expect(resp.headers.get('Access-Control-Allow-Methods')).toBe('GET, OPTIONS')
      expect(resp.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type, X-API-Key')
    })
  })
})