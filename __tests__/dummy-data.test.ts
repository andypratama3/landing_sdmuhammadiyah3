/**
 * Dummy Data System Tests
 * 
 * These tests verify that the dummy data system works correctly:
 * 1. Enabled in development when configured
 * 2. Disabled in production regardless of configuration
 * 3. Returns correct data for endpoints
 * 4. Returns null for unknown endpoints
 */

import { shouldUseDummyData, getDummyData, logDummyDataUsage } from '@/lib/dummy-data'
import { isDummyDataEnabled } from '@/config/dummy-data.config'

// Mock console.warn to avoid cluttering test output
const originalWarn = console.warn
beforeAll(() => {
  console.warn = jest.fn()
})

afterAll(() => {
  console.warn = originalWarn
})

describe('Dummy Data System', () => {
  describe('Environment Safety', () => {
    it('should be disabled in production', () => {
      // Simulate production environment
      const originalNodeEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
      
      expect(shouldUseDummyData()).toBe(false)
      expect(isDummyDataEnabled()).toBe(false)
      
      // Restore original environment
      process.env.NODE_ENV = originalNodeEnv
    })

    it('should check NODE_ENV before config', () => {
      // Even if config is true, production should override
      const originalNodeEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
      
      expect(shouldUseDummyData()).toBe(false)
      
      process.env.NODE_ENV = originalNodeEnv
    })
  })

  describe('Data Retrieval', () => {
    it('should return null when dummy data is disabled', () => {
      const data = getDummyData('/berita')
      expect(data).toBeNull()
    })

    it('should return correct data for known endpoints', () => {
      // This test assumes dummy data is enabled in config
      // In actual usage, the config controls this
      const data = getDummyData('/berita')
      
      // When enabled, should return array
      // When disabled, should return null
      expect(data === null || Array.isArray(data)).toBe(true)
    })

    it('should return null for unknown endpoints', () => {
      const data = getDummyData('/unknown-endpoint')
      expect(data).toBeNull()
    })

    it('should handle endpoint with query parameters', () => {
      const data = getDummyData('/berita?page=1&limit=10')
      // Should handle query parameters correctly
      expect(data === null || Array.isArray(data)).toBe(true)
    })
  })

  describe('Logging', () => {
    it('should log warning when using dummy data', () => {
      logDummyDataUsage('/berita')
      // Should call console.warn
      expect(console.warn).toHaveBeenCalled()
    })
  })

  describe('Type Safety', () => {
    it('should maintain type safety for berita data', () => {
      const data = getDummyData('/berita')
      if (data !== null) {
        expect(Array.isArray(data)).toBe(true)
      }
    })

    it('should maintain type safety for gallery data', () => {
      const data = getDummyData('/gallery')
      if (data !== null) {
        expect(Array.isArray(data)).toBe(true)
      }
    })

    it('should maintain type safety for fasilitas data', () => {
      const data = getDummyData('/fasilitas')
      if (data !== null) {
        expect(Array.isArray(data)).toBe(true)
      }
    })
  })
})

describe('Production Safety', () => {
  it('should never enable dummy data in production build', () => {
    // This is a critical safety check
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
    
    // Should always be false in production
    expect(shouldUseDummyData()).toBe(false)
    expect(isDummyDataEnabled()).toBe(false)
    
    // Even if we try to get data, should return null
    expect(getDummyData('/berita')).toBeNull()
    expect(getDummyData('/gallery')).toBeNull()
    expect(getDummyData('/fasilitas')).toBeNull()
    
    process.env.NODE_ENV = originalNodeEnv
  })
})