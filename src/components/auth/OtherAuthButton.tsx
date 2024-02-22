import { FC } from 'react'

import Link from 'next/link'
import { tv } from 'tailwind-variants'

const otherAuthButtonStyles = tv({
  slots: {
    base: 'text-center',
    labelText: 'mb-4 hyphens-auto font-normal break-words',
    btnWrapper: 'h-11 font-bold',
    btn: 'py-3 px-4 rounded-md shadow-md text-red-500 border border-red-500 hover:bg-red-200 transition duration-300',
  },
  compoundSlots: [
    { slots: ['labelText', 'btnWrapper'], class: 'text-base' },
    {
      slots: ['btnWrapper', 'btn'],
      class: 'w-full inline-flex items-center justify-center',
    },
  ],
})

type OtherAuthButtonProps = Readonly<{
  label: string
  href: '/auth/sign-in' | '/auth/sign-up'
  btnLabel: string
}>

export const OtherAuthButton: FC<OtherAuthButtonProps> = ({
  label,
  href,
  btnLabel,
}) => {
  const { base, labelText, btnWrapper, btn } = otherAuthButtonStyles()

  return (
    <div className={base()}>
      <p className={labelText()}>{label}</p>
      <div className={btnWrapper()}>
        <Link href={href} className={btn()}>
          {btnLabel}
        </Link>
      </div>
    </div>
  )
}
