import { LoginSchema } from '@/validators/authValidator'
import { Alert, AlertIcon, Center } from '@chakra-ui/react'
import axios from 'axios'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { Link, useNavigate } from "react-router-dom"

interface LoginValues {
  email: string,
  password: string
}

const initialValues: LoginValues = { email: '', password: '' };

const Login = () => {
  const navigate = useNavigate();
  const onSubmit = async (values: LoginValues, actions: FormikHelpers<LoginValues>) => {
    try {
      actions.setSubmitting(true)
      const { data } = await axios.post('/auth/login', values);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      axios.defaults.headers.common['Authorization'] = data.token;
      // socket.emit('auth-login', data.token)
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error)
    }
    actions.setSubmitting(false)
  }

  return (
    <Center w={'full'}>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >{
          ({ errors, touched, isSubmitting }) => (
            <Form className="w-[450px] rounded-lg relative bg-white">
              <div className="py-8 px-12 flex flex-col gap-2 ">
                <div className="text-4xl text-center font-medium tracking-widest mb-4">ログイン</div>
                <label htmlFor="email">電子メールまたはユーザー名</label>
                <Field isInValid className="p-2 rounded-md border" id="email" name="email" placeholder="メールアドレス" />
                {errors.email && touched.email && <Alert status='error' py={1} size={'xs'} fontSize={'xs'} variant='left-accent'><AlertIcon /> {errors.email}</Alert>}
                <label htmlFor="password">パスワード</label>
                <Field className="p-2 rounded-md border" id="password" name="password" type='password' placeholder="パスワード" />
                {errors.password && touched.password && <Alert status='error' py={1} size={'xs'} fontSize={'xs'} variant='left-accent'><AlertIcon /> {errors.password}</Alert>}
                <button type="submit" className="bg-[#0068b6] hover:bg-blue-700 focus:bg-[#0068b6] text-white rounded-md p-2 mt-4" >ログイン</button>
                <Link to="/register" className="text-#0068b6] hover:text-blue-700">登録する</Link>
              </div>
              {isSubmitting && <div className="text-sm absolute h-full w-full flex items-center justify-center top-0 text-blue-500">Loading</div>}
            </Form>
          )
        }
      </Formik>
    </Center>
  )
}

export default Login