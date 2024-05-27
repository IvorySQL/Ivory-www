import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';

import { LanguageIcon } from '@heroicons/react/24/outline';
import { classNames } from '../../../utils';

/**
 * @description language dropdown
 * @returns 
 */
export default function DropdownLanguage() {
  const { i18n } = useDocusaurusContext();
  const location = useLocation();
  const { localeConfigs, currentLocale } = i18n;

  const handleChangeLang = (langKey) => {
    const langKeysArr = Object.keys(localeConfigs)
    const { pathname } = location
    // filter old langkey in path
    const purePath = langKeysArr
      .reduce((prev, next) => {
        return prev.includes(next) ? prev.replace(`/${next}`, '') : prev
      }, pathname)

    window.location.replace(`/${langKey}${purePath}`)
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-md bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <span className="text-white flex items-center">
            <LanguageIcon className="w-6"/>
            {localeConfigs[currentLocale]?.label}
          </span>
        </MenuButton>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {Object
            .entries(localeConfigs)
            .map(([langKey, { label }]) => (
              <MenuItem key={langKey}>
                {({ focus }) => (
                  <a
                    onClick={() => handleChangeLang(langKey)}
                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    {label}
                  </a>
                )}
              </MenuItem>
            ))}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
