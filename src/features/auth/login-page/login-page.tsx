import { usePostLogin } from '@/hook/use-auth';
import { useState } from 'react';
import type { LoginFormErrors } from './type';
import { loginSchema } from './schema';
import { FormLabel } from '@/components/shared/form-label';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const { mutate, isPending } = usePostLogin();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<LoginFormErrors>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    /* Error Handling */
    setError({});

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const newError: LoginFormErrors = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof LoginFormErrors;
        newError[field] = err.message;
      });

      setError(newError);
      return;
    }

    mutate(result.data);
  };

  return (
    <div className='mx-8 my-auto flex items-center justify-center'>
      <div className='flex w-full max-w-100 flex-col gap-5'>
        {/* Logo */}
        <div className='flex items-center gap-2.75'>
          <img
            src='/icons/public-logo.svg'
            alt='Library Logo'
            loading='lazy'
            className='size-8.25'
          />

          <span className='display-xs-bold'>Booky</span>
        </div>

        {/* Information */}
        <div className='flex flex-col gap-0.5 md:gap-2'>
          <span className='display-xs-bold md:display-sm-bold md:tracking-[-0.02em]'>
            Login
          </span>

          <span className='text-sm-semibold md:text-md-semibold tracking-[-0.02em] text-neutral-700'>
            Sign in to manage your library account.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className='flex flex-col gap-4'>
          <FormLabel
            name='Email'
            id='email'
            type='email'
            placeholder='Enter your email'
            value={email}
            disabled={isPending}
            onChange={setEmail}
            error={error.email}
          />

          <FormLabel
            name='Password'
            id='password'
            type='password'
            placeholder='Enter your password'
            value={password}
            disabled={isPending}
            onChange={setPassword}
            error={error.password}
          />

          {/* Button */}
          <Button type='submit' disabled={isPending}>
            {isPending ? <LoadingSpinner /> : 'Login'}
          </Button>

          {/* Redirect */}
          <span className='text-sm-semibold md:text-md-semibold tracking-[-0.02em]'>
            Don't have an account?{' '}
            <Link to='/register'>
              <span className='text-primary-300'>Register</span>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
