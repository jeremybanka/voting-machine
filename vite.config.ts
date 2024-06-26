import react from "@vitejs/plugin-react"
import type { UserConfig } from "vite"
import { defineConfig, loadEnv } from "vite"

const VITE_DEVELOPMENT_PORT = Number.parseInt(process.env?.VITE_DEVELOPMENT_PORT ?? `5173`, 10)

export default ({ mode }: { mode: `development` | `production` | `test` }): UserConfig => {
	// Load app-level env vars to node-level env vars.
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	return defineConfig({
		plugins: [react()],
		server: {
			cors: false,
			headers: {
				"Access-Control-Allow-Origin": `*`, // Allow CORS
			},
			host: `0.0.0.0`,
			port: VITE_DEVELOPMENT_PORT,
		},
		build: {
			minify: mode === `production`,
		},
	})
}
