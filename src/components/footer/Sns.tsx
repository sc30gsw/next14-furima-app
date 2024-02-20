import { FaFacebook } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { tv } from 'tailwind-variants'

const snsStyles = tv({
  slots: {
    base: 'flex flex-row items-center justify-normal',
    wrapper: 'inline-flex justify-between w-full',
    contents: 'inline-flex w-full cursor-pointer',
    icon: 'ml-2',
  },
})

export const Sns = () => {
  const { base, wrapper, contents, icon } = snsStyles()

  return (
    <div className={base()}>
      <div className={wrapper()}>
        <div className={contents()}>
          <FaXTwitter size={32} />
          <FaFacebook size={32} className={icon()} />
        </div>
      </div>
    </div>
  )
}
