import Link from 'next/link'
import { FC } from 'react'
import { tv } from 'tailwind-variants'

const authFooterListStyles = tv(
  {
    slots: {
      base: 'flex gap-4 mr-8 my-auto ml-auto py-5 text-sm',
      link: 'hover:underline hover:text-gray-500',
    },
    variants: {
      direction: {
        col: { base: 'flex-col' },
        row: { base: 'flex-row' },
      },
    },
  },
  { responsiveVariants: ['lg'] },
)

type AuthFooterListProps = Readonly<{
  links: ['プライバシーポリシー', 'カリカリ利用規約', '特定商取引に関する表記']
}>

export const AuthFooterList: FC<AuthFooterListProps> = ({ links }) => {
  const { base, link } = authFooterListStyles({
    direction: { initial: 'col', lg: 'row' },
  })

  return (
    <ul className={base()}>
      {links.map((linkLabel) => (
        <li key={linkLabel}>
          <Link href="#" className={link()}>
            {linkLabel}
          </Link>
        </li>
      ))}
    </ul>
  )
}
