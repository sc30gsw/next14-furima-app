'use client'

import { ComponentProps, ReactElement, useState, useTransition } from 'react'

import { PasswordCheckList } from '@/components/auth/PasswordCheckList'
import { VisibleSwitchButton } from '@/components/auth/VisibleSwitchButton'
import { Input } from '@/components/input/Input'
import { SelectBox } from '@/components/input/SelectBox'
import { prefectures } from '@/constants/prefectures'
import { useBirthDayFormat } from '@/hooks/useBirthDayFormat'
import { STEPS, useStepping } from '@/hooks/useStepping'
import {
  SignUpFormInput,
  signUpFormSchema,
} from '@/types/schemas/signUpFormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { tv } from 'tailwind-variants'
import { z } from 'zod'
import zxcvbn from 'zxcvbn'

const signUpFormStyles = tv({
  slots: {
    privacyText: 'my-3 font-normal hyphens-auto break-words',
    btnWrapper: 'h-11 my-6 font-bold',
    btn: 'items-center justify-center align-middle overflow-hidden text-center m-0 box-border border border-solid border-transparent rounded-md cursor-pointer whitespace-nowrap break-words py-[11px] px-[15px] text-black duration-300 transition mr-2',
  },
  compoundSlots: [
    { slots: ['privacyText', 'btnWrapper'], class: 'text-base' },
    { slots: ['btnWrapper', 'btn'], class: 'w-full inline-flex' },
  ],
  variants: {
    color: {
      primary: {
        btn: 'bg-red-500 hover:bg-red-600 disabled:hover:bg-red-500',
      },
      secondary: {
        btn: 'bg-gray-300 hover:bg-gray-500 disabled:hover:bg-gray-300',
      },
    },
    disabled: {
      true: {
        btn: 'cursor-not-allowed opacity-60 hover:opacity-60',
      },
    },
  },
})

export const SignUpForm = () => {
  const { privacyText, btnWrapper, btn } = signUpFormStyles()

  const [passwordType, setPasswordType] =
    useState<ComponentProps<'input'>['type']>('password')
  const [isFocused, setIsFocused] = useState(false)
  const [birthDayValue, setBirthDayValue] = useState('')

  const [isPending, startTransition] = useTransition()

  const { step, onBack, onNext } = useStepping()

  const stepSchema = {
    [STEPS.BASIC]: z.object({
      email: signUpFormSchema.shape.email,
      password: signUpFormSchema.shape.password,
    }),
    [STEPS.NICKNAME]: z.object({ name: signUpFormSchema.shape.name }),
    [STEPS.INFO]: z.object({
      jpLastName: signUpFormSchema.shape.jpLastName,
      jpFirstName: signUpFormSchema.shape.jpFirstName,
      lastName: signUpFormSchema.shape.lastName,
      firstName: signUpFormSchema.shape.firstName,
      phoneNumber: signUpFormSchema.shape.phoneNumber,
      birthDay: signUpFormSchema.shape.birthDay,
      prefecture: signUpFormSchema.shape.prefecture,
    }),
  }

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors },
    reset,
    watch,
  } = useForm<SignUpFormInput>({
    resolver: zodResolver(stepSchema[step]),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      jpLastName: '',
      jpFirstName: '',
      lastName: '',
      firstName: '',
      phoneNumber: '',
      birthDay: '',
      prefecture: '',
    },
  })

  const { birthDayFormat } = useBirthDayFormat(setBirthDayValue, setValue)

  const email = watch('email')
  const password = watch('password')
  const name = watch('name')
  const jpLastName = watch('jpLastName')
  const lastName = watch('lastName')
  const jpFirstNameName = watch('jpFirstName')
  const firstName = watch('firstName')
  const phoneNumber = watch('phoneNumber')

  const passwordScore = zxcvbn(password).score
  const passwordContainsAlphanumericAndSymbol =
    /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(password) && /[\W_]+/.test(password)

  const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    reset()
  }

  let bodyContent: ReactElement

  switch (step) {
    case STEPS.NICKNAME: {
      bodyContent = (
        <div className="w-full inline-flex flex-col">
          <Input
            id="name"
            type="text"
            name="name"
            control={control}
            value={name}
            error={errors.name?.message}
            label="ニックネーム"
            secondaryLabel="ニックネームはあとから変更できます"
            inputLength={name.length}
            placeholder="カリカリ内のユーザー名"
          />
        </div>
      )
      break
    }

    case STEPS.INFO: {
      bodyContent = (
        <div className="w-full inline-flex flex-col">
          <Input
            id="jpLastName"
            type="text"
            name="jpLastName"
            control={control}
            value={jpLastName}
            error={errors.jpLastName?.message}
            label="姓（全角）"
            placeholder="例）山田"
            disabled={false}
          />
          <Input
            id="jpFirstName"
            type="text"
            name="jpFirstName"
            control={control}
            value={jpFirstNameName}
            error={errors.jpFirstName?.message}
            label="名（全角）"
            placeholder="例）彩"
            disabled={false}
          />
          <Input
            id="lastName"
            type="text"
            name="lastName"
            control={control}
            value={lastName}
            error={errors.lastName?.message}
            label="姓カナ（全角）"
            placeholder="例）ヤマダ"
            disabled={false}
          />
          <Input
            id="firstName"
            type="text"
            name="firstName"
            control={control}
            value={firstName}
            error={errors.firstName?.message}
            label="名カナ（全角）"
            placeholder="例）アヤ"
            disabled={false}
          />
          <Input
            id="birthDay"
            type="text"
            name="birthDay"
            control={control}
            value={birthDayValue}
            error={errors.birthDay?.message}
            label="生年月日"
            placeholder="例）1990/01/01"
            changeAction={birthDayFormat}
            disabled={false}
          />
          <Input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            control={control}
            value={phoneNumber}
            error={errors.phoneNumber?.message}
            label="電話番号"
            placeholder="例）08012345678"
            disabled={false}
          />
          <SelectBox
            id="prefecture"
            name="prefecture"
            control={control}
            error={errors.prefecture?.message}
            label="お住まいの都道府県"
            secondaryLabel="発送元の地域の表示に使用します"
            selectBoxLabel="都道府県を選択してください"
            options={prefectures}
            disabled={false}
          />
        </div>
      )
      break
    }

    default: {
      bodyContent = (
        <div className="w-full inline-flex flex-col">
          <Input
            id="email"
            type="text"
            name="email"
            control={control}
            value={email}
            error={errors.email?.message}
            label="メールアドレス"
            secondaryLabel="メールアドレスはあとから変更できます"
            placeholder="例）aya.yamada@example.com"
          />
          <Input
            id="password"
            type={passwordType}
            name="password"
            control={control}
            value={password}
            error={errors.password?.message}
            label="パスワード"
            focusAction={() => setIsFocused(true)}
            blurAction={() => setIsFocused(false)}
            optionElement={
              <VisibleSwitchButton
                type={passwordType}
                action={
                  passwordType === 'password'
                    ? () => setPasswordType('text')
                    : () => setPasswordType('password')
                }
              />
            }
            secondaryOptionElement={
              isFocused ? (
                <PasswordCheckList
                  checkList={[
                    { label: '8文字以上', isSafety: password.length >= 8 },
                    {
                      label: '半角英数字・記号で構成される',
                      isSafety: passwordContainsAlphanumericAndSymbol,
                    },
                    { label: '安全性が高い', isSafety: passwordScore > 2 },
                  ]}
                />
              ) : (
                <></>
              )
            }
          />
        </div>
      )
      break
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 2 && (
        <p className={privacyText()}>
          安心・安全にご利用いただくために、お客さまの本人情報の登録にご協力ください。他のお客さまに公開されることはありません。
        </p>
      )}
      {bodyContent}
      <div className={btnWrapper()}>
        {step !== STEPS.BASIC && (
          <button
            type="button"
            disabled={isPending || isSubmitting}
            onClick={onBack}
            className={btn({
              color: 'secondary',
              disabled: isPending || isSubmitting,
            })}
          >
            戻る
          </button>
        )}
        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className={btn({
            color: 'primary',
            disabled: isPending || isSubmitting,
          })}
        >
          {step === 2 ? '登録する' : '次へ'}
        </button>
      </div>
    </form>
  )
}
