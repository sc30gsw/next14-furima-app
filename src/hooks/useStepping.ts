import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

// biome-ignore lint/style/useNamingConvention: This variable is enum
export enum STEPS {
  // biome-ignore lint/style/useNamingConvention: This variable is enum object
  BASIC = 0,
  // biome-ignore lint/style/useNamingConvention: This variable is enum object
  NICKNAME = 1,
  // biome-ignore lint/style/useNamingConvention: This variable is enum object
  INFO = 2,
}

export const useStepping = () => {
  const [step, setStep] = useState(STEPS.BASIC)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const onBack = useCallback(() => {
    setStep((prevStep) => prevStep - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep((prevStep) => prevStep + 1)

    const params = new URLSearchParams(searchParams.toString())
    params.set('steps', step === 0 ? 'basic' : step === 1 ? 'nickname' : 'info')

    router.push(`${pathname}?${params}`)
  }, [step, searchParams, pathname, router])

  return { step, onBack, onNext }
}
