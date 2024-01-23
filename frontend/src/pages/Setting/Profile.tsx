import { Avatar, AvatarBadge, Button, Center, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input, VStack } from "@chakra-ui/react"
import { PencilSquareIcon } from "@heroicons/react/24/solid"
import { Form, Formik } from "formik"

type Props = {}

const Setting = (props: Props) => {
  return (
    <Center h={'full'}>
      <Formik
        initialValues={{ name: 'Sasuke' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
      >
        {(props) => (
          <Form>
            <VStack p={8} borderWidth={1} rounded={'lg'}>
              <Avatar shadow={'md'} borderWidth={4} size={'2xl'} src="https://randomuser.me/api/portraits/men/1.jpg">
                <AvatarBadge boxSize={10} borderWidth={2} bg='green.500'><PencilSquareIcon width={18} height={18} /></AvatarBadge>
              </Avatar>
              <FormControl mt={2}>
                <FormLabel>利用者名</FormLabel>
                <Input placeholder='利用者名' />
                <FormErrorMessage>{'3243'}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>メールアドレス</FormLabel>
                <Input placeholder='メールアドレス' />
                <FormErrorMessage>{'3243'}</FormErrorMessage>
              </FormControl>
              <HStack mt={2}>
                <FormControl>
                  <FormLabel>姓</FormLabel>
                  <Input placeholder='姓' />
                  <FormErrorMessage>{'3243'}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>名</FormLabel>
                  <Input placeholder='名' />
                  <FormErrorMessage>{'3243'}</FormErrorMessage>
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>フォンナンバー</FormLabel>
                <Input placeholder='フォンナンバー' />
                <FormErrorMessage>{'3243'}</FormErrorMessage>
              </FormControl>
              <Divider />

              <Button
                mt={2}
                colorScheme='teal'
                isLoading={props.isSubmitting}
                type='submit'
                px={12}
              >
                セーブ
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>

    </Center>
  )
}

export default Setting