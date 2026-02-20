import { FOOTER_DATA } from './constant';

export const Footer = () => {
  return (
    <div className='mx-auto flex w-full max-w-360 flex-col items-center justify-center gap-4 border-t border-neutral-300 px-4 py-10 md:gap-10 md:px-37.5 md:py-20'>
      <div className='flex flex-col items-center justify-center gap-4 md:gap-5.5'>
        <div className='flex items-center gap-3 md:gap-3.75'>
          <img
            src='/icons/public-logo.svg'
            alt='Booky Logo'
            className='size-8 md:size-10.5'
          />
          <span className='text-sm-semibold! md:display-md-extrabold!'>
            Booky
          </span>
        </div>

        <span className='text-sm-semibold! md:text-md-semibold! text-center tracking-[-0.02em]'>
          Discover inspiring stories & timeless knowledge, ready to borrow
          anytime. Explore online or visit our nearest library branch.
        </span>
      </div>

      <div className='flex flex-col gap-5'>
        <span className='text-md-bold! text-center tracking-[-0.02em] md:tracking-normal'>
          Follow on Social Media
        </span>

        <div className='flex items-center gap-3'>
          {FOOTER_DATA.map((item) => (
            <div
              key={item.name}
              className='flex size-10 cursor-pointer items-center justify-center rounded-full border border-neutral-300'
            >
              <img src={item.icon} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
