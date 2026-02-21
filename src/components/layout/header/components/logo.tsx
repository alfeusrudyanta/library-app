import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to='/' className='outline-0'>
      <div className='flex items-center gap-3'>
        <img
          src='/icons/public-logo.svg'
          alt='Booky Logo'
          className='size-10 md:size-10.5'
        />
        <span className='display-md-extrabold hidden md:block'>Booky</span>
      </div>
    </Link>
  );
};
