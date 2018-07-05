const { resolve } = require('path')

module.exports = {
  title: 'Inhaltsstoff.com',
  description: 'Film- und Buchrezensionen seit 2011',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': resolve('blog', 'assets'),
        '@theme': resolve('blog', '.vuepress', 'theme'),
        '@styles': resolve('blog', '.vuepress', 'theme', 'styles')
      }
    }
  },
  markdown: {
    anchor: {
      permalink: false,
      permalinkBefore: false
    }
  }
}
