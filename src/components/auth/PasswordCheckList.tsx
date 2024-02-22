import { FC } from 'react'
import { FaCheck } from 'react-icons/fa'
import { tv } from 'tailwind-variants'

const passwordCheckListStyles = tv({
  slots: {
    base: 'mt-2',
    list: 'flex-col gap-1 text-slate-900',
    checkerLabel: 'items-center gap-2',
    icon: '',
  },
  compoundSlots: [{ slots: ['list', 'checkerLabel'], class: 'flex' }],
  variants: {
    isSafety: {
      true: {
        icon: 'text-emerald-600',
      },
    },
  },
})

type PasswordCheckListProps = Readonly<{
  checkList: { label: string; isSafety: boolean }[]
}>

export const PasswordCheckList: FC<PasswordCheckListProps> = ({
  checkList,
}) => {
  const { base, list, checkerLabel, icon } = passwordCheckListStyles()

  return (
    <div className={base()}>
      <ul className={list()}>
        {checkList.map((checker) => (
          <li key={checker.label} className={checkerLabel()}>
            <FaCheck className={icon({ isSafety: checker.isSafety })} />
            {checker.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
