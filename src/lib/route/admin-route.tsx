import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useGetMe } from '@/hook/use-me';

export const AdminRoute = () => {
  const token = !!Cookies.get('token');
  const location = useLocation();

  const { data } = useGetMe();

  if (!token) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (data?.data.profile.role === 'USER') {
    return <Navigate to='/' replace state={{ from: location }} />;
  }

  return <Outlet />;
};
