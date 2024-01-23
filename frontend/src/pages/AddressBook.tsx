import AddresBookModal from "@/components/Addressbook/AddresBookModal"
import { Avatar, Box, Divider, IconButton, Input, InputGroup, InputLeftElement, Stack, VStack } from "@chakra-ui/react"
import { faker } from '@faker-js/faker/locale/ja'
import { MagnifyingGlassIcon, PhoneArrowUpRightIcon, TrashIcon } from "@heroicons/react/24/solid"

const AddressBook = () => {
  return (
    <div className="app-container">
      <div className="flex pb-1 gap-1">
        {/* <Button fontSize={16} fontWeight={'normal'} size={'sm'} rounded={6} variant={'solid'} colorScheme="teal">
          <Text display={['none', 'none', 'block']}>個人</Text>
        </Button>
        <Button fontSize={16} fontWeight={'normal'} size={'sm'} rounded={6} variant={'outline'} colorScheme="teal">
          <Text display={['none', 'none', 'block']}>グループ</Text>
        </Button> */}

        <InputGroup mr={2} rounded={'lg'} w={200}>
          <InputLeftElement pointerEvents='none'>
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-300" />
          </InputLeftElement>
          <Input type='tel' placeholder='通貨検索' />
        </InputGroup>

        <AddresBookModal />
      </div>
      <Divider mb={1} />
      <div className="app-container pr-1 gap-1 pb-1">
        {
          Array.from({ length: 100 }).map((_, i) => (
            <Stack direction={['column', 'column', 'row']} cursor={'pointer'} _hover={{ bg: 'teal.50', shadow: 'md', }} transitionDuration={'0.4s'} alignItems={'center'} rounded={'md'} borderWidth={1} p={2} key={i} >
              <div className="flex items-center gap-2 w-full">
                <div className="border-4 border-gray-50 shadow-md rounded-full relative">
                  <Avatar className="min-w-16 w-16 h-16 min-h-16 rounded-full" src={`https://randomuser.me/api/portraits/men/${faker.number.int({ min: 1, max: 20 })}.jpg`} />
                  <Box position={'absolute'} bottom={0} right={0} w={4} h={4} rounded={99} borderWidth={2} borderColor={'white'} bg={faker.helpers.arrayElement(['gray.500', 'red.500', 'green.500'])} />
                </div>
                <VStack w={'full'} align={'start'} gap={0}>
                  <p>{faker.phone.number()}</p>
                  <p className="font-medium text-gray-900">{faker.person.fullName()}</p>
                  <p>{faker.internet.email()}</p>
                </VStack>
              </div>
              <div className="flex gap-2">
                {/* <IconButton icon={<NoSymbolIcon className="w-6 h-6" />} aria-label={""} isRound color={faker.helpers.arrayElement(['white', 'red.500'])} />
                <IconButton icon={<HeartIcon className="w-6 h-6" />} aria-label={""} isRound color={faker.helpers.arrayElement(['white', 'pink.500'])} /> */}
                <IconButton icon={<PhoneArrowUpRightIcon className="w-6 h-6" />} aria-label={""} isRound color={'teal.500'} />
                <IconButton icon={<TrashIcon className="w-6 h-6" />} aria-label={""} isRound color={'gray.500'} />
              </div>
            </Stack>
          ))
        }

      </div>
    </div>
  )
}

export default AddressBook