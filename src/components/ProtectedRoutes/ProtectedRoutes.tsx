import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
interface ProtectedRoutesProps {
  className?: string;
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = () => {
  const location = useLocation();

  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>...Loading</div>;
  }

  // console.log('user ', user);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  );
};

export default ProtectedRoutes;
