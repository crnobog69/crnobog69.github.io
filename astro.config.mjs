// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "static",
	build: {
		inlineStylesheets: "auto",
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					// Ensure SCSS compatibility
				},
			},
		},
		build: {
			cssCodeSplit: false,
			rollupOptions: {
				output: {
					assetFileNames: "assets/[name].[hash][extname]",
				},
			},
		},
	},
});
