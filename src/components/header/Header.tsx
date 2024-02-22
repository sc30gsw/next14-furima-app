import Image from 'next/image'

import { CategoryList } from '@/components/CategoryList'
import { HeaderContent } from '@/components/header/HeaderContent'
import { Navbar } from '@/components/header/Navbar'
import { SearchForm } from '@/components/header/SearchForm'
import { FC } from 'react'
import { tv } from 'tailwind-variants'

const headerStyles = tv(
  {
    slots: {
      base: 'flex-col sticky top-0 bg-white z-20',
      pageHeader: 'w-full min-h-8 pb-2 border-b border-slate-200',
      wrapper: 'justify-between',
      contents: '',
      img: 'object-cover',

      navbarWrapper: 'inline-flex px-6',
    },
    variants: {
      display: {
        col: {
          wrapper: 'flex-col',
        },
        row: {
          wrapper: 'flex-row',
        },
      },

      width: {
        full: {
          contents: 'w-full',
          navbarWrapper: 'w-full',
        },
        specify: {
          contents: 'w-28',
          navbarWrapper: 'w-auto',
        },
      },
    },
    compoundSlots: [
      { slots: ['base', 'wrapper', 'contents'], class: 'flex' },
      {
        slots: ['wrapper', 'navbarWrapper'],
        class: 'items-center',
      },
      {
        slots: ['pageHeader', 'navbarWrapper'],
        class: 'h-full',
      },
    ],
  },
  { responsiveVariants: ['lg'] },
)

type HeaderProps = Readonly<{ isAuth?: boolean }>

export const Header: FC<HeaderProps> = ({ isAuth }) => {
  const { base, pageHeader, wrapper, contents, img, navbarWrapper } =
    headerStyles({
      display: { initial: 'col', lg: 'row' },
      width: { initial: 'full', lg: 'specify' },
    })

  return (
    <div className={base()}>
      <header className={pageHeader()}>
        <div className={wrapper()}>
          <div className={contents()}>
            <HeaderContent>
              <Image
                src="/icon.png"
                alt="icon"
                width={182}
                height={49}
                className={img()}
              />
            </HeaderContent>
          </div>
          {isAuth || (
            <>
              <SearchForm hidden={{ initial: true, lg: false }} />
              <div className={navbarWrapper()}>
                <Navbar />
              </div>
            </>
          )}
        </div>
        {isAuth || <CategoryList />}
      </header>
    </div>
  )
}
