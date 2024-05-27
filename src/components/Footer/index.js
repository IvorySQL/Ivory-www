import React from "react";
import Translate from '@docusaurus/Translate';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'


import ivoryIcon from '/img/ivory.png'
import TwitterIcon from '/img/x.svg'
import GitHubIcon from '/img/github.svg'
import GiteeIcon from '/img/gitee.svg'

const FOOTER = {
  Icons: [
    { name: 'GitHub', href: 'https://github.com/IvorySQL/IvorySQL', icon: GitHubIcon },
    { name: 'Gitee', href: 'https://gitee.com/IvorySQL/', icon: GiteeIcon },
    { name: 'Twitter', href: 'https://twitter.com/IvorySQL', icon: TwitterIcon }    
  ],
  Community: [
    { name: 'Docs', href: 'https://docs.IvorySQL.org' },
    { name: 'Hackers mailing list', href: 'https://lists.ivorysql.org/postorius/lists/hackers.ivorysql.org/' },
    { name: 'Users mailing list', href: 'https://lists.ivorysql.org/postorius/lists/general.ivorysql.org/' },
    { name: 'Mailing Lists', href: 'https://lists.IvorySQL.org' }
  ],
  More: [
    { name: 'IvorySQL YUM', href: 'https://yum.highgo.ca/ivorysql.html' },
    { name: 'Report an issue', href: 'https://github.com/IvorySQL/IvorySQL/issues/new/choose' }
  ]
}

export default function Footer() {
  return (
    <div className="tailwind">


      <footer className="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <img
                className="h-7"
                src={ivoryIcon}
                alt="Company name"
              />
              <p className="text-sm leading-6 text-gray-300">
                <Translate>
                  Open Source Oracle Compatible PostgreSQL.
                </Translate>
              </p>
              <div className="flex space-x-6">
                {FOOTER.Icons.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="opacity-70 hover:opacity-100"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {/* occupy */}
                {/* <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    <Translate>Community</Translate>
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {FOOTER.Community.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    <Translate>Community</Translate>  
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {FOOTER.Community.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {FOOTER.Community.map((item) => (
                      <li key={item.name}>
                        <a href={item.href}
                          className="text-sm leading-6 text-gray-300 hover:text-white flex items-center">
                          {item.name}
                          <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    <Translate>More</Translate>
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {FOOTER.More.map((item) => (
                      <li key={item.name}>
                        <a href={item.href}
                          className="text-sm leading-6 text-gray-300 hover:text-white flex items-center">
                          {item.name}
                          <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">
              Copyright © {new Date().getFullYear()} IvorySQL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
