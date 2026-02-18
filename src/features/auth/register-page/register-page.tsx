import { usePostRegister } from '@/hook/use-auth';
import { useState } from 'react';
import type { RegisterFormErrors } from './type';
import { registerSchema } from './schema';
import { FormLabel } from '@/components/shared/form-label';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const { mutate, isPending } = usePostRegister();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<RegisterFormErrors>({});

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    /* Error Handling */
    setError({});

    if (password !== confirmPassword) {
      setError({ confirmPassword: 'Passwords must match' });
      return;
    }

    const result = registerSchema.safeParse({
      name,
      email,
      phone,
      password,
    });

    if (!result.success) {
      const newError: RegisterFormErrors = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof RegisterFormErrors;
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
            Register
          </span>

          <span className='text-sm-semibold md:text-md-semibold tracking-[-0.02em] text-neutral-700'>
            Create your account to start borrowing books.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className='flex flex-col gap-4'>
          <FormLabel
            name='Name'
            id='name'
            type='text'
            placeholder='Enter your name'
            value={name}
            disabled={isPending}
            onChange={setName}
            error={error.name}
          />

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
            name='Phone Number'
            id='phone'
            type='tel'
            placeholder='Enter your phone number'
            value={phone}
            disabled={isPending}
            onChange={setPhone}
            error={error.phone}
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

          <FormLabel
            name='Confirm Password'
            id='confirmPassword'
            type='password'
            placeholder='Confirm your password'
            value={confirmPassword}
            disabled={isPending}
            onChange={setConfirmPassword}
            error={error.confirmPassword}
          />

          {/* Button */}
          <Button type='submit' disabled={isPending}>
            {isPending ? <LoadingSpinner /> : 'Register'}
          </Button>

          {/* Redirect */}
          <span className='text-sm-semibold md:text-md-semibold tracking-[-0.02em]'>
            Already have an account?{' '}
            <Link to='/login'>
              <span className='text-primary-300'>Log In</span>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
