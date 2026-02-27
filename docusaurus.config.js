const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'IvorySQL',
  tagline: 'Open Source Oracle compatible PostgreSQL',
  url: 'https://ivorySQL.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'IvorySQL',
  projectName: 'ivory-www',
  customFields: {
    botId: process.env.BOT_ID,
    patToken: process.env.TOKEN
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    }
  },
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      ({
        hashed: true,
        language: ['en', 'zh'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarPosition: 'right',
        indexPages: true,
        indexBlog: true,
        indexDocs: false,
        ignoreFiles: ["partners-page","customer-stories-page",
          "webinars-page","slider","slider-bug","slider-bug-phone","slider-phone","slider-phone-content"],
        ignoreCssSelectors:['*.css'],
      }),
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-dotenv',
      {
          path: "./.env",
          safe: false,
          systemvars: true,
          silent: false,
          expand: false,
          defaults: false,
      }
    ]
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      ({
        docs: {
          versions: {
            current: {label: 'Devel',},
          },
          sidebarPath: require.resolve('./sidebars.js'),
          editCurrentVersion: false,
        },
        blog: {
          showReadingTime: false,
          blogSidebarCount: 0,
          postsPerPage: 100,
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en',
      },
      'zh-CN': {
        label: '中文',
        htmlLang: 'zh-CN',
        path: 'zh-CN',  // 使用小写路径，确保yarn build 一致
      },
    },
  },
  themeConfig:
    ({
      navbar: {
        style: 'dark',
        title: 'IvorySQL',
        logo: {
          alt: 'IvorySQL Logo',
          src: 'img/ivory.png',
        },
        items: [
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          {
            label: 'Releases',
            to: '/releases-page',
            position: 'left'
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Security',
            items: [
              {
                label: 'Vulnerability Management',
                to: '/vulnerability-management',
              },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Resources',
            items: [
              {
                label: 'Downloads',
                href: 'https://github.com/IvorySQL/IvorySQL/releases',
              },
              {
                label: 'Installation',
                href: 'https://docs.ivorysql.org/en/ivorysql-doc/v5.1/v5.1/3.1#quick-installation',
              },
              {
                label: 'Contribution Guidelines',
                to: '/contribution-guidelines',
              },
              {
                label: 'Webinars',
                to: '/webinars-page',
              },
              {
                label: 'Partners',
                to: '/partners-page',
              },
              {
                label: 'News',
                to: 'news',
              },
              {
                label: 'Customer Stories',
                href: 'customer-stories-page',
              },
            ]
          },
          {
            label: 'Ecological Cooperation',
            href: 'https://docs.ivorysql.org/en/ivorysql-doc/v5.1/v5.1/5.0',
            position: 'left'
          },
          {
            label: 'Online Trial',
            href: 'http://trial.ivorysql.org:8080/',
            position: 'left'
          },
          {
            label: 'Docs',
            href: 'https://docs.IvorySQL.org',
            position: 'left'
          },
          {
            label: 'Community',
            to: '/community-page',
            position: 'right'
          },
          {
            type: 'dropdown',
            position: 'right',
            label: 'Developers',
            items: [
              {
                label: 'Roadmap',
                to: '/roadmap-page',
              },
              {
                href: 'https://gitee.com/IvorySQL/',
                label: 'Gitee',
              },
              {
                href: 'https://github.com/IvorySQL/IvorySQL',
                label: 'Github',
              },
            ]
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                href: 'https://docs.IvorySQL.org',
              },
            ],
          },
          { 
            title: 'Community',
            items: [
              {
                label: 'Hackers mailing list',
                href: 'https://lists.ivorysql.org/postorius/lists/hackers.ivorysql.org/',
              },
              {
                label: 'Users mailing list',
                href: 'https://lists.ivorysql.org/postorius/lists/general.ivorysql.org/',
              },
              {
                label: 'Mailing Lists',
                href: 'https://lists.IvorySQL.org',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/IvorySQL',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/w79Ta45Gkc',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'IvorySQL GitHub',
                href: 'https://github.com/IvorySQL/IvorySQL',
              },
              {
                label: 'IvorySQL Gitee',
                href: 'https://gitee.com/IvorySQL/',
              },
              {
                label: 'IvorySQL YUM',
                href: 'https://yum.highgo.com/dists/ivorysql-rpms/',
              },
              {
                label: 'Report an issue',
                href: 'https://github.com/IvorySQL/IvorySQL/issues/new/choose',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} IvorySQL.`,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
        },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;