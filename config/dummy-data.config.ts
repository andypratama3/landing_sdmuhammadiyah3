/**
 * Dummy Data Configuration
 * 
 * IMPORTANT: This configuration is for LOCAL DEVELOPMENT ONLY
 * 
 * In production, dummy data will ALWAYS be disabled regardless of this setting.
 * This is enforced by the NODE_ENV check in lib/dummy-data.ts
 * 
 * To enable dummy data in local development:
 * 1. Set USE_DUMMY_DATA to true
 * 2. Make sure NODE_ENV is 'development' (default for npm run dev)
 * 
 * To disable dummy data and use real API:
 * 1. Set USE_DUMMY_DATA to false
 * 2. Or simply remove this file (default is false)
 */

export const dummyDataConfig = {
  /**
   * Enable/disable dummy data for local development
   * - true: Use dummy data instead of API calls
   * - false: Use real API data
   * 
   * DEFAULT: false (use real API)
   * Set to true only when API is unavailable for local development
   */
  USE_DUMMY_DATA: true as boolean,
  
  /**
   * Add latency to simulate real API response time (in milliseconds)
   * Set to 0 for instant response
   */
  SIMULATED_LATENCY: 500 as number,
  
  /**
   * Enable console logging for dummy data usage
   */
  ENABLE_LOGGING: true as boolean,
}

/**
 * Check if dummy data should be used
 * This is the main function that should be used throughout the app
 */
export function isDummyDataEnabled(): boolean {
  // NEVER enable in production, regardless of config
  if (process.env.NODE_ENV === 'production') {
    return false
  }
  
  // Only enable in development if config says so
  return dummyDataConfig.USE_DUMMY_DATA === true
}