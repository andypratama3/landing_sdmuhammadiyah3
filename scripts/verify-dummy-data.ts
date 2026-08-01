/**
 * Dummy Data Verification Script
 * 
 * Run this script to verify that the dummy data system is working correctly:
 * - In development: Should work when enabled
 * - In production: Should NEVER work
 * 
 * Usage:
 *   npx tsx scripts/verify-dummy-data.ts
 */

import { shouldUseDummyData, getDummyData } from '../lib/dummy-data'
import { isDummyDataEnabled } from '../config/dummy-data.config'

console.log('🔍 Dummy Data System Verification')
console.log('====================================')
console.log('')

// Check current environment
console.log('📊 Environment Check:')
console.log(`  NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`  Dummy Data Enabled: ${isDummyDataEnabled()}`)
console.log(`  Should Use Dummy Data: ${shouldUseDummyData()}`)
console.log('')

// Production safety check
if (process.env.NODE_ENV === 'production') {
  console.log('🚨 PRODUCTION MODE DETECTED')
  console.log('✅ Dummy data is correctly DISABLED in production')
  console.log('✅ This is the expected behavior')
  console.log('')
  
  // Verify that dummy data returns null
  const beritaData = getDummyData('/berita')
  const galleryData = getDummyData('/gallery')
  const fasilitasData = getDummyData('/fasilitas')
  
  console.log('🔒 Data Access Check:')
  console.log(`  Berita Data: ${beritaData === null ? '✅ null (safe)' : '❌ DATA RETURNED (unsafe!)'}`)
  console.log(`  Gallery Data: ${galleryData === null ? '✅ null (safe)' : '❌ DATA RETURNED (unsafe!)'}`)
  console.log(`  Fasilitas Data: ${fasilitasData === null ? '✅ null (safe)' : '❌ DATA RETURNED (unsafe!)'}`)
  console.log('')
  
  if (beritaData === null && galleryData === null && fasilitasData === null) {
    console.log('✅ PRODUCTION SAFETY VERIFIED: All systems secure')
    process.exit(0)
  } else {
    console.log('❌ PRODUCTION SAFETY FAILED: Dummy data is accessible!')
    console.log('❌ This is a CRITICAL security issue!')
    process.exit(1)
  }
} else {
  console.log('🛠️  DEVELOPMENT MODE DETECTED')
  console.log('')
  
  if (isDummyDataEnabled()) {
    console.log('✅ Dummy data is ENABLED for development')
    console.log('✅ This is the expected behavior when configured')
    console.log('')
    
    // Test data access
    const beritaData = getDummyData('/berita')
    const galleryData = getDummyData('/gallery')
    const fasilitasData = getDummyData('/fasilitas')
    
    console.log('📦 Data Access Check:')
    console.log(`  Berita Data: ${Array.isArray(beritaData) ? `✅ Array (${beritaData?.length} items)` : '❌ Not an array'}`)
    console.log(`  Gallery Data: ${Array.isArray(galleryData) ? `✅ Array (${galleryData?.length} items)` : '❌ Not an array'}`)
    console.log(`  Fasilitas Data: ${Array.isArray(fasilitasData) ? `✅ Array (${fasilitasData?.length} items)` : '❌ Not an array'}`)
    console.log('')
    
    if (Array.isArray(beritaData) && Array.isArray(galleryData) && Array.isArray(fasilitasData)) {
      console.log('✅ DEVELOPMENT MODE VERIFIED: Dummy data working correctly')
      console.log('✅ Ready for local development')
      process.exit(0)
    } else {
      console.log('❌ DEVELOPMENT MODE FAILED: Dummy data not working properly')
      process.exit(1)
    }
  } else {
    console.log('ℹ️  Dummy data is DISABLED')
    console.log('ℹ️  Real API will be used')
    console.log('ℹ️  To enable dummy data, set USE_DUMMY_DATA to true in config/dummy-data.config.ts')
    console.log('')
    
    // Verify that dummy data returns null
    const beritaData = getDummyData('/berita')
    const galleryData = getDummyData('/gallery')
    const fasilitasData = getDummyData('/fasilitas')
    
    console.log('🔒 Data Access Check:')
    console.log(`  Berita Data: ${beritaData === null ? '✅ null (using real API)' : '❌ Unexpected data'}`)
    console.log(`  Gallery Data: ${galleryData === null ? '✅ null (using real API)' : '❌ Unexpected data'}`)
    console.log(`  Fasilitas Data: ${fasilitasData === null ? '✅ null (using real API)' : '❌ Unexpected data'}`)
    console.log('')
    
    if (beritaData === null && galleryData === null && fasilitasData === null) {
      console.log('✅ REAL API MODE VERIFIED: Ready to use production API')
      process.exit(0)
    } else {
      console.log('❌ API MODE FAILED: Unexpected data returned')
      process.exit(1)
    }
  }
}