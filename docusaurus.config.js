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
  customFields: {
    // Put your custom environment here
    botId: process.env.BOT_ID,
    patToken: process.env.TOKEN
  },
  
  plugins: [
    [
      'docusaurus-plugin-dotenv',
      {
          path: "./.env", // The path to your environment variables.
          safe: false, // If false ignore safe-mode, if true load './.env.example', if a string load that file as the sample
          systemvars: true, // Set to true if you would rather load all system variables as well (useful for CI purposes)
          silent: false, //  If true, all warnings will be suppressed
          expand: false, // Allows your variables to be "expanded" for reusability within your .env file
          defaults: false, //  Adds support for dotenv-defaults. If set to true, uses ./.env.defaults
      }
    ]
  ],

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
            href: 'https://docs.ivorysql.org/en/ivorysql-doc/v4.4/v4.4/3#quick-installation',
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
          {
            label: 'Online Trial',
            href: 'https://trial.ivorysql.org/',
            position: 'left'
          },

          //Right Side Items
          {
            label: 'Community',
            to: '/community-page',
            position: 'right'
          },
          {
            label: 'Developers',
            to: '/developers-page',
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
              {
                label: 'Discord',
                href: 'https://discord.gg/dxDCwPzg',
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
