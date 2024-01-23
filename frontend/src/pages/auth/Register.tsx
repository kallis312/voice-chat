import { SignupSchema } from '@/validators/authValidator';
import { Alert, AlertIcon, Center } from '@chakra-ui/react';
import axios from 'axios';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Link } from "react-router-dom";

type SignupValues = {
  email: string,
  password: string,
  confirm: string,
  userName: string
}


const Signup = () => {
  const initialValues: SignupValues = { email: '', password: '', confirm: '', userName: '' };
  const onSubmit = async (values: SignupValues, actions: FormikHelpers<SignupValues>) => {
    try {
      actions.setSubmitting(true)
      await axios.post('/auth/signup', values);
    } catch (error) {
      console.log(error)
    }
    actions.setSubmitting(false)
  }

  return (
    <Center w={'full'}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >{
          ({ errors, touched, isSubmitting }) => (
            <Form className="w-[450px] rounded-lg relative bg-white">
              <div className="py-8 px-12 flex flex-col gap-2 ">
                <div className="text-4xl text-center font-medium tracking-widest mb-4">サインアップ</div>
                <label htmlFor="email">電子メールまたはユーザー名</label>
                <Field type="email" isInValid className="p-2 rounded-md border" id="email" name="email" placeholder="メールアドレスを入力" />
                {errors.email && touched.email && <Alert status='error' py={1} size={'xs'} fontSize={'xs'} variant='left-accent'><AlertIcon /> {errors.email}</Alert>}
                <label htmlFor="userName">電子メールまたはユーザー名</label>
                <Field isInValid className="p-2 rounded-md border" id="userName" name="userName" placeholder="メールアドレスを入力" />
                {errors.userName && touched.userName && <Alert status='error' py={1} size={'xs'} fontSize={'xs'} variant='left-accent'><AlertIcon /> {errors.userName}</Alert>}
                <label htmlFor="password">パスワード</label>
                <Field className="p-2 rounded-md border" id="password" name="password" type='password' placeholder="パスワードを入力" />
                {errors.password && touched.password && <Alert status='error' py={1} size={'xs'} fontSize={'xs'} variant='left-accent'><AlertIcon /> {errors.password}</Alert>}
                <label htmlFor="password">確認する</label>
                <Field className="p-2 rounded-md border" id="confirm" name="confirm" type='password' placeholder="入力確定" />
                {errors.confirm && touched.confirm && <Alert status='error' py={1} size={'xs'} fontSize={'xs'} variant='left-accent'><AlertIcon /> {errors.confirm}</Alert>}
                <button type="submit" className="bg-[#0068b6] hover:bg-blue-700 focus:bg-[#0068b6] text-white rounded-md p-2 mt-4" >サインアップ</button>
                <Link to="/login" className="text-[#0068b6] hover:text-blue-700">ログイン</Link>
              </div>
              {isSubmitting && <div className="text-sm absolute h-full w-full flex items-center justify-center top-0 text-blue-500">Loading</div>}
            </Form>
          )
        }
      </Formik>
    </Center>
  )
}

export default Signup