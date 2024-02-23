import { OtherAuthButton } from '@/components/auth/OtherAuthButton'
import { SignInForm } from '@/components/auth/SignInForm'
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

const SignInPage = () => {
  const { base, titleContainer, titleWrapper, title, formWrapper } =
    signUpPageStyles()

  return (
    <main className={base()}>
      <div className={titleContainer()}>
        <div className={titleWrapper()}>
          <h1 className={title()}>ログイン</h1>
        </div>
      </div>
      <div className={formWrapper()}>
        <SignInForm />
      </div>
      <OtherAuthButton
        label="アカウントをお持ちでない方"
        href="/auth/sign-up"
        btnLabel="会員登録"
      />
    </main>
  )
}

export default SignInPage
