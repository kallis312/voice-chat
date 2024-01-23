import { Button, Stack, Text } from "@chakra-ui/react"
import { BuildingOffice2Icon, ClipboardDocumentListIcon, DocumentTextIcon, PhoneIcon, Squares2X2Icon, UserGroupIcon, UserIcon, UsersIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid"
import classNames from "classnames"
import { Link } from "react-router-dom"

type MenuItemProps = {
  color: string,
  icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>,
  label: string,
  to: string
}

type Props = {

}

const menuData: Array<MenuItemProps> = [
  // {
  //   color: "pink",
  //   icon: Squares2X2Icon,
  //   label: "待機画面",
  //   to: '/'
  // },
  {
    color: "gray",
    icon: PhoneIcon,
    label: "通 貨",
    to: '/call'
  },
  {
    color: "gray",
    icon: UserGroupIcon,
    label: "連絡先",
    to: '/address-book'
  },
  {
    color: "gray",
    icon: DocumentTextIcon,
    label: "通話歴史",
    to: '/history'
  },
  {
    color: "gray",
    icon: WrenchScrewdriverIcon,
    label: "設 定",
    to: '/setting/profile'
  },
]

const MenuItem = ({ color, icon: Icon, label, to }: MenuItemProps) => {
  return (
    <>
      <Button size={'auto'} py={3} pl={3} pr={8} as={Link} fontSize={24} leftIcon={<Icon width={48} height={48} className="p-2 text-white bg-teal-600 rounded-full" />} variant={'outline'} to={to} colorScheme="teal" >
        <Text w={'full'} textAlign={'center'} pl={4} letterSpacing={8} >{label}</Text>
      </Button>
    </>
  )
}

const LeftSidebar = (props: Props) => {
  return (
    <Stack display={['none', 'none', 'flex']} direction={['row', 'row', 'column']} p={2} wrap={'wrap'} className="flex flex-col gap-2 pr-2">
      {
        menuData.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))
      }
    </Stack>
  )
}

export default LeftSidebar