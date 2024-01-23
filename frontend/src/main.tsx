import App from '@/App.tsx';
import { SocketContext, socket } from '@/context/socket';
import '@/index.scss';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';

import ReactDOM from 'react-dom/client';

axios.defaults.baseURL = 'https://localhost:8080/api/v1';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {/* <Provider store={store}> */}
    <SocketContext.Provider value={socket}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </SocketContext.Provider>
    {/* </Provider> */}
  </>,
)
