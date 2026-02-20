import { Outlet } from 'react-router-dom';
import { Footer } from './footer/footer';

export const FooterLayout = () => {
  return (
    <div className='bg-neutral-25 flex grow flex-col text-neutral-950'>
      <Outlet />
      <Footer />
    </div>
  );
};
