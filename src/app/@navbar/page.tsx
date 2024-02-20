import { NavbarButton } from '@/components/button/NavbarButton'
import { CiCamera } from 'react-icons/ci'
import { FaCamera } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoIosNotifications } from 'react-icons/io'
import { MdOutlineHome } from 'react-icons/md'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { MdPerson } from 'react-icons/md'
import { tv } from 'tailwind-variants'

const navbarStyles = tv(
  {
    base: 'grid-cols-4 z-20 sticky bottom-0 border-t border-solid border-t-slate-400 w-full bg-white',
    variants: {
      hidden: {
        true: 'hidden',
        false: 'grid',
      },
    },
  },
  { responsiveVariants: ['lg'] },
)

const Navbar = () => {
  return (
    <nav className={navbarStyles({ hidden: { initial: false, lg: true } })}>
      <NavbarButton
        label="ホーム"
        icon={[<MdOutlineHome size={32} />, <IoMdHome size={32} />]}
        path="/"
      />
      <NavbarButton
        label="お知らせ"
        icon={[
          <IoMdNotificationsOutline size={32} />,
          <IoIosNotifications size={32} />,
        ]}
        path="/notice"
      />
      <NavbarButton
        label="出品"
        icon={[<CiCamera size={32} />, <FaCamera size={32} />]}
        path="/new"
      />
      <NavbarButton
        label="マイページ"
        icon={[<MdOutlinePersonOutline size={32} />, <MdPerson size={32} />]}
        path="/mypage"
      />
    </nav>
  )
}

export default Navbar
