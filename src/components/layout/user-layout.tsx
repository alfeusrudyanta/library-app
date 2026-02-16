import { Outlet } from 'react-router-dom';

export const UserLayout = () => {
  return (
    <div className='flex min-h-screen flex-col bg-white text-neutral-950'>
      <header />
      <Outlet />
      <footer />
    </div>
  );
};
