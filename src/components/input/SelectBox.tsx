import { ComponentProps } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { tv } from 'tailwind-variants'

const selectBoxStyles = tv({
  slots: {
    base: 'mb-4',
    selectBoxLabelWrapper: 'text-sm font-bold cursor-text',
    labelText: 'mb-1',
    selectBoxWrapper:
      'inline-flex rounded overflow-hidden border border-gray-400',
    selectBox:
      'block box-border flex-1 m-0 p-4 cursor-pointer border-none outline-none appearance-none text-left text-base font-medium bg-transparent',
    secondaryContentWrapper: 'justify-start flex-col',
    secondaryLabelWrapper: '',
    secondaryLabelText: '',
    errorMsg: 'text-red-500',
  },
  compoundSlots: [
    { slots: ['base', 'selectBoxWrapper', 'selectBox'], class: 'w-full' },
    {
      slots: ['labelText', 'secondaryContentWrapper', 'secondaryLabelText'],
      class: 'flex',
    },
    { slots: ['labelText', 'selectBoxWrapper'], class: 'items-center' },
    { slots: ['secondaryLabelWrapper', 'errorMsg'], class: 'mt-1' },
    { slots: ['secondaryLabelText', 'errorMsg'], class: 'text-xs font-normal' },
  ],
  variants: {
    hasError: {
      true: {
        selectBoxWrapper: 'border-red-500',
      },
    },
  },
})

type SelectBoxProps<T extends FieldValues> = Readonly<{
  id: ComponentProps<'select'>['id']
  name: Path<T>
  control: Control<T>
  error?: string
  label: string
  secondaryLabel?: string
  selectBoxLabel: string
  options: string[]
  disabled: boolean
}>

export const SelectBox = <T extends FieldValues>({
  id,
  name,
  control,
  error,
  label,
  secondaryLabel,
  selectBoxLabel,
  options,
  disabled,
}: SelectBoxProps<T>) => {
  const {
    base,
    selectBoxLabelWrapper,
    labelText,
    selectBoxWrapper,
    selectBox,
    secondaryContentWrapper,
    secondaryLabelWrapper,
    secondaryLabelText,
    errorMsg,
  } = selectBoxStyles({ hasError: !!error })

  return (
    <div className={base()}>
      <label className={selectBoxLabelWrapper()}>
        <span className={labelText()}>{label}</span>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className={selectBoxWrapper()}>
              <select
                {...field}
                id={id}
                disabled={disabled}
                className={selectBox()}
              >
                <option value="">{selectBoxLabel}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
      </label>
      <div className={secondaryContentWrapper()}>
        <div className={secondaryLabelWrapper()}>
          <p className={secondaryLabelText()}>{secondaryLabel}</p>
        </div>
        {error && <p className={errorMsg()}>{error}</p>}
      </div>
    </div>
  )
}
