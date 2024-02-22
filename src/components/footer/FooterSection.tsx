'use client'

import { FC, useState } from 'react'

import Link from 'next/link'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { tv } from 'tailwind-variants'

const footerSectionsStyles = tv(
  {
    slots: {
      base: 'mr-6',
      title: 'mb-4 font-bold',
      btn: 'justify-between items-center h-12 py-0 px-4 border-none cursor-pointer',
      btnLabel: 'mr-auto text-sm font-bold',
      list: 'my-4',
      link: 'mt-2',
    },
    compoundSlots: [{ slots: ['base', 'btn'], class: 'w-full' }],
    variants: {
      small: {
        true: {
          base: 'max-w-full',
          title: 'hidden',
          btn: 'flex',
        },
        false: {
          base: 'max-w-80',
          title: 'block',
          btn: 'hidden',
        },
      },
      isOpen: {
        true: {
          list: 'block px-4',
        },
        false: {
          list: 'hidden lg:block',
        },
      },
    },
  },
  { responsiveVariants: ['lg'] },
)

type FooterSectionProps = Readonly<{ label: string; links: string[] }>

export const FooterSection: FC<FooterSectionProps> = ({ label, links }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { base, title, btn, btnLabel, list, link } = footerSectionsStyles({
    small: { initial: true, lg: false },
    isOpen,
  })

  return (
    <section className={base()}>
      <p className={title()}>{label}</p>
      <button
        type="button"
        className={btn()}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <span className={btnLabel()}>{label}</span>
        {isOpen ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
      </button>
      <ul className={list()}>
        {links.map((linkLabel) => (
          <li key={linkLabel} className={link()}>
            <Link href="#">{linkLabel}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
