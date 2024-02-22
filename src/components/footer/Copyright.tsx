import { FC } from 'react'
import { tv } from 'tailwind-variants'

const copyrightStyles = tv(
  {
    slots: {
      base: 'grow',
      copyright: 'block w-full box-border text-right',
    },
    variants: {
      isAuth: {
        true: {
          base: 'grow-0 mx-10',
          copyright:
            'py-5 hyphens-auto break-words text-base font-medium text-gray-400',
        },
      },
      textHorizontal: {
        left: { copyright: 'text-left' },
        right: { copyright: 'text-right' },
      },
    },
  },
  { responsiveVariants: ['lg'] },
)

type CopyrightProps = Readonly<{ isAuth?: boolean }>

export const Copyright: FC<CopyrightProps> = ({ isAuth }) => {
  const { base, copyright } = copyrightStyles({
    isAuth,
  })

  return (
    <div className={base()}>
      <span
        className={
          isAuth
            ? copyright({ textHorizontal: { initial: 'left', lg: 'right' } })
            : copyright()
        }
      >
        @ Caricari, Inc.
      </span>
    </div>
  )
}
