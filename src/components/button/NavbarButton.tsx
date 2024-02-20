'use client'

import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'
import { tv } from 'tailwind-variants'

const navbarButtonStyles = tv({
  slots: {
    base: 'w-full min-w-14 flex items-center justify-center flex-col cursor-pointer border-none py-[5px] px-1 hover:bg-slate-100 duration-300 transition',
    buttonText: 'max-h-5 text-ellipsis break-words',
  },
})

type NavbarButtonProps = Readonly<{
  label: string
  // biome-ignore lint/correctness/noUndeclaredVariables: JSX is global
  icon: JSX.Element[]
  path: `/${string}`
}>

export const NavbarButton: FC<NavbarButtonProps> = ({
  label,
  // biome-ignore lint/style/useNamingConvention: It is component
  icon: Icon,
  path,
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const { base, buttonText } = navbarButtonStyles()

  return (
    <button
      type="button"
      className={base()}
      onClick={() => {
        router.push(path)
      }}
    >
      {pathname === path ? Icon[1] : Icon[0]}
      <span className={buttonText()}>{label}</span>
    </button>
  )
}
