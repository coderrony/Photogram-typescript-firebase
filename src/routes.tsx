import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/login/Login';
import Error from './pages/error/Error';
import Singup from './pages/singup/Singup';
import Home from './pages/home/Home';
import CreatePost from './pages/post/CreatePost';
import Profile from './pages/profile/Profile';
import MyPhotos from './pages/myPhotos/MyPhotos';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import EditProfile from './pages/profile/EditProfile';

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/home',
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/post',
        element: <CreatePost />,
        errorElement: <Error />,
      },
      {
        path: '/profile',
        element: <Profile />,
        errorElement: <Error />,
      },
      {
        path: '/edit-profile',
        element: <EditProfile />,
        errorElement: <Error />,
      },
      {
        path: '/myphotos',
        element: <MyPhotos />,
        errorElement: <Error />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/signup',
    element: <Singup />,
    errorElement: <Error />,
  },
]);

export default router;
