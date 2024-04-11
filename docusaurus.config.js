// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'IvorySQL',
  tagline: 'Open Source Oracle compatible PostgreSQL',
  url: 'https://ivorySQL.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'IvorySQL', // Usually your GitHub org/user name.
  projectName: 'ivory-www', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          versions: {
            current: {label: 'Devel',},
          },
          sidebarPath: require.resolve('./sidebars.js'),
//          editUrl: 'https://github.com/IvorySQL/Ivory-www/tree/main/docs',
          editCurrentVersion: false,
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'IvorySQL Blogs',
          // Please change this to your repo.
//          editUrl: 'https://github.com/IvorySQL/Ivory-www/tree/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh-CN'],
  },
  themeConfig:
  
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
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
            label: 'Docs',
            href: 'https://docs.IvorySQL.org',
            position: 'left'
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          {
            label: 'Installation',
            href: 'https://docs.ivorysql.org/en/ivorysql-doc/v3.2/v3.2/3#quick-installation',
            position: 'left'
          },
          {
            label: 'Downloads',
            href: 'https://github.com/IvorySQL/IvorySQL/releases',
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
            label: 'Resources',
            items: [
              {
                label: 'Webinars',
                to: '/webinars-page',
              },
              {
                label: 'Partners',
                to: '/partners-page',
              },
              {
                label: 'Customer Stories',
                href: 'customer-stories-page',
              },
              {
                label: 'Contribution Guidelines',
                to: '/contribution-guidelines',
              },
            ]
          },

          //Right Side Items
          {
            label: 'Community',
            to: '/community-page',
            position: 'right'
          },
          {
            href: 'https://gitee.com/IvorySQL/',
            label: 'Gitee',
            position: 'right',
          },
          {
            href: 'https://github.com/IvorySQL/IvorySQL',
            label: 'GitHub',
            position: 'right',
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
                href: 'https://yum.highgo.ca/ivorysql.html',
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
