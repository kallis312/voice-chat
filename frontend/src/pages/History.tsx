import { Stack, Text, Tab, TabList, TabPanel, TabPanels, Image, Tabs, HStack, AvatarGroup, Avatar, AvatarBadge, VStack, InputGroup, InputLeftElement, Input, IconButton } from "@chakra-ui/react"
import { faker } from '@faker-js/faker/locale/ja'
import { PhoneArrowUpRightIcon, PhoneIcon, TrashIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

type Props = {}

const History = (props: Props) => {
  return (
    <div className="app-container">
      <HStack py={1}>

        <InputGroup rounded='full'>
          <InputLeftElement pointerEvents='none'>
            <PhoneIcon className="w-4 h-4 text-gray-300" />
          </InputLeftElement>
          <Input w={200} type='tel' placeholder='Phone number' />
        </InputGroup>
      </HStack>
      <VStack gap={1} h={'full'} overflow={'auto'} pr={1}>
        {
          Array.from({ length: 100 }, () => ({
            // users: Array.from({ length: faker.number.int({ min: 1, max: 8 }) }, () => ({
            //   avatar: `https://randomuser.me/api/portraits/men/${faker.number.int({ min: 1, max: 20 })}.jpg`
            // })),
            timeFrom: faker.date.past(),
            creator: {
              avatar: `https://randomuser.me/api/portraits/men/${faker.number.int({ min: 1, max: 20 })}.jpg`,
              name: faker.person.fullName(),
              ID: faker.phone.number()
            },
            time: faker.number.int({ min: 1, max: 10000 })
          })).map((_, index) => (
            <HStack cursor={'pointer'} _hover={{ bg: 'teal.50' }} className=" " key={index} borderWidth={1} p={1} rounded={'md'} w={'full'} px={2}>
              <Avatar src={_.creator.avatar} />
              <VStack gap={0} align={'start'}>
                <Text isTruncated w={100}>{_.creator.name}</Text>
                <Text isTruncated w={150}>({_.creator.ID})</Text>
              </VStack>
              {/* <AvatarGroup size='sm' max={5} >
                {_.users.map(user => <Avatar name='Ryan Florence' src={user.avatar} ></Avatar>)}
              </AvatarGroup> */}
              <Text>

              </Text>
              <HStack ml={'auto'} gap={3}>
                <VStack gap={0}>
                  <HStack ml={'auto'} display={'flex'} color={'teal.500'}><PhoneArrowUpRightIcon width={16} height={16} /><Text>{_.time}s</Text></HStack>
                  <Text ml={'auto'}>{format(_.timeFrom, "MM/dd/yyyy hh:mm:ss aa")}</Text>
                </VStack>

                <IconButton icon={<TrashIcon className="w-6 h-6" />} aria-label={""} isRound color={'gray.500'} />
              </HStack>
            </HStack>
          ))
        }
      </VStack>
    </div>
  )
}

export default History