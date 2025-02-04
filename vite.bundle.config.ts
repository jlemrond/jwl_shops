import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	build: {
		lib: {
			entry: "app/exports.ts",
			name: "jwl_shops",
			// fileName will be `my-react-hooks.es.js` or `my-react-hooks.umd.js` depending on the format.
			formats: ["es"],
			fileName: (format) => `jwl_shops.${format}.js`,
		},
		rollupOptions: {
			// Make sure to externalize deps that shouldn't be bundled into your library
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
	plugins: [dts({ rollupTypes: true })],
});
