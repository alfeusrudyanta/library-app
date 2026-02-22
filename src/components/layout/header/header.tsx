import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hook/use-is-mobile';
import { useIsLoggedIn, useLogout } from '@/hook/use-auth';
import { useGetMe } from '@/hook/use-me';
import { useGetCart } from '@/hook/use-cart';
import { Logo } from './components/logo';
import { SearchBar } from './components/search-bar';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PROFILE_MENU } from './constant';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const isMobile = useIsMobile();
  const isLoggedIn = useIsLoggedIn();
  const logout = useLogout();

  const meQuery = useGetMe();
  const cartQuery = useGetCart();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [IsMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [isMobile]);

  const profileData = meQuery.data?.data.profile;
  const cartCount = cartQuery.data?.data.itemCount ?? 0;

  return (
    <div className='fixed z-10 w-full bg-white px-4 shadow-[0_0_20px_0_#CBCACA40]'>
      <div className='relative mx-auto flex h-16 max-w-360 items-center justify-between gap-6 md:h-20 md:px-30'>
        {/* Logo */}
        <Logo />

        {/* Search */}
        {isSearchOpen && <SearchBar search={search} setSearch={setSearch} />}

        {/* Mobile close search */}
        {isMobile && isSearchOpen && (
          <X onClick={() => setIsSearchOpen(false)} className='size-6' />
        )}

        {/* Mobile icons */}
        {isMobile && !isSearchOpen && (
          <div className='flex items-center gap-4'>
            <Search onClick={() => setIsSearchOpen(true)} className='size-6' />

            <Link to='/my-cart' className='relative'>
              <img src='/icons/header-bag.svg' alt='Cart' />
              <span className='absolute top-0 -right-1 flex size-4 items-center justify-center rounded-full bg-[#EE1D52] text-[0.63rem] font-bold text-white'>
                {cartCount}
              </span>
            </Link>

            {isLoggedIn && (
              <button
                ref={buttonRef}
                onClick={() => setIsMenuOpen((p) => !p)}
                className='flex items-center'
              >
                <img
                  src='/images/author-profile.png'
                  alt='Profile'
                  className='size-10 rounded-full'
                />
              </button>
            )}

            {!isLoggedIn && !IsMenuOpen && (
              <Menu onClick={() => setIsMenuOpen(true)} />
            )}

            {!isLoggedIn && IsMenuOpen && (
              <X onClick={() => setIsMenuOpen(false)} />
            )}
          </div>
        )}

        {/* Desktop Logged In */}
        {!isMobile && isLoggedIn && isSearchOpen && (
          <div className='flex items-center gap-6'>
            <Link to='/my-cart' className='relative'>
              <img src='/icons/header-bag.svg' alt='Cart' />
              <span className='absolute top-0 -right-1 flex size-4 items-center justify-center rounded-full bg-[#EE1D52] text-[0.63rem] font-bold text-white'>
                {cartCount}
              </span>
            </Link>

            <button
              ref={buttonRef}
              onClick={() => setIsMenuOpen((p) => !p)}
              className='flex cursor-pointer items-center gap-4'
            >
              <img
                src='/images/author-profile.png'
                alt='Profile'
                className='size-10 rounded-full'
              />
              <span className='text-lg font-semibold'>
                {profileData?.name ?? 'User'}
              </span>
              <ChevronDown
                className={cn(
                  'size-6 transition-transform',
                  IsMenuOpen && 'rotate-180'
                )}
              />
            </button>
          </div>
        )}

        {/* Desktop Not Logged In */}
        {!isLoggedIn && !isMobile && isSearchOpen && (
          <div className='flex max-w-85.5 flex-1 items-center gap-3'>
            <Link to='/login' className='flex-1'>
              <Button variant='transparent'>Login</Button>
            </Link>
            <Link to='/register' className='flex-1'>
              <Button>Register</Button>
            </Link>
          </div>
        )}

        {/* Profile menu */}
        {isLoggedIn && IsMenuOpen && (
          <div className='absolute top-16 right-0 w-full max-w-46 md:top-18.5 md:right-30'>
            <div
              ref={menuRef}
              className='flex w-full max-w-[calc(100vw-32px)] flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:max-w-46'
            >
              {profileData?.role === 'ADMIN' && (
                <div className='flex flex-col gap-4'>
                  <Link to='/admin' className='group'>
                    <button className='text-sm-semibold md:text-md-semibold group-hover:text-primary-300 cursor-pointer'>
                      Manage Library
                    </button>
                  </Link>

                  <div className='w-full border border-neutral-300' />
                </div>
              )}

              {PROFILE_MENU.map((menu) => (
                <Link
                  key={menu}
                  to={`/profile?tab=${menu}`}
                  onClick={() => setIsMenuOpen(false)}
                  className='group'
                >
                  <span className='text-sm-semibold md:text-md-semibold group-hover:text-primary-300 cursor-pointer'>
                    {menu.charAt(0).toUpperCase() +
                      menu.slice(1).replace('-', ' ')}
                  </span>
                </Link>
              ))}

              <span
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
                className='text-sm-semibold md:text-md-semibold cursor-pointer text-[#EE1D52] hover:text-red-700'
              >
                Logout
              </span>
            </div>
          </div>
        )}

        {/* Button Menu */}
        {!isLoggedIn && IsMenuOpen && isMobile && (
          <div className='absolute top-16 right-0 w-full'>
            <div className='flex items-center gap-4 bg-white p-4'>
              <Link to='/login' className='flex-1'>
                <Button variant='transparent'>Login</Button>
              </Link>
              <Link to='/register' className='flex-1'>
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
