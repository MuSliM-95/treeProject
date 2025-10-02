/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://genealogyhub.ru',
  generateRobotsTxt: true,

  additionalPaths: async (config) => {
    const result = []
    result.push({
      loc: '/',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    })
    result.push(await config.transform(config, '/tree'))
    return result
    // return paths.map(p => config.transform(p));
  },
};
