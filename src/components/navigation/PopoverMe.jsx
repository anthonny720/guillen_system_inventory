import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";



export default function PopoverMe({onClick}) {
    const user=useSelector(state=>state.Auth.user);
    const list = [
  {
    name: 'Cerrar Sesion',
    description: user?.first_name + " " +  user?.last_name||'Cierra la sesion actual',
    href: '/login',
    icon: IconTwo,
  }
]
  return (
    <div className="relative w-full  px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center p-2 rounded-md bg-[#00579B] px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <FontAwesomeIcon  icon={faUserCircle} />
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-full  -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 ">
                    {list.map((item) => (
                      <NavLink onClick={()=>onClick()}
                        key={item.name}
                        to={item.href}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}


function IconTwo() {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width="48"
      height="48" viewBox="0 0 24 24"  fill={"#00579B"}>
        <path
            d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221c1.004-.456 2.115-.716 3.288-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2c1.451.82 3.124 1.294 4.911 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"/></svg>

  )
}

