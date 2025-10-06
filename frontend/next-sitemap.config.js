/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://genealogyhub.ru', // ✅ домен твоего сайта
	generateRobotsTxt: true, // ✅ чтобы сгенерировать robots.txt
	generateIndexSitemap: true, // ✅ для многоязычного проекта

	// 🚫 Страницы, которые не должны попасть в sitemap
	exclude: [
		'/ru/auth/*',
		'/en/auth/*',
		'/ru/dashboard/*',
		'/en/dashboard/*',
		'/ru/lear-more',
		'/en/lear-more',
		'/ru/terms',
		'/en/terms',
		'/ru/tree/feedback',
		'/en/tree/feedback'
	],

	// 🔧 Дополнительные правила для robots.txt
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/', // Разрешить индексировать всё
				disallow: [
					'/ru/auth',
					'/en/auth',
					'/ru/dashboard',
					'/en/dashboard',
					'/ru/lear-more',
					'/en/lear-more',
					'/ru/terms',
					'/en/terms',
					'/ru/tree/feedback',
					'/en/tree/feedback'
				]
			}
		]
	},

	// ✅ Если используешь i18n
	transform: async (config, path) => {
		// Убираем auth страницы из sitemap (они всё равно не нужны)
		if (path.startsWith('/auth') || path.includes('/exists')) {
			return null
		}

		return {
			loc: path,
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date().toISOString(),
			alternateRefs: [
				{ href: `https://genealogyhub.ru`, hreflang: 'en' },
				{ href: `https://genealogyhub.ru`, hreflang: 'ru' }
			]
		}
	}
}
