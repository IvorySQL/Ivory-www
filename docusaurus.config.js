// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// import gitHub from 'svg/icon-github.svg';
// import Link from '@docusaurus/Link';
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
            current: {label: '文档',},
          },
          sidebarPath: require.resolve('./sidebars.js'),
//          editUrl: 'https://github.com/IvorySQL/Ivory-www/tree/main/docs',
          editCurrentVersion: false,
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'IvorySQL Blogs',
          // Please change this to your repo.
//          editUrl: 'https://github.com/IvorySQL/Ivory-www/tree/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
    // [
    //   'content-docs',
    //   /** @type {import('@docusaurus/plugin-content-docs').Options} */
    //   ({
    //     id: 'community',
    //     path: 'community',
    //     routeBasePath: 'community',
    //     editCurrentVersion: true,
    //     showLastUpdateAuthor: true,
    //     showLastUpdateTime: true,
    //   }),
    // ],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
  },
  themeConfig:
  
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'IvorySQL Logo',
          src: 'img/logo-black.svg',
        },
        items: [
          // {
          //   label: '文档',
          //   type: 'doc',
          //   docId: 'intro',
          //   position: 'left'
          // },
          {
            type: 'docsVersionDropdown',
            position: 'left',
            nextVersionLabel: '1.5',
          },
          {
            to: '/blog',
            label: '博客',
            position: 'left'
          },
          {
            label: '下载',
            href: 'https://github.com/IvorySQL/IvorySQL/releases',
            position: 'left'
          },
          {
            label: '发布',
            to: '/release-copy',
            position: 'left'
          }, 
          {
            type: 'dropdown',
            position: 'left',
            label: '资源',
            items: [
              {
                label: '网络研讨会',
                to: '/webinars-page',
              },
              {
                label: '合作伙伴',
                to: '/partners-page',
              },
              {
                label: '客户故事',
                href: 'customer-stories-page',
              },
              {
                label: '成功案例',
                to: '/contribution-guidelines',
              },
              // {
              //   label: '更多活动',
              //   type: 'doc',
              //   docId: 'intro',
              // },
              {
                label: '文档',
                to: '/contribution-guidelines',
              },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: '社区',
            items: [
              {
                label: '行为准则',
                to: '/webinars-page',
              },
              {
                label: '邮箱列表',
                to: '/partners-page',
              },
              {
                label: '贡献-Github',
                to: 'customer-stories-page',
              },
              {
                label: '共享',
                to: '/contribution-guidelines',
              },
              {
                label: '讨论',
                to: '/contribution-guidelines',
              },
              {
                label: '订阅',
                to: '/contribution-guidelines',
              },
            ]
          },

          //Right Side Items
          {
             href:'https://github.com',
             position:'right',
             className:'github',
          },
          {
            href:'https://earth.com',
            position:'right',
            className:'earth',
          },
          {
            to: 'https://github.com/IvorySQL/IvorySQL',
            label: 'Try for Free',
            position: 'right',
            className: 'Try-for-Free',
            id: 'TtyForFree',
          },
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          // {
          //   label: '版本',
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        // style: 'dark',
        links: [
          {
            title: '关于我们',
            items: [
              {
                label: 'IvorySQL介绍',
                href: 'https://github.com/IvorySQL/IvorySQL#readme',
              },
              {
                label: '瀚高公司介绍',
                to: 'https://www.highgo.com/',
              },
              {
                label: '法律声明',
                to: '/blog',
              },
              {
                label: '问题反馈',
                to: 'https://github.com/IvorySQL/IvorySQL/issues/new/choose',
              },
            ],
          },
          {
            title: '学习',
            items: [
              {
                label: '文档',
                href: '/docs/next/intro',
              },
              {
                label: '博客',
                href: '/Blog',
              },
              {
                label: '下载',
                href: '/release',
              },
              {
                label: '快速入门',
                href: '/',
              },
              {
                label: '发行说明',
                href: '/ivorysql-v1-5-release-page',
              },
              {
                label: '网络研讨会',
                href: '/webinars-page',
              },
              {
                label: '合作伙伴',
                href: '/partners-page',
              },
              {
                label: '成功案例',
                href: '/contribution-guidelines',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: '参与进来',
                href: '/',
              },
              {
                label: '贡献文章',
                href: '/blog',
              },
              {
                label: 'Github',
                href: 'https://github.com/IvorySQL/IvorySQL',
              },
              {
                label: 'Gitee',
                href: 'https://gitee.com/IvorySQL/',
              },
              {
                label: '最新动态',
                href: '/',
              },
            ],
          },
          {
            title:' ',
            items:[
              {
                html:`<div class="air"></div>`
              },
            ]
          },
          {
            title: ' ',
            items: [
              {
                 html: `
                  <div class="other-footer">
                    <div class="other-footer-title">Subscribe to Our Newsletter</div>
                    <a href="https://lists.ivorysql.org/postorius/lists" id="other-footer-link">
                        <span class="other-footer-linkspan">Subscribe</span>
                    </a>
                    <div class="other-footer-font">
                      <span class="other-footer-font-left">提交即表示您同意</span>
                      <span class="other-footer-font-right">IvorySQL的隐私政策</span>
                    </div>
                    <div class="other-footer-allsvg">
                      <div class="other-footer-svg">
                        <a href="https://github.com/IvorySQL/IvorySQL" class="other-footer-svg-link">
                          <div class="backgruond-github"></div>
                        </a>
                      </div>
                      <div class="other-footer-svg">
                        <a href="https://twitter.com/ivorysql" class="other-footer-svg-link">
                          <div class="backgruond-twitter"></div>
                        </a>
                      </div>
                      <div class="other-footer-svg">
                        <a href="https://join.slack.com/t/ivorysql/shared_invite/zt-13shkgnsj-4kNUBnBNrg2fPhyjtMmz7A" class="other-footer-svg-link">
                          <div class="backgruond-slack"></div>
                        </a>
                      </div>
                      <div class="other-footer-svg">
                        <a href="https://www.linkedin.com/company/ivorysql/" class="other-footer-svg-link">
                          <div class="backgruond-lingying"></div>
                        </a>
                      </div>
                      <div class="other-footer-svg">
                        <a href="./blog" class="other-footer-svg-link">
                          <div class="backgruond-weixin"></div>
                        </a>
                      </div>
                      <div class="other-footer-svg">
                        <a href="https://space.bilibili.com/1630654283?spm_id_from=333.1007.0.0" class="other-footer-svg-link">
                          <div class="backgruond-bilibili"></div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="footer__copyright">Copyright © ${new Date().getFullYear()} IvorySQL.</div>
                  `
                },  
            ]
          },
        ],
      },
    }),
};
module.exports = config;
