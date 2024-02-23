'use client'

import { ComponentProps, useState, useTransition } from 'react'

import { VisibleSwitchButton } from '@/components/auth/VisibleSwitchButton'
import { Input } from '@/components/input/Input'
import {
  SignInFormInput,
  signInFormSchema,
} from '@/types/schemas/signInFormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { tv } from 'tailwind-variants'

const signInFormStyles = tv({
  slots: {
    btnWrapper: 'h-11 my-6 font-bold text-base',
    btn: 'items-center justify-center align-middle overflow-hidden text-center m-0 box-border border border-solid border-transparent rounded-md cursor-pointer whitespace-nowrap break-words py-[11px] px-[15px] text-black duration-300 transition mr-2',
  },
  compoundSlots: [
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

export const SignInForm = () => {
  const { btnWrapper, btn } = signInFormStyles()

  const [passwordType, setPasswordType] =
    useState<ComponentProps<'input'>['type']>('password')

  const [isPending, startTransition] = useTransition()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<SignInFormInput>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SignInFormInput> = async (data) => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full inline-flex flex-col">
        <Input
          id="email"
          type="text"
          name="email"
          control={control}
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
          error={errors.password?.message}
          label="パスワード"
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
        />
      </div>
      <div className={btnWrapper()}>
        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className={btn({
            color: 'primary',
            disabled: isPending || isSubmitting,
          })}
        >
          ログイン
        </button>
      </div>
    </form>
  )
}
