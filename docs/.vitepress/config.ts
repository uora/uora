import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('uorajs/package.json')

function nav() {
  return [
    { text: 'Home', link: '/' },
    { text: 'Examples', link: '/markdown-examples' },
    { text: 'Guide', link: '/guide/what-is-vitepress', activeMatch: '/guide/' },
    {
      text: pkg.version,
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/uora/uora/blob/main/CHANGELOG.md',
        },
      ],
    },
  ]
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Uora',
  lang: 'en-US',
  description: 'Uora',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/jpeg', href: '/logo.jpeg' }],
    ['script', { src: 'https://tam.cdn-go.cn/aegis-sdk/latest/aegis.min.js' }],
    [
      'script',
      {
        id: 'aegis',
      },
      `const aegis = new Aegis({ id: '75e9mfQ3ZKlWve9bz2',reportApiSpeed: true,reportAssetSpeed: true,hostUrl: 'https://rumt-sg.com',spa: true});`,
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),
    editLink: {
      pattern: 'https://github.com/uora/uora/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Uora.IO',
    },
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/uora/uora' }],
  },
})
