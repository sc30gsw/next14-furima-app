import { FC } from 'react'

import { IoMdClose } from 'react-icons/io'
import { tv } from 'tailwind-variants'

const tagStyles = tv({
  slots: {
    base: 'inline-flex justify-center items-center mr-1 px-2 bg-slate-800 border border-solid border-gray-600 rounded-full pointer-events-auto',
    text: 'max-w-56 whitespace-nowrap text-sm text-ellipsis overflow-hidden',
    btn: 'ml-2 hover:opacity-80',
    icon: '',
  },
  compoundSlots: [{ slots: ['text', 'icon'], class: 'text-white' }],
})

type TagProps = Readonly<{
  keyword: string
  index: number
  onClick: (index: number) => void
}>

export const Tag: FC<TagProps> = ({ keyword, index, onClick }) => {
  const { base, text, btn, icon } = tagStyles()

  return (
    <div className={base()}>
      <span className={text()}>{keyword}</span>
      <button
        type="button"
        className={btn()}
        onClick={() => {
          onClick(index)
        }}
      >
        <IoMdClose className={icon()} size={20} />
      </button>
    </div>
  )
}
