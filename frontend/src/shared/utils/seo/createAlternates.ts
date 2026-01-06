export function createAlternates(path: string, lang: string) {
	return {
	  canonical: `https://genealogyhub.ru/${lang}/${path}`,
	  languages: {
		en: `https://genealogyhub.ru/en${path}`,
		ru: `https://genealogyhub.ru/ru${path}`,
		"x-default": `https://genealogyhub.ru${path}`
	  }
	};
  }
  