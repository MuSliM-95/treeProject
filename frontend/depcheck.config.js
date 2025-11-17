export default {
	ignorePatterns: [
	  'dist',
	  '.next',
	  'node_modules',
	],
	ignoreMatches: [
	  '@types/*',      // если используешь TypeScript
	  'eslint*',       // линтеры
	  'prettier*',     // форматтеры
	],
	specials: [
	  depcheck.special.eslint,
	  depcheck.special.webpack,
	  depcheck.special.typescript,
	  depcheck.special.babel,
	],
  }
  