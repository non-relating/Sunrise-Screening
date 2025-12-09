/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_GA_TRACKING_ID: string
  readonly VITE_ENABLE_CHAT: string
  readonly VITE_ENABLE_PWA: string
  readonly VITE_ENABLE_OFFLINE_MODE: string
  readonly VITE_BUSINESS_NAME: string
  readonly VITE_BUSINESS_PHONE: string
  readonly VITE_BUSINESS_EMAIL: string
  readonly VITE_SERVICE_AREA: string
  readonly VITE_DEBUG_MODE: string
  readonly VITE_LOG_LEVEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}