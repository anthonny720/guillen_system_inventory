import {Menu, Popover, Transition} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import {Helmet} from "react-helmet";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStore} from "@fortawesome/free-solid-svg-icons";
import {Navigate, NavLink} from "react-router-dom";
import PopoverMe from "./PopoverMe";
import React, {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/actions/auth";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {get_stores} from "../../redux/actions/store";
import {map} from 'lodash'


const navigation = [{name: 'Dashboard', href: '/', current: false},
    {name: 'Categorias', href: '/categories/', current: false},
    {name: 'Productos', href: '/products/', current: false},
    {name: 'Usuarios', href: '/users/', current: false},
    {name: 'Historial', href: '/history/', current: false},]


const social = {
    solutions: [{name: 'Marketing', href: '/servicios/marketing'}, {
        name: 'Desarrollo Web', href: '/servicios/desarrollo_web'
    },],
    support: [{name: 'Guias', href: '/guias'}, {name: 'Blog', href: '/blog'},],
    company: [{name: 'Contacto', href: '/contacto'}, {name: 'Nosotros', href: '/nosotros'},],
    legal: [{name: 'Privacidad', href: '/privacidad'}, {name: 'Terminos', href: '/terminos'},],
    social: [],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Navbar() {
    const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);
    const me = useSelector(state => state.Auth.user);
    const [redirect, setRedirect] = useState(false);
    const [open, setOpen] = useState(true);
    const stores = useSelector(state => state.Store.stores)


    const dispatch = useDispatch()
    const alert = useSelector(state => state.Alert.alert)
    useEffect(() => {
        dispatch(get_stores());
    }, []);
    const logoutHandler = () => {
        dispatch(logout())
        setRedirect(true);
    }
    if (redirect) {
        window.location.reload(false)
        return <Navigate to='/'/>;
    }


    return (<>
        <Helmet>
            <title>Muebles Guillen</title>
            <meta name="description" content="Muebles Guillen"/>
        </Helmet>

        {/* Top navigation */}
        <div className="bg-white dark:bg-dark-main z-[100]">
            <div className="max-w-7xl mx-auto h-11 px-4 flex items-center justify-between sm:px-6 lg:px-8 z-[100]">
                {/* Currency selector */}
                <form className="hidden lg:block lg:flex-1">
                    <div className="flex">
                        <i className='bx bx-phone mt-0.5 mr-1 text-gray-500 dark:text-dark-txt'></i> <span
                        className='text-gray-500 dark:text-dark-txt text-xs font-gilroy-bold'>+51 982 704 759</span>
                        <span className="h-6 w-px bg-gray-400 dark:bg-dark-third mx-2" aria-hidden="true"/>
                        <i className='bx bxl-gmail mt-0.5 mr-1 text-gray-500 dark:text-dark-txt'></i> <span
                        className='text-gray-500 dark:text-dark-txt text-xs font-gilroy-bold'>anthonny720g@gmail.com</span>
                    </div>
                </form>

                <p className="flex-1 text-center text-sm font-gilroy-medium text-white z-[100]">
                    <PopoverMe onClick={logoutHandler}/>
                </p>


                <div className="flex lg:flex-1 lg:items-center lg:justify-end space-x-5 z-[100]">

                    <a href="https://wa.me/51982704759" target="_blank"
                       className="text-sm font-gilroy-semibold text-gray-400 hover:text-blue-600">
                        Soporte
                    </a>
                    {social.social.map((item) => (<a key={item.name} href={item.href} target="_blank"
                                                     className="text-gray-400 hover:text-blue-600 border px-1 rounded-full">
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="h-4 w-4" aria-hidden="true"/>
                    </a>))}
                </div>

            </div>
        </div>
        {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
        <Popover
            as="header"
            className={({open}) => classNames(open ? 'fixed inset-0 z-[100] overflow-y-auto' : '', 'bg-white dark:bg-dark-main border-t border-gray-200 dark:border-dark-third lg:static lg:overflow-y-visible')}
        >
            {({open}) => (<>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[100]  ">
                    <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                        <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                            <div className="flex-shrink-0 flex items-center">
                                <NavLink to="/">
                                    {/* Dark Image */}
                                    <img
                                        className="mx-auto w-12 h-12 p-2 w-max"
                                        src={require("../../assets/logo.png")}
                                        alt="Guillent"
                                    />

                                </NavLink>

                                <NavLink to="/"
                                         style={({isActive}) =>
                                             (isActive ? {
                                                 color: '#F21C26',
                                                 fontWeight: 'bold'
                                             } : {color: 'text-gray-500'})}
                                         className={"mx-1 hidden  sm:hidden md:flex sm:mx-4 text-lg dark:hover:text-white hover:text-[#00579B] text-gray-600 dark:text-dark-txt text-md font-gilroy-semibold"}>
                                    Dashboard
                                </NavLink>


                            </div>
                        </div>

                        <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6 ">
                            <div
                                className="flex items-center px-6 py-4 md:max-w-md md:mx-auto lg:max-w-auto lg:mx-0 xl:px-0">
                                <form className="w-full">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>

                                </form>
                            </div>
                        </div>

                        <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                            {/* Mobile menu button */}
                            <Popover.Button
                                className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                                <span className="sr-only">Almacenes</span>
                                {open ? (<XIcon className="block h-6 w-6" aria-hidden="true"/>) : (
                                    <MenuIcon className="block h-6 w-6" aria-hidden="true"/>)}
                            </Popover.Button>
                        </div>

                        <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4 ">
                            <div className=" top-16 w-56 text-right">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button
                                            className="inline-flex w-full justify-center rounded-md bg-black  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                            Almacenes
                                            <ChevronDownIcon
                                                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="px-1 py-1 ">
                                                {stores && stores !== null && map(stores, (store, index) => (
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <NavLink to={`/store/${store.slug}`} style={({isActive}) =>
                                                                (isActive ? {
                                                                    backgroundColor: '#26d07d',
                                                                    fontWeight: 'bold'
                                                                } : {backgroundColor: 'red'})}>
                                                                <button
                                                                    className={`${
                                                                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        className={"text-gray-500 mr-2  hover:text-white"}
                                                                        icon={faStore}/>
                                                                    {store.location}
                                                                </button>
                                                            </NavLink>
                                                        )}
                                                    </Menu.Item>)
                                                )}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <NavLink to="/categories/"
                                     style={({isActive}) =>
                                         (isActive ? {color: '#F21C26', fontWeight: 'bold'} : {color: 'text-gray-500'})}
                                     className="mx-3 text-lg dark:hover:text-white hover:text-[#00579B] text-gray-600 dark:text-dark-txt text-md font-gilroy-semibold text-center">
                                Categorias
                            </NavLink>
                            <NavLink to="/products/"
                                     style={({isActive}) =>
                                         (isActive ? {color: '#F21C26', fontWeight: 'bold'} : {color: 'text-gray-500'})}
                                     className="mx-3 text-lg dark:hover:text-white hover:text-[#00579B] text-gray-600 dark:text-dark-txt text-md font-gilroy-semibold text-center">
                                Productos
                            </NavLink>
                            <NavLink to="/history/"
                                     style={({isActive}) =>
                                         (isActive ? {color: '#F21C26', fontWeight: 'bold'} : {color: 'text-gray-500'})}
                                     className="mx-3 text-lg dark:hover:text-white hover:text-[#00579B] text-gray-600 dark:text-dark-txt text-md font-gilroy-semibold text-center">
                                Historial
                            </NavLink>
                            <NavLink to="/users/"
                                     style={({isActive}) =>
                                         (isActive ? {color: '#F21C26', fontWeight: 'bold'} : {color: 'text-gray-500'})}
                                     className="mx-3 text-lg dark:hover:text-white hover:text-[#00579B] text-gray-600 dark:text-dark-txt text-md font-gilroy-semibold text-center">
                                Usuarios
                            </NavLink>
                            {/*
                    {
                      account ?
                      authLinks:guestLinks
                    } */}
                        </div>
                    </div>
                </div>

                <Popover.Panel as="nav" className="lg:hidden z-[117]" aria-label="Global">
                    <div className="max-w-3xl mx-auto px-2 z-[117] pt-2 pb-3 space-y-1 sm:px-4 bg-white">
                        <div className=" top-16 w-56 z-[10]">
                            <PopoverMe onClick={logoutHandler}/>
                        </div>
                        {navigation.map((item) => (<NavLink
                            key={item.name}
                            to={`${item.href}`}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(item.current ? 'z-[117] bg-gray-100 text-gray-900' : 'z-[117] hover:bg-gray-50', 'block rounded-md py-2 px-3 text-base font-gilroy-medium')}
                        >
                            {item.name}
                        </NavLink>))}
                        <div className=" top-16 w-56 z-[100]">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button
                                        className="inline-flex w-full justify-center rounded-md bg-black  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                        Almacenes
                                        <ChevronDownIcon
                                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-1 py-1 ">
                                            {stores && stores !== null && map(stores, (store, index) => (
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <NavLink to={`/store/${store.slug}/`} style={({isActive}) =>
                                                            (isActive ? {
                                                                backgroundColor: '#26d07d',
                                                                fontWeight: 'bold'
                                                            } : {backgroundColor: 'red'})}>
                                                            <button
                                                                className={`${
                                                                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                <FontAwesomeIcon
                                                                    className={"text-gray-500 mr-2 hover:text-white"}
                                                                    icon={faStore}/>
                                                                {store.location}
                                                            </button>
                                                        </NavLink>
                                                    )}
                                                </Menu.Item>)
                                            )}
                                        </div>
                                    </Menu.Items>
                                </Transition>

                            </Menu>

                        </div>

                    </div>

                </Popover.Panel>
            </>)}
        </Popover>
    </>)
}

function EditInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function EditActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function DuplicateInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function DuplicateActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function ArchiveInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="8"
                width="10"
                height="8"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <rect
                x="4"
                y="4"
                width="12"
                height="4"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2"/>
        </svg>
    )
}

function ArchiveActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="8"
                width="10"
                height="8"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <rect
                x="4"
                y="4"
                width="12"
                height="4"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2"/>
        </svg>
    )
}

function MoveInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2"/>
            <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2"/>
            <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2"/>
        </svg>
    )
}

function MoveActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2"/>
            <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2"/>
            <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2"/>
        </svg>
    )
}

function DeleteInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2"/>
            <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2"/>
        </svg>
    )
}

function DeleteActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2"/>
            <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2"/>
        </svg>
    )
}