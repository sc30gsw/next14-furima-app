import { FC, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'cmdk'
import { Check, ChevronsUpDown } from 'lucide-react'
import { tv } from 'tailwind-variants'

const comboboxStyles = tv(
  {
    slots: {
      labelWrapper: 'font-bold cursor-text',
      labelText: 'mb-2',
      btn: 'justify-between py-7 font-medium border border-gray-400',
      upDownIcon: 'shrink-0 ml-2 opacity-50',
      comboboxContents: 'w-[300px] z-10 mt-2 bg-white border border-gray-400',
      commandInput:
        'py-2 border-b border-gray-200 outline-none appearance-none text-left font-medium bg-transparent',
      commandItem: 'gap-1 pl-2 hover:bg-gray-200 transition duration-300',
      check: 'mr-2 opacity-0',
      secondaryWrapper: 'flex-col justify-center',
      secondaryLabelWrapper: '',
      secondaryLabelText: '',
      errMsg: 'text-red-500',
    },
    compoundSlots: [
      {
        slots: ['labelWrapper', 'secondaryLabelText', 'errMsg'],
        class: 'text-sm',
      },
      {
        slots: [
          'labelText',
          'commandItem',
          'secondaryWrapper',
          'secondaryLabelText',
        ],
        class: 'flex',
      },
      { slots: ['labelText', 'commandItem'], class: 'items-center' },
      { slots: ['btn', 'commandInput'], class: 'w-full m-0 text-base' },
      { slots: ['upDownIcon', 'check'], class: 'h-4 w-4' },
      { slots: ['comboboxContents', 'commandInput'], class: 'px-4' },
      {
        slots: ['btn', 'comboboxContents', 'commandInput'],
        class: 'border-solid',
      },
      { slots: ['comboboxContents', 'commandItem'], class: 'py-1' },
      { slots: ['btn', 'commandItem'], class: 'cursor-pointer' },
      { slots: ['comboboxContents', 'commandItem'], class: 'rounded-md' },
      {
        slots: ['commandItem', 'secondaryLabelWrapper', 'errMsg'],
        class: 'mt-1',
      },
      { slots: ['secondaryLabelText', 'errMsg'], class: 'font-normal' },
    ],
    variants: {
      hasError: {
        true: { btn: 'border-red-500' },
      },
      isCheck: {
        true: { check: 'opacity-100' },
      },
      width: {
        md: { comboboxContents: 'w-[570px]' },
        sm: { comboboxContents: 'w-[400px]' },
      },
    },
  },
  { responsiveVariants: ['md', 'sm'] },
)

type ComboboxProps = Readonly<{
  placeholder: string
  error?: string
  label: string
  secondaryLabel?: string
  selectBoxLabel: string
  options: string[]
  disabled: boolean
  setValue: (value: string) => void
}>

export const Combobox: FC<ComboboxProps> = ({
  placeholder,
  error,
  label,
  secondaryLabel,
  selectBoxLabel,
  options,
  disabled,
  setValue,
}) => {
  const {
    labelWrapper,
    labelText,
    btn,
    upDownIcon,
    comboboxContents,
    commandInput,
    commandItem,
    check,
    secondaryWrapper,
    secondaryLabelWrapper,
    secondaryLabelText,
    errMsg,
  } = comboboxStyles({ width: { sm: 'sm', md: 'md' } })

  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <label className={labelWrapper()}>
        <span className={labelText()}>{label}</span>
        <PopoverTrigger asChild={true}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={btn({ hasError: !!error })}
            disabled={disabled}
          >
            {selectedValue
              ? options.find((option) => option === selectedValue)
              : selectBoxLabel}
            <ChevronsUpDown className={upDownIcon()} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={comboboxContents()}>
          <Command>
            <CommandInput
              placeholder={placeholder}
              onValueChange={(search) => setInputValue(search)}
              className={commandInput()}
            />
            <CommandEmpty>
              「{inputValue}」は見つかりませんでした。
            </CommandEmpty>
            <CommandGroup>
              {options.map((value) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={(currentValue) => {
                    setSelectedValue(
                      currentValue === selectedValue ? '' : currentValue,
                    )
                    setValue(currentValue === selectedValue ? '' : currentValue)
                    setOpen(false)
                  }}
                  className={commandItem()}
                >
                  <Check
                    className={check({ isCheck: selectedValue === value })}
                  />
                  {value}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </label>
      <div className={secondaryWrapper()}>
        <div className={secondaryLabelWrapper()}>
          <p className={secondaryLabelText()}>{secondaryLabel}</p>
        </div>
        {error && <p className={errMsg()}>{error}</p>}
      </div>
    </Popover>
  )
}
