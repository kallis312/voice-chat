import RoomModal from "@/components/Call/RoomModal"
import { Avatar, Box, Button, Divider, HStack, IconButton, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { faker } from "@faker-js/faker/locale/ja"
import { PhoneIcon, PhoneXMarkIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

const Call = () => {
  return (
    <div className="app-container">
      <HStack justify={'end'}>
        {/* <InputGroup size={'sm'} rounded={'lg'} w={200}>
          <InputLeftElement pointerEvents='none'>
            <UserGroupIcon className="w-4 h-4 text-gray-300" />
          </InputLeftElement>
          <Input type='tel' placeholder='通貨検索' />
        </InputGroup> */}
        <RoomModal />
      </HStack>
      <Divider my={1} />
      <VStack overflow={'auto'}>
        <SimpleGrid minChildWidth={'200px'} spacing={2} pb={1} pr={1} w={'full'}>
          {
            Array.from({ length: 1 }, () => ({
              // users: Array.from({ length: faker.number.int({ min: 1, max: 8 }) }, () => ({
              //   avatar: `https://randomuser.me/api/portraits/men/${faker.number.int({ min: 1, max: 20 })}.jpg`
              // })),
              creator: {
                avatar: `https://randomuser.me/api/portraits/men/${faker.number.int({ min: 1, max: 20 })}.jpg`,
                name: faker.person.fullName(),
                phone: faker.phone.number()
              },
              timeFrom: faker.date.past(),
              time: faker.number.int({ min: 1, max: 10000 })
            })).map((_, index) => (
              <Box borderColor={'teal.500'} w={'full'} borderStyle={'dashed'} shadow={'sm'} _hover={{ shadow: 'md', bg: 'teal.50' }} key={index} borderWidth={1} p={1} rounded={'md'}>
                <HStack gap={0}>
                  <Avatar src={_.creator.avatar} />
                  <HStack>
                    <Text px={1}>
                      ({_.creator.phone}) {_.creator.name}
                    </Text>
                  </HStack>
                  {/* <AvatarGroup size='sm' max={4}>
                    {_.users.map((user, index) => <Avatar key={index} name='Ryan Florence' src={user.avatar} ><AvatarBadge boxSize='0.8em' borderWidth={2} bg='green.500' /></Avatar>)}
                  </AvatarGroup> */}
                  <HStack gap={3} ml={'auto'} justify={'space-between'}>
                    <Text whiteSpace={'nowrap'} fontSize={'sm'}>10:14:53</Text>
                    {/* <Button leftIcon={<NoSymbolIcon width={16} height={16} />} fontWeight={'normal'} rounded={'md'} size={'sm'} colorScheme="facebook">遮断</Button> */}
                    <Button leftIcon={<PhoneIcon className="w-6 h-6" />} aria-label={""} colorScheme="teal">受信</Button>
                    <Button leftIcon={<PhoneXMarkIcon className="w-6 h-6" />} aria-label={""} colorScheme="red">辞退</Button>
                    {/* <Button leftIcon={<PhoneArrowUpRightIcon width={16} height={16} />} to={'23x3bm2m3n4'} fontWeight={'normal'} rounded={'full'} size={'sm'} colorScheme="teal">発信</Button> */}
                  </HStack>
                </HStack>

                {/* <Divider my={1} /> */}

              </Box>
            ))
          }
        </SimpleGrid>
      </VStack>
    </div>
  )
}

export default Call