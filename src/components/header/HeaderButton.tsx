'use client'

import { ComponentProps, FC } from 'react'
import { tv } from 'tailwind-variants'

const headerButtonStyles = tv({
  slots: {
    base: 'group relative p-2 hover:bg-gray-200 hover:rounded-full',
    tooltip:
      "hidden group-hover:inline absolute -bottom-11 -translate-x-1/2 whitespace-nowrap rounded bg-gray-300 px-2 py-2 text-black before:content-[''] before:absolute before:-translate-x-1/2 before:bottom-full before:border-4 before:border-t-0 before:border-transparent before:border-b-gray-300",
  },
  variants: {
    isRight: {
      true: {
        tooltip: '-left-7 before:right-2',
      },
      false: {
        tooltip: 'left-1/2 before:left-1/2',
      },
    },
  },
})

type HeaderButtonProps = Readonly<{
  label: string
  // biome-ignore lint/correctness/noUndeclaredVariables: JSX is global
  icon: JSX.Element
  onClick?: ComponentProps<'button'>['onClick']
}>

export const HeaderButton: FC<HeaderButtonProps> = ({
  label,
  // biome-ignore lint/style/useNamingConvention: It is component
  icon: Icon,
  onClick,
}) => {
  const { base, tooltip } = headerButtonStyles({
    isRight: label === 'やることリスト',
  })
  return (
    <button type="button" className={base()} onClick={onClick}>
      {Icon}
      <span className={tooltip()}>{label}</span>
    </button>
  )
}
