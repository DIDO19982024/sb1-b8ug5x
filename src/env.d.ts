/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MARINE_TRAFFIC_API_KEY: string
  readonly VITE_PORT_MMSI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}