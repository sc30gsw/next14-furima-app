'use client'

import { Tag } from '@/components/header/Tag'
import { useSearchOpen } from '@/hooks/useSearchOpen'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ComponentProps, FC, useCallback, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { VariantProps, tv } from 'tailwind-variants'
import { v4 as uuidv4 } from 'uuid'

const searchFormStyles = tv(
  {
    slots: {
      base: 'min-w-20 min-h-7',
      pageForm: 'h-9 min-w-0 p-1 rounded border border-solid border-slate-400',
      wrapper: 'flex-wrap relative',
      tagWrapper:
        'absolute top-0 min-h-7 overflow-scroll hidden-scrollbar pointer-events-none',
      textFieldWrapper: 'inline-flex',
      textField: 'p-1 outline-none text-base font-medium',
      searchBtn: 'mr-2',
      icon: 'text-slate-400',
    },
    compoundSlots: [
      {
        slots: [
          'base',
          'pageForm',
          'wrapper',
          'tagWrapper',
          'textFieldWrapper',
          'textField',
        ],
        class: 'w-full',
      },
      { slots: ['base', 'textField'], class: 'h-full' },
      {
        slots: ['base', 'pageForm', 'wrapper', 'textFieldWrapper'],
        class: 'items-center',
      },
      { slots: ['wrapper', 'tagWrapper'], class: 'flex' },
    ],
    variants: {
      isOpen: {
        true: { pageForm: 'flex' },
        false: { base: 'max-w-[560px] ml-4', pageForm: 'flex' },
      },
      hidden: {
        true: {
          base: 'hidden',
        },
        false: {
          base: 'flex',
        },
      },
    },
  },
  { responsiveVariants: ['lg'] },
)

export const SearchForm: FC<VariantProps<typeof searchFormStyles>> = ({
  hidden,
}) => {
  const { isOpen } = useSearchOpen()

  const {
    base,
    pageForm,
    wrapper,
    tagWrapper,
    textFieldWrapper,
    textField,
    searchBtn,
    icon,
  } = searchFormStyles({ isOpen, hidden })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')

  const [inputValue, setInputValue] = useState('')
  const [paramsInput, setParamsInput] = useState('')
  const [isFocus, setIsFocus] = useState(false)

  const handleInputChange: ComponentProps<'input'>['onChange'] = (e) => {
    setInputValue(e.target.value)
    setParamsInput(e.target.value)
  }

  const deleteKeyword = useCallback(
    (index: number) => {
      const filteredKeywords = keyword?.split(' ').filter((_, i) => index !== i)

      if (!filteredKeywords) {
        return
      }

      const params = new URLSearchParams(searchParams.toString())
      params.set('keyword', filteredKeywords.join(' '))

      router.push(`${pathname}?${params}`)
    },
    [keyword, router, pathname, searchParams],
  )

  return (
    <div className={base()}>
      <form aria-label="検索" className={pageForm()}>
        <div className={wrapper()}>
          {keyword && !isFocus && (
            <div className={tagWrapper()}>
              {keyword.split(' ').map((word, index) => (
                <Tag
                  key={uuidv4()}
                  keyword={word}
                  index={index}
                  onClick={deleteKeyword}
                />
              ))}
            </div>
          )}
          <div className={textFieldWrapper()}>
            <input
              type="text"
              aria-label="検索キーワードを入力"
              placeholder={keyword ? '' : 'なにをお探しですか？'}
              className={textField()}
              onFocus={() => {
                setIsFocus(true)
                setInputValue(keyword || '')
              }}
              onBlur={() => {
                setIsFocus(false)
                setInputValue('')
              }}
              onChange={handleInputChange}
              value={inputValue}
            />
          </div>
        </div>
        <button
          type="button"
          className={searchBtn()}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('keyword', paramsInput.split(' ').join(' '))

            router.push(`${pathname}?${params}`)
            setParamsInput('')
          }}
        >
          <FaSearch className={icon()} />
        </button>
      </form>
    </div>
  )
}
