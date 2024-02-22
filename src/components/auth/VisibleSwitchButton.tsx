import { ComponentProps, FC } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { tv } from 'tailwind-variants'

const visibleSwitchButtonStyles = tv({
  slots: {
    base: 'min-h-9 min-w-9 py-2 pr-3 pl-1',
    btn: 'flex-col w-full select-none p-1 overflow-hidden border-none rounded cursor-pointer bg-transparent ',
    icon: 'text-gray-600',
  },
  compoundSlots: [
    {
      slots: ['base', 'btn'],
      class: 'inline-flex items-center justify-center',
    },
  ],
})

type VisibleSwitchButtonProps = Readonly<{
  type: ComponentProps<'input'>['type']
  action: ComponentProps<'svg'>['onClick']
}>

export const VisibleSwitchButton: FC<VisibleSwitchButtonProps> = ({
  type,
  action,
}) => {
  const { base, btn, icon } = visibleSwitchButtonStyles()

  return (
    <div className={base()}>
      <button type="button" className={btn()}>
        {type === 'password' ? (
          <IoMdEyeOff size={24} className={icon()} onClick={action} />
        ) : (
          <IoMdEye size={24} className={icon()} onClick={action} />
        )}
      </button>
    </div>
  )
}
