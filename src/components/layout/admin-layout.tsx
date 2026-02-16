import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <div className='flex min-h-screen flex-col bg-white text-neutral-950'>
      <header />
      <Outlet />
    </div>
  );
};
