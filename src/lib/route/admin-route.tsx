import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { selectProfile } from '@/store/slices/profile-slice';

export const AdminRoute = () => {
  const token = !!Cookies.get('token');
  const location = useLocation();

  const profile = useSelector(selectProfile);

  if (!token) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (profile.role === 'USER') {
    return <Navigate to='/' replace state={{ from: location }} />;
  }

  return <Outlet />;
};
