'use client'

import { useSearchOpen } from '@/hooks/useSearchOpen'
import Link from 'next/link'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { tv } from 'tailwind-variants'

const navbarStyles = tv(
  {
    slots: {
      base: '',
      navbarList: 'items-center',
      welcomeText: '',
      authList: '',
      link: '',
      btnList: '',
      notificationBtn: 'p-1 rounded-md',
      listingBtn:
        'h-9 px-4 cursor-pointer rounded-md shadow-md font-medium text-white bg-rose-500 duration-300 transition',
    },
    compoundSlots: [
      { slots: ['base', 'navbarList', 'welcomeText'], class: 'w-full' },
      { slots: ['base', 'welcomeText', 'authList'], class: 'h-full' },
      { slots: ['navbarList', 'authList'], class: 'flex gap-4' },
    ],
    variants: {
      hidden: {
        true: {
          base: 'hidden',
          welcomeText: 'hidden',
          btnList: 'hidden',
        },
        false: {
          welcomeText: 'block',
          btnList: 'block',
        },
      },
      justifyContent: {
        normal: {
          navbarList: 'justify-normal',
          authList: 'justify-normal w-auto',
        },
        default: {
          navbarList: 'justify-between',
          authList: 'justify-end w-full',
        },
      },
      color: {
        primary: {
          authList: 'text-blue-500',
        },
        secondary: {
          authList: 'text-black',
        },
      },
      hover: {
        default: {
          link: 'hover:brightness-150',
          notificationBtn: 'hover:bg-gray-300',
          listingBtn: 'hover:opacity-80',
        },
        secondary: {
          link: 'hover:underline hover:opacity-70',
        },
      },
    },
  },
  { responsiveVariants: ['lg'] },
)

export const Navbar = () => {
  const { isOpen } = useSearchOpen()

  const {
    base,
    navbarList,
    welcomeText,
    authList,
    link,
    btnList,
    notificationBtn,
    listingBtn,
  } = navbarStyles({
    justifyContent: { initial: 'default', lg: 'normal' },
    color: { initial: 'primary', lg: 'secondary' },
    hover: { initial: 'default', lg: 'secondary' },
  })

  return (
    <nav className={base({ hidden: isOpen })}>
      <ul className={navbarList()}>
        <li className={welcomeText({ hidden: { initial: false, lg: true } })}>
          <span>メルカリへようこそ！</span>
        </li>
        <li className={authList()}>
          <div>
            <Link href="/" className={link()}>
              ログイン
            </Link>
          </div>
          <div>
            <Link href="/" className={link()}>
              新規登録
            </Link>
          </div>
        </li>
        <li className={btnList({ hidden: { initial: true, lg: false } })}>
          <button type="button" className={notificationBtn()}>
            <IoMdNotificationsOutline size={24} />
          </button>
        </li>
        <li className={btnList({ hidden: { initial: true, lg: false } })}>
          <button type="button" className={listingBtn()}>
            出品
          </button>
        </li>
      </ul>
    </nav>
  )
}
