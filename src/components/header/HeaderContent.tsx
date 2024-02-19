'use client'

import { FC, ReactNode } from 'react'

import { HeaderButton } from '@/components/header/HeaderButton'
import { SearchForm } from '@/components/header/SearchForm'
import { useSearchOpen } from '@/hooks/useSearchOpen'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { tv } from 'tailwind-variants'

const headerContentsStyles = tv(
  {
    slots: {
      contents: 'items-center',
      closeBtn:
        'p-1 mr-1 rounded-full hover:bg-gray-100 duration-300 transition',
      logo: 'flex justify-center w-full',
      icon: 'text-slate-900 group-hover:opacity-80"',
    },
    variants: {
      isOpen: {
        true: {
          contents: 'flex justify-end w-full h-full min-w-20 min-h-7 py-2',
        },
        false: { contents: 'hidden justify-end' },
      },
      hidden: {
        true: { contents: 'hidden' },
        false: { contents: 'flex' },
      },
    },
  },
  { responsiveVariants: ['lg'] },
)

type HeaderContentProps = Readonly<{ children: ReactNode }>

export const HeaderContent: FC<HeaderContentProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useSearchOpen()
  const { contents, closeBtn, logo, icon } = headerContentsStyles({
    isOpen,
  })

  return (
    <>
      {isOpen ? (
        <div className={contents()}>
          <button type="button" onClick={onClose} className={closeBtn()}>
            <IoMdClose size={32} />
          </button>
          <SearchForm hidden={{ initial: false, lg: true }} />
        </div>
      ) : (
        <>
          <div className={logo()}>
            <Link href="/">{children}</Link>
          </div>
          <div className={contents({ hidden: { initial: false, lg: true } })}>
            <HeaderButton
              label="検索"
              icon={<FaSearch className={icon()} size={24} />}
              onClick={onOpen}
            />
            <HeaderButton
              label="やることリスト"
              icon={<FaCheck className={icon()} size={24} />}
            />
          </div>
        </>
      )}
    </>
  )
}
