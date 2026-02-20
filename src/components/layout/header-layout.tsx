import { Outlet } from 'react-router-dom';
import { Header } from './header';

export const HeaderLayout = () => {
  return (
    <div className='bg-neutral-25 flex min-h-screen flex-col text-neutral-950'>
      <Header />
      <Outlet />
    </div>
  );
};
