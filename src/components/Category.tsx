'use client'

import { FC } from 'react'

import { Category as CategoryType } from '@/types/Category'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

const categoryStyles = tv({
  slots: {
    base: 'flex items-center h-cull px-4 border-b-[3px]',
    link: 'w-full min-w-0 text-center whitespace-nowrap text-sm font-bold',
  },
  variants: {
    color: {
      primary: {
        base: 'border-b-red-500',
        link: 'text-red-500',
      },
      secondary: {
        base: 'border-b-transparent',
        link: 'text-gray-400',
      },
    },
  },
})

type CategoryProps = Readonly<{ category: CategoryType }>

export const Category: FC<CategoryProps> = ({ category }) => {
  const pathname = usePathname()

  const { base, link } = categoryStyles({
    color: category.path === pathname ? 'primary' : 'secondary',
  })

  return (
    <li key={category.label} className={base()}>
      <Link href="/" className={link()}>
        {category.label}
      </Link>
    </li>
  )
}
