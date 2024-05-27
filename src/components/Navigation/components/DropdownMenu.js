import React from 'react'
import Translate from '@docusaurus/Translate';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  BookOpenIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'

const MENUS = [{
    name: 'Webinars',
    description: 'Join online discussions or training sessions, sharing audio, documents, or slides',
    href: '/webinars-page',
    icon: CursorArrowRaysIcon
  }, {
    name: 'Partners',
    description: 'Partners of IvorySQL',
    href: '/partners-page',
    icon: ChartPieIcon
  }, {
    name: 'Customer Stories',
    description: "Customer Stories",
    href: '/customer-stories-page',
    icon: BookOpenIcon
  }, {
    name: 'Contribution Guidelines',
    description: 'Guide how to contribulte to the IvorySQL on Github',
    href: '/contribution-guidelines',
    icon: PencilSquareIcon
  }
]

/**
 * @description resources dropdown menu
 * @returns 
 */
export default function DropdownMenu() {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300 hover:bg-gray-700 hover:text-white">
        <span className='nav-item rounded-md'>
          <Translate>Resources</Translate>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      </PopoverButton>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-4 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {MENUS.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      <Translate>{item.name}</Translate>
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">
                      <Translate>
                        {item.description}
                      </Translate>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}
