import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className='flex min-h-screen flex-col bg-white text-neutral-950'>
      <Outlet />
    </div>
  );
};
