import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { UserAuthProvider } from './context/userAuthContext';

interface AppProps {
  className?: string;
}

const App: FC<AppProps> = () => {
  return (
    <UserAuthProvider>
      <RouterProvider router={router} />
    </UserAuthProvider>
  );
};

export default App;
