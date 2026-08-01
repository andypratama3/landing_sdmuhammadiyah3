# Dummy Data System for Local Development

## 🎯 Purpose

This system provides dummy data for local development when the API is not available or for testing purposes. **It is NEVER used in production.**

## 🔒 Security Features

1. **Production Protection**: Dummy data is automatically disabled in production environment
2. **Explicit Opt-in**: Must be explicitly enabled via configuration
3. **Clear Warnings**: Console warnings when dummy data is being used
4. **Type Safety**: Full TypeScript support for all dummy data

## 🚀 Setup Instructions

### 1. Enable Dummy Data (Local Development Only)

Edit `config/dummy-data.config.ts`:

```typescript
export const dummyDataConfig = {
  USE_DUMMY_DATA: true,  // Set to true to enable
  SIMULATED_LATENCY: 500,  // Optional: Add simulated delay
  ENABLE_LOGGING: true,  // Optional: Enable console logging
}
```

### 2. Disable Dummy Data (Use Real API)

Edit `config/dummy-data.config.ts`:

```typescript
export const dummyDataConfig = {
  USE_DUMMY_DATA: false,  // Set to false to disable
  SIMULATED_LATENCY: 0,
  ENABLE_LOGGING: true,
}
```

### 3. Available Dummy Data

Currently available dummy data:

- **Berita** (`/berita`, `/berita/[slug]`)
- **Gallery** (`/gallery`, `/gallery/[slug]`)
- **Fasilitas** (`/fasilitas`)

## 📝 Adding New Dummy Data

To add new dummy data:

1. Add the data to `lib/dummy-data.ts`
2. Add the endpoint mapping in `getDummyData()` function
3. Ensure proper TypeScript types

Example:

```typescript
// In lib/dummy-data.ts
export const dummyYourData: YourType[] = [
  // your dummy data here
]

// In getDummyData function
switch (cleanEndpoint) {
  case '/your-endpoint':
    return dummyYourData as unknown as T
  // ... other cases
}
```

## 🔍 How It Works

1. **Request Made**: When a component makes an API request via `useApi` hook
2. **Environment Check**: System checks if dummy data is enabled AND we're in development
3. **Dummy Data Return**: If enabled, returns dummy data instead of making API call
4. **API Fallback**: If disabled or endpoint not found, makes real API call
5. **Production Safety**: In production, always skips dummy data regardless of config

## ⚠️ Important Notes

### NEVER DO:
- ❌ Enable dummy data in production
- ❌ Commit `.env.local` with dummy data enabled
- ❌ Use dummy data for sensitive operations
- ❌ Rely on dummy data for final testing

### ALWAYS DO:
- ✅ Use dummy data only for local development
- ✅ Test with real API before deployment
- ✅ Keep dummy data types in sync with real API
- ✅ Add clear comments when adding new dummy data

## 🧪 Testing

### Test with Dummy Data

```bash
# Ensure config/dummy-data.config.ts has USE_DUMMY_DATA: true
npm run dev
```

### Test with Real API

```bash
# Ensure config/dummy-data.config.ts has USE_DUMMY_DATA: false
npm run dev
```

### Test Production Build

```bash
# Production build automatically disables dummy data
npm run build
npm start
```

## 🐛 Troubleshooting

### Dummy data not working?

1. Check `config/dummy-data.config.ts` - ensure `USE_DUMMY_DATA: true`
2. Check NODE_ENV - should be 'development'
3. Check console for warnings
4. Verify endpoint is mapped in `getDummyData()`

### Still seeing real API data?

1. Clear browser cache
2. Restart development server
3. Check API client is using the modified request method

### Want to add simulated latency?

Edit `config/dummy-data.config.ts`:

```typescript
SIMULATED_LATENCY: 1000,  // 1 second delay
```

## 📚 File Structure

```
lib/
  ├── dummy-data.ts           # Dummy data definitions
  └── api.ts                  # Modified to check for dummy data

config/
  └── dummy-data.config.ts    # Configuration file

docs/
  └── DUMMY_DATA_SETUP.md     # This file
```

## 🔐 Production Deployment

When deploying to production:

1. **No Action Required**: Dummy data is automatically disabled
2. **Verification**: System checks `NODE_ENV === 'production'`
3. **Safety First**: Even if config is set to true, production ignores it

## 📞 Support

If you encounter issues:

1. Check this documentation
2. Review console warnings
3. Verify configuration
4. Test with real API to isolate the issue