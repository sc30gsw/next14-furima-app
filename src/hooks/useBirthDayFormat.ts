import { SignUpFormInput } from '@/types/schemas/signUpFormInput'
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react'
import { UseFormSetValue } from 'react-hook-form'

export const useBirthDayFormat = (
  setBirthDayValue: Dispatch<SetStateAction<string>>,
  setValue: UseFormSetValue<SignUpFormInput>,
) => {
  const birthDayFormat = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      // 数字のみ受け付ける（数字のみ入力させる）
      const input = e.target.value.replace(/[^\d]/g, '')

      let formattedValue = ''

      // 数字のみで構成された文字列に対して、スラッシュを挿入
      for (let i = 0; i < input.length; i++) {
        if (i === 4 || i === 6) {
          // 年の後と月の後にスラッシュを挿入
          formattedValue += '/'
        }
        formattedValue += input[i]
      }

      setBirthDayValue(formattedValue)

      setValue('birthDay', formattedValue, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    },
    [setBirthDayValue, setValue],
  )

  return { birthDayFormat }
}
