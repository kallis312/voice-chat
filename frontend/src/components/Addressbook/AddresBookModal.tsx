import { Avatar, Box, Button, Divider, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { faker } from '@faker-js/faker/locale/ja'
import { PhoneIcon, UserPlusIcon } from "@heroicons/react/24/solid"

const AddresBookModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box ml={'auto'}>
      <Button colorScheme="teal" fontWeight={'normal'} onClick={onOpen} rounded={99} >
        <UserPlusIcon className="w-5 h-5" />
        <Text ml={1} display={['none', 'none', 'none', 'block']}>住所追加</Text>
      </Button>
      <Modal size={['sm', 'md', 'lg']} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'normal'}>住所追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <PhoneIcon className="w-6 h-6 text-gray-300" />
              </InputLeftElement>
              <Input type='tel' placeholder='電話番号' />
            </InputGroup>
            <Text mt={3} fontSize={'sm'}>10冊の資料が現れました。</Text>
            <Divider />
            <VStack gap={0} w={'100%'} maxH={300} overflow={'auto'} pr={1}>
              {
                Array.from({ length: 10 }).map((_, i) => (
                  <Box key={i} w={'inherit'}>
                    <Button key={i} w={'100%'} gap={3} variant={'ghost'} colorScheme="teal" rounded={4} h={12} px={2}>
                      <Avatar src={`https://randomuser.me/api/portraits/men/${faker.number.int({ min: 1, max: 20 })}.jpg`} w={8} h={8} rounded={99} />
                      <Text>{faker.person.fullName()}</Text>
                      <Text ml={'auto'}>{faker.phone.number()}</Text>
                    </Button>
                    <Divider />
                  </Box>
                ))
              }
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button fontWeight={'normal'} size={'sm'} px={8} colorScheme='teal' onClick={onClose}>
              追加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal >
    </Box>
  )
}

export default AddresBookModal