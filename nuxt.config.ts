export default defineNuxtConfig({
	css: ["@/assets/css/input.css"],

	runtimeConfig: {
		public: {
			APP_ID: process.env.VITE_REALM_APP_ID,
		},
	},
  app: {
		head: {
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
			],
			title: "Qualyval-Project-1",
			link: [
				{
					href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap",
					rel: "stylesheet",
				},
				{
					href: "https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css",
					rel: "stylesheet",
				},
			],
		},
	},
    modules: [
        '@nuxtjs/tailwindcss',
    ]
})
