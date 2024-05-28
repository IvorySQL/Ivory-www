import React, { useEffect } from 'react'
import Link from '@docusaurus/Link'
import Translate, { translate } from '@docusaurus/Translate';
import { useLocation } from '@docusaurus/router';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

import ivoryIcon from '/img/ivory.png'
import { classNames } from '../../utils'

import DropdownMenu from './components/DropdownMenu'
import DropdownLang from './components/DropdownLang'
import './style.css'

const NAVIGATIONS = [{
  name: 'Docs',
  href: 'https://docs.IvorySQL.org',
  outFlag: true
}, {
  name: 'Blog',
  href: '/blog'
}, {
  name: 'Installation',
  href: 'https://docs.ivorysql.org/en/ivorysql-doc/v3.2/v3.2/3#quick-installation',
  outFlag: true
}, {
  name: 'Downloads',
  href: 'https://github.com/IvorySQL/IvorySQL/releases',
  outFlag: true
}, {
  name: 'Releases',
  href: '/releases-page',
}, {
  name: 'Community',
  href: '/community-page'
}, {
  name: 'Gitee',
  href: 'https://gitee.com/IvorySQL/',
  outFlag: true
}, {
  name: 'GitHub',
  href: 'https://github.com/IvorySQL/IvorySQL',
  outFlag: true
}]


const Navigation = () => {
  const location = useLocation();
  useEffect(() => {
    console.log('Naviation did mount')
    return () => {
      console.log('cleanup')
    }
  }, [])

  return (
    <div className='tailwind tailwind-navbar'>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 xl:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center xl:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center xl:justify-start">
                  <Link
                    to="/"
                    className="flex flex-shrink-0 items-center justify-around text-white font-bold
                     hover:bg-gray-700 hover:text-white rounded-md p-1"
                  >
                    <img
                      className="h-8 w-auto"
                      src={ivoryIcon}
                      alt="IvorySQL Logo"
                    />
                    <span className='ml-3'>IvorySQL</span>
                  </Link>
                  <div className="hidden xl:ml-6 xl:block">
                    <div className="flex space-x-4">
                      {NAVIGATIONS.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            location.pathname.includes(item.href) ? 'bg-gray-900 text-indigo-600' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'nav-item'
                          )}
                          aria-current={location.pathname.includes(item.href) ? 'page' : undefined}
                        >
                          <span><Translate>{item.name}</Translate></span>
                          {item.outFlag && <ArrowTopRightOnSquareIcon className="block h-4 w-4" aria-hidden="true" />}
                        </Link>
                      ))}
                      <DropdownMenu />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 xl:static xl:inset-auto xl:ml-6 xl:pr-0">
                  {/* Language dropdown */}
                  <DropdownLang />
                </div>
              </div>
            </div>

            {/* mobile menu */}
            <DisclosurePanel className="xl:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {NAVIGATIONS.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      location.pathname.includes(item.href) ? 'bg-gray-900 text-indigo-600' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'flex items-center rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={location.pathname.includes(item.href) ? 'page' : undefined}
                  >
                    <span>{item.name}</span>
                    {item.outFlag && <ArrowTopRightOnSquareIcon className="block h-4 w-4" aria-hidden="true" />}
                  </DisclosureButton>
                ))}
                <DropdownMenu />
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default Navigation