import { defineConfig } from 'vitepress'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const siteBase = process.env.BASE_PATH || '/'
const docsRoot = join(__dirname, '..')

type ProductItem = { text: string; link: string; order: number }

function frontmatter(raw: string): string | null {
  const match = raw.match(/^---\s*[\r\n]([\s\S]*?)[\r\n]---/)
  return match ? match[1] : null
}

function readMeta(filePath: string, fallback: string): { title: string; order: number } {
  let title = fallback
  let order = 999
  try {
    const raw = readFileSync(filePath, 'utf-8')
    const fm = frontmatter(raw)
    if (fm) {
      const t = fm.match(/^sidebarTitle:\s*(.+)$/m) || fm.match(/^title:\s*(.+)$/m)
      if (t) title = t[1].trim().replace(/^["']|["']$/g, '')
      const o = fm.match(/^order:\s*(\d+)/m)
      if (o) order = Number(o[1])
    }
    if (title === fallback) {
      const h1 = raw.match(/^#\s+(.+)$/m)
      if (h1) title = h1[1].trim()
    }
  } catch {
    /* ignore unreadable files */
  }
  return { title, order }
}

// Auto-discovers every product page under `<locale>/guide/*.md` (except index.md).
// Adding a new product = drop one Markdown file per language. No config edits needed.
function productItems(localePrefix: string): { text: string; link: string }[] {
  const guideDir = join(docsRoot, localePrefix, 'guide')
  if (!existsSync(guideDir) || !statSync(guideDir).isDirectory()) return []

  return readdirSync(guideDir)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .map<ProductItem>((f) => {
      const slug = f.replace(/\.md$/, '')
      const { title, order } = readMeta(join(guideDir, f), slug)
      return { text: title, link: `/${localePrefix}guide/${slug}`, order }
    })
    .sort((a, b) => a.order - b.order || a.text.localeCompare(b.text))
    .map(({ text, link }) => ({ text, link }))
}

const strings = {
  root: { overview: '소개', products: '기믹 라인업', onThisPage: '이 페이지에서', prev: '이전', next: '다음' },
  en: { overview: 'Overview', products: 'Gimmick lineup', onThisPage: 'On this page', prev: 'Previous', next: 'Next' },
  ja: { overview: 'はじめに', products: 'ギミック一覧', onThisPage: 'このページ', prev: '前へ', next: '次へ' },
  zh: { overview: '概览', products: '机关列表', onThisPage: '本页目录', prev: '上一页', next: '下一页' }
}

function sidebar(prefix: string, labels: { overview: string; products: string }) {
  return [
    { text: labels.overview, link: `/${prefix}guide/` },
    { text: labels.products, collapsed: false, items: productItems(prefix) }
  ]
}

export default defineConfig({
  base: siteBase,
  cleanUrls: true,
  lastUpdated: true,
  appearance: false,

  title: 'IruaAtelier',
  description: 'Starlit VRChat gimmick documentation by IruaAtelier',

  head: [
    ['link', { rel: 'icon', href: `${siteBase}irua-logo.png` }],
    ['meta', { name: 'theme-color', content: '#8a63ff' }]
  ],

  locales: {
    root: { label: '한국어', lang: 'ko-KR', title: 'IruaAtelier', description: 'VRChat 기믹 설명서' },
    en: { label: 'English', lang: 'en-US', link: '/en/', title: 'IruaAtelier', description: 'VRChat gimmick documentation' },
    ja: { label: '日本語', lang: 'ja-JP', link: '/ja/', title: 'IruaAtelier', description: 'VRChatギミック説明書' },
    'zh-cn': { label: '简体中文', lang: 'zh-CN', link: '/zh-cn/', title: 'IruaAtelier', description: 'VRChat 机关说明文档' }
  },

  themeConfig: {
    logo: '/irua-logo.png',
    search: { provider: 'local' },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} IruaAtelier`
    },

    locales: {
      root: {
        nav: [
          { text: '홈', link: '/' },
          { text: '설명서', link: '/guide/' },
          { text: 'Booth 상점', link: 'https://vulpeculakitsune.booth.pm' }
        ],
        sidebar: sidebar('', strings.root),
        outline: { level: [2, 3], label: strings.root.onThisPage },
        docFooter: { prev: strings.root.prev, next: strings.root.next },
        returnToTopLabel: '맨 위로',
        langMenuLabel: '언어 변경'
      },
      en: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Docs', link: '/en/guide/' },
          { text: 'Booth', link: 'https://vulpeculakitsune.booth.pm' }
        ],
        sidebar: sidebar('en/', strings.en),
        outline: { level: [2, 3], label: strings.en.onThisPage },
        docFooter: { prev: strings.en.prev, next: strings.en.next }
      },
      ja: {
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: '説明書', link: '/ja/guide/' },
          { text: 'Booth', link: 'https://vulpeculakitsune.booth.pm' }
        ],
        sidebar: sidebar('ja/', strings.ja),
        outline: { level: [2, 3], label: strings.ja.onThisPage },
        docFooter: { prev: strings.ja.prev, next: strings.ja.next }
      },
      'zh-cn': {
        nav: [
          { text: '首页', link: '/zh-cn/' },
          { text: '说明文档', link: '/zh-cn/guide/' },
          { text: 'Booth', link: 'https://vulpeculakitsune.booth.pm' }
        ],
        sidebar: sidebar('zh-cn/', strings.zh),
        outline: { level: [2, 3], label: strings.zh.onThisPage },
        docFooter: { prev: strings.zh.prev, next: strings.zh.next }
      }
    }
  }
})
