import Layout from '@/components/layout/Layout';
import '@/index.scss';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

// const Home = lazy(() => import('@/pages/Home'))
const Single = lazy(() => import('@/pages/Single'))
const Test = lazy(() => import('@/pages/Test'))
const History = lazy(() => import('@/pages/History'))
const Profile = lazy(() => import('@/pages/Setting/Profile'))
const Secure = lazy(() => import('@/pages/Setting/Secure'))
const AddressBook = lazy(() => import('@/pages/AddressBook'))

const Call = lazy(() => import('@/pages/Call'))
const CallRoom = lazy(() => import('@/pages/Call/CallRoom'))

const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/single' element={<Single />} />
          <Route path='/test' element={<Test />} />
          <Route path="/" element={<Layout />} >
            <Route index element={<Navigate to="/call" />} />
            {/* <Route path="single" element={<Single />} /> */}
            <Route path="call" element={<Outlet />} >
              <Route index element={<Call />} />
              <Route path=':id' element={<CallRoom />} />
            </Route>
            <Route path="history" element={<History />} />
            <Route path="setting" element={<Outlet />} >
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<Profile />} />
              <Route path="secure" element={<Secure />} />
            </Route>
            <Route path="address-book" element={<AddressBook />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter >
  )
}

export default App


