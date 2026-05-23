import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Genealogy",
		short_name: "Genealogy",
		start_url: "/",
		display: "standalone",

		background_color: "#ffffff",
		theme_color: "#ffffff",

		icons: [
			{
				src: "/images/icon-192.png",
				sizes: "192x192",
				purpose: "any",
				type: "image/png",
			},
			{
				src: "/images/icon-512.png",
				sizes: "512x512",
				purpose: "maskable",
				type: "image/png",
			},
		],
	};
}