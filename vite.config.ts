import preact from '@preact/preset-vite';
import visualizer from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
	root: 'src',
	base: './',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		rollupOptions: {
			plugins: [
				...preact(),
				command === 'build' && visualizer({ open: true }),
			],
		},
	},
}));
