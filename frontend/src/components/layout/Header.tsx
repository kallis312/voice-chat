
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { ArrowRightEndOnRectangleIcon, PhoneXMarkIcon, UserIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"
type Props = {}

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Header = (props: Props) => {
  return (
    <div className='border-b py-1 shadow-md bg-white'>
      <div className='container mx-auto pl-12 pr-4 flex gap-4 items-center justify-between'>
        <div className="flex gap-4 items-center">
          <img src='/image/logo.webp' className='h-16 2-16 p-1' alt='logo' />
          <h1 className="text-4xl font-medium text-green-500 tracking-wide">POTACON</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* <div className="relative flex items-end hover:bg-gray-100 rounded-full px-1 py-1">
            <PhoneXMarkIcon className={classNames('w-10 transition-all ease-in-out h-10 rounded-full p-2 text-blue-500')} />
            <span className="absolute flex top-0 right-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 text-xs text-white justify-center items-center p-1">12</span>
            </span>
          </div> */}
          <Menu>
            <MenuButton >
              <Avatar src='https://randomuser.me/api/portraits/men/1.jpg' className='h-16 w-16 rounded-full p-2' />
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to={'/setting/profile'} color={'teal'} icon={<UserIcon width={22} height={22} />}>プロフィール</MenuItem>
              <MenuItem color={'teal'} icon={<ArrowRightEndOnRectangleIcon width={22} height={22} />}>ログアウト</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

    </div>
  )
}

export default Header