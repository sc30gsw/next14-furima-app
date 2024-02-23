import { ComponentProps } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { tv } from 'tailwind-variants'

const inputStyles = tv({
  slots: {
    base: 'mb-4',
    inputLabel: 'text-sm font-bold',
    labelText: 'mb-1',
    inputWrapper: 'inline-flex rounded overflow-hidden border border-gray-400',
    inputMain:
      'block flex-1 box-border m-0 p-4 text-left text-base bg-transparent border-none outline-none appearance-none',
    secondaryContentWrapper: 'justify-start flex-col',
    secondaryLabelWrapper: '',
    secondaryLabelText: '',
    secondaryTextLength: 'shrink-0 ml-auto pl-2 text-[10px] ',
    errorMsg: 'text-red-500',
  },
  compoundSlots: [
    { slots: ['base', 'inputWrapper', 'inputMain'], class: 'w-full' },
    { slots: ['inputLabel', 'inputWrapper'], class: 'cursor-text' },
    { slots: ['labelText', 'inputWrapper'], class: 'items-center' },
    {
      slots: ['labelText', 'secondaryContentWrapper', 'secondaryLabelWrapper'],
      class: 'flex',
    },
    { slots: ['inputMain', 'secondaryTextLength'], class: 'font-medium' },
    { slots: ['secondaryLabelWrapper', 'errorMsg'], class: 'mt-1' },
    { slots: ['secondaryLabelText', 'errorMsg'], class: 'text-xs font-normal' },
  ],
  variants: {
    hasError: {
      true: {
        inputWrapper: 'border-red-500',
      },
    },
  },
})

type InputProps<T extends FieldValues> = Readonly<{
  id: ComponentProps<'input'>['id']
  type: ComponentProps<'input'>['type']
  name: Path<T>
  control: Control<T>
  value?: string
  error?: string
  label: string
  secondaryLabel?: string
  inputLength?: number
  placeholder?: ComponentProps<'input'>['placeholder']
  changeAction?: ComponentProps<'input'>['onChange']
  focusAction?: ComponentProps<'input'>['onFocus']
  blurAction?: ComponentProps<'input'>['onBlur']
  disabled?: boolean
  // biome-ignore lint/correctness/noUndeclaredVariables: JSX is global
  optionElement?: JSX.Element
  // biome-ignore lint/correctness/noUndeclaredVariables: JSX is global
  secondaryOptionElement?: JSX.Element
}>

export const Input = <T extends FieldValues>({
  id,
  type,
  name,
  control,
  value,
  error,
  label,
  secondaryLabel,
  inputLength,
  placeholder,
  changeAction,
  focusAction,
  blurAction,
  disabled,
  optionElement,
  secondaryOptionElement,
}: InputProps<T>) => {
  const {
    base,
    inputLabel,
    labelText,
    inputWrapper,
    inputMain,
    secondaryContentWrapper,
    secondaryLabelWrapper,
    secondaryLabelText,
    secondaryTextLength,
    errorMsg,
  } = inputStyles({ hasError: !!error })

  return (
    <div className={base()} onFocus={focusAction} onBlur={blurAction}>
      <label className={inputLabel()}>
        <span className={labelText()}>{label}</span>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className={inputWrapper()}>
              <input
                {...field}
                id={id}
                type={type}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                maxLength={
                  name === 'name'
                    ? 20
                    : name === 'birthDay'
                      ? 10
                      : name === 'phoneNumber'
                        ? 11
                        : 128
                }
                onChange={(e) => {
                  if (changeAction) {
                    changeAction(e)
                  }
                  field.onChange(e)
                }}
                className={inputMain()}
              />
              {optionElement}
            </div>
          )}
        />
      </label>
      <div className={secondaryContentWrapper()}>
        <div className={secondaryLabelWrapper()}>
          <p className={secondaryLabelText()}>{secondaryLabel}</p>
          {name === 'name' && (
            <span className={secondaryTextLength()}>{inputLength}/20</span>
          )}
        </div>
        {error && <p className={errorMsg()}>{error}</p>}
      </div>
      {secondaryOptionElement}
    </div>
  )
}
