/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_OPENAI_API: string;
	readonly VITE_SUPABASE_URL: string;
	readonly VITE_SUPABASE_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
