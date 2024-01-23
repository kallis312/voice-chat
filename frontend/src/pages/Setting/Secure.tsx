import { Button, Center, Divider, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react"
import { Form, Formik } from "formik"

type Props = {}

const Secure = (props: Props) => {
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
            <VStack p={8} borderWidth={1} rounded={'lg'} minW={500}>
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
              <FormControl>
                <FormLabel>メールアドレス</FormLabel>
                <Input placeholder='メールアドレス' />
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

export default Secure