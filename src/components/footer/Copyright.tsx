import { tv } from 'tailwind-variants'

const copyrightStyles = tv({
  slots: {
    base: 'flex-grow',
    copyright: 'block w-full box-border text-right',
  },
})

export const Copyright = () => {
  const { base, copyright } = copyrightStyles()

  return (
    <div className={base()}>
      <span className={copyright()}>@ Caricari, Inc.</span>
    </div>
  )
}
