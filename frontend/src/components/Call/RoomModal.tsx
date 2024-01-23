import { Avatar, Box, Button, useCheckboxGroup, Checkbox, CheckboxGroup, Divider, HStack, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure, RadioGroup, Radio, useRadio, useRadioGroup } from "@chakra-ui/react"
import { MagnifyingGlassIcon, PhoneArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/solid"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {}

const RoomModal = (props: Props) => {

  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { value, setValue } = useCheckboxGroup()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get('/address-book/users')
      setUsers(data.result)
    }
    if (isOpen) loadData()
  }, [isOpen])


  const onCreateCall = async () => {

    navigate('/single')
    const { data: { result } } = await axios.post('/call/create-room', {
      to: value
    })
  }
  return (
    <>
      <Button colorScheme="teal" fontWeight={'normal'} onClick={onOpen} rounded={'full'}>
        <PhoneArrowUpRightIcon className="w-5 h-5" />
        <Text ml={1} display={['none', 'none', 'none', 'block']}>通貨</Text>
      </Button>
      <Modal size={['sm', 'md', 'lg']} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'normal'}>住所追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <PencilSquareIcon className="w-6 h-6 text-gray-300" />
              </InputLeftElement>
              <Input type='tel' placeholder='発信理油' />
            </InputGroup> */}
            <InputGroup mt={1}>
              <InputLeftElement pointerEvents='none'>
                <PhoneIcon className="w-6 h-6 text-gray-300" />
              </InputLeftElement>
              <Input type="search" placeholder='電話番号' />
            </InputGroup>
            <HStack pl={2}>
              {/* <Checkbox onChange={() => { setValue([]) }} colorScheme="teal" >選択する</Checkbox> */}
              <Text mt={3} fontSize={'sm'}>10冊の資料が現れました。</Text>
            </HStack>
            <Divider />
            <CheckboxGroup colorScheme='green' onChange={setValue} value={value}>
              <VStack gap={0} w={'100%'} maxH={300} overflow={'auto'} pr={1}>
                {
                  users.map((_: any, i) => (
                    <Box key={i} w={'full'}>
                      <Checkbox key={i} value={_.user._id} w={'full'} as={Box} gap={3} variant={'ghost'} colorScheme="teal" rounded={4} h={12} px={2}>
                        <HStack gap={3}>
                          <Avatar src={_.user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'} w={8} h={8} rounded={99} />
                          <Text>{_.user?.name || "Unkwon"}</Text>
                          <Text ml={'auto'}>({_.user?.email})</Text>
                        </HStack>
                      </Checkbox>
                      <Divider />
                    </Box>
                  ))
                }
              </VStack>
            </CheckboxGroup>
          </ModalBody>

          <ModalFooter>
            <Button fontWeight={'normal'} px={8} colorScheme='teal' onClick={onCreateCall}>
              追加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  )
}

export default RoomModal