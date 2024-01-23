import { SocketContext } from '@/context/socket'
import { Center, CircularProgress, Container, Stack } from "@chakra-ui/react"
import { Suspense, useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Header from "./Header"
import LeftSidebar from "./LeftSideBar"
import RightSideBar from "./RightSideBar"

const storageToken = localStorage.getItem('token')

const Layout = () => {
  const navigate = useNavigate()
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('connect', () => {
      if (!!storageToken)
        socket.emit('auth-login', storageToken)
    })
    socket.on('noti', (data: any) => {
      if (confirm(data)) {
        navigate("/call/" + data)
      }
    })
  }, [])
  return (
    <div className="flex flex-col w-full overflow-auto">
      <Header />

      <Stack mx={'auto'} overflow={'auto'} direction={['column', 'column', 'row', 'row']} mt={2} className='container' h={'full'}>
        <LeftSidebar />
        <div className="border-x px-2 w-full h-full overflow-auto">
          <Suspense fallback={<Center className="h-full w-full"><CircularProgress isIndeterminate color='teal.300' /></Center>}>
            <Outlet />
          </Suspense>
        </div>
        <RightSideBar />
      </Stack>

    </div>
  )
}

export default Layout