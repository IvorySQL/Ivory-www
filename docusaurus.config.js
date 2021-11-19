// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'IvorySQL',
  tagline: 'Open Source Oracle compitable PostgreSQL',
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
          sidebarPath: require.resolve('./sidebars.js'),
//          editUrl: 'https://github.com/IvorySQL/Ivory-www/tree/main/docs',
          editCurrentVersion: false,
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
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Docs',
          },
          {
            label: 'Community',
            to: '/community-page',
            position: 'right',
          },
          {
            label: 'Download',
            href: 'https://github.com/IvorySQL/IvorySQL/releases',
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
                to: '/docs/intro',
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
                label: 'Twitter',
                href: 'https://twitter.com/IvorySQL',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Website GitHub',
                href: 'https://github.com/IvorySQL/Ivory-www',
              },
              {
                label: 'IvorySQL GitHub',
                href: 'https://github.com/IvorySQL/IvorySQL',
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
        switchConfig: {
          darkIcon: '🌙',
          darkIconStyle: {
            marginLeft: '2px',
          }}},
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      
    }),
};

module.exports = config;
