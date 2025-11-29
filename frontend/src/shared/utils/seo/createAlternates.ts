export function createAlternates(locale: string, path: string) {
	return {
	  canonical: `https://genealogyhub.ru/${locale}${path}`,
	  languages: {
		en: `https://genealogyhub.ru/en${path}`,
		ru: `https://genealogyhub.ru/ru${path}`,
		"x-default": `https://genealogyhub.ru${path}`
	  }
	};
  }
  