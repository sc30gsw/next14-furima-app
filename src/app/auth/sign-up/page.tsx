import { FC } from 'react'

import { SignUpForm } from '@/components/auth/SignUpForm'
import { tv } from 'tailwind-variants'

const signUpPageStyles = tv({
  slots: {
    base: 'w-full max-w-[640px] grow mx-auto my-0 px-9 pt-10 pb-16',
    titleContainer: 'text-2xl font-bold',
    titleWrapper: 'w-full text-center',
    title: 'm-0',
    formWrapper: 'mb-8',
  },
  compoundSlots: [{ slots: ['titleWrapper', 'title'], class: 'p-0' }],
})

type SignUpPageProps = Readonly<{
  searchParams: Readonly<{ [k in string]?: string }>
}>

const SignUpPage: FC<SignUpPageProps> = ({ searchParams }) => {
  const { base, titleContainer, titleWrapper, title, formWrapper } =
    signUpPageStyles()

  return (
    <main className={base()}>
      <div className={titleContainer()}>
        <div className={titleWrapper()}>
          <h1 className={title()}>
            {searchParams.steps === 'nickname' ? '本人情報の登録' : '会員登録'}
          </h1>
        </div>
      </div>
      <div className={formWrapper()}>
        <SignUpForm />
      </div>
    </main>
  )
}

export default SignUpPage
