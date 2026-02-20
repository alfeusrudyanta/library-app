import { FormLabel } from '@/components/shared/form-label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetMe, usePatchMe } from '@/hook/use-me';
import { useEffect, useRef, useState } from 'react';
import type { ProfileFormErrors } from '../types';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { profileSchema } from '../schema';

export const Profile = () => {
  const meQuery = useGetMe();
  const patchMe = usePatchMe();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePreview] = useState<string>(
    '/images/author-profile.png'
  );
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<ProfileFormErrors>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!meQuery.data) return;

  const profileData = meQuery.data.data.profile;

  useEffect(() => {
    setProfilePreview(profileData.profilePhoto || '/images/author-profile.png');
    setName(profileData.name);
    setPhone(profileData.phone ?? '-');
  }, []);

  useEffect(() => {
    return () => {
      if (profilePhotoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(profilePhotoPreview);
      }
    };
  }, [profilePhotoPreview]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError({});

    const result = profileSchema.safeParse({
      name,
      phone,
      profilePhoto: profilePhoto || undefined,
    });

    if (!result.success) {
      const newError: ProfileFormErrors = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ProfileFormErrors;
        newError[field] = err.message;
      });

      setError(newError);
      return;
    }

    patchMe.mutate(result.data, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setProfilePreview(URL.createObjectURL(file));
    setProfilePhoto(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleFile(file);
  };

  const handleFile = (file: File) => {
    setProfilePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setProfilePhoto(file);
  };

  return (
    <div className='flex w-full flex-col gap-3.75 md:max-w-139.25 md:gap-6'>
      <span className='display-xs-bold md:display-sm-bold md:tracking-[-0.03em]'>
        Profile
      </span>

      {/* Profile Card */}
      <div className='flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:gap-6 md:p-5'>
        <div className='flex flex-col gap-2 md:gap-3'>
          {/* Image */}
          <img
            src={profilePhotoPreview}
            alt={profileData.name}
            className='size-16 rounded-full'
          />

          {/* Name */}
          <div className='flex items-center justify-between'>
            <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
              Name
            </span>

            <span className='text-sm-bold md:text-md-bold tracking-[-0.02em]'>
              {profileData.name}
            </span>
          </div>

          {/* Email */}
          <div className='flex items-center justify-between'>
            <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
              Email
            </span>

            <span className='text-sm-bold md:text-md-bold tracking-[-0.02em]'>
              {profileData.email}
            </span>
          </div>

          {/* Phone Number */}
          <div className='flex items-center justify-between'>
            <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
              Phone Number
            </span>

            <span className='text-sm-bold md:text-md-bold tracking-[-0.02em]'>
              {profileData.phone ?? '-'}
            </span>
          </div>
        </div>

        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className='h-11 md:h-11'
        >
          Update Profile
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle className='sr-only'>Update Profile</DialogTitle>
          <DialogDescription className='sr-only'>
            Update your profile information including name, phone number, and
            profile photo.
          </DialogDescription>

          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 md:gap-5'>
              {/* Avatar */}
              <div
                className='relative mx-auto flex flex-col items-center justify-center gap-4 md:gap-5'
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={handleDrop}
              >
                <div className='cursor-pointer overflow-hidden rounded-full'>
                  <input
                    ref={fileInputRef}
                    id='image'
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    disabled={patchMe.isPending}
                    className='absolute inset-0 -z-10 h-full w-full cursor-pointer opacity-0'
                  />

                  <img
                    onClick={handleTriggerFileInput}
                    src={profilePhotoPreview}
                    alt={profileData.name}
                    className='size-16 rounded-full'
                  />
                </div>

                {error?.profilePhoto && (
                  <span className='text-xs-medium md:text-sm-medium text-accent-red tracking-[-0.03em]'>
                    {error.profilePhoto}
                  </span>
                )}
              </div>

              <FormLabel
                name='Name'
                id='name'
                type='text'
                placeholder='Enter your name'
                value={name}
                disabled={patchMe.isPending}
                onChange={setName}
                error={error?.name}
              />

              <FormLabel
                name='Phone Number'
                id='phone'
                type='tel'
                placeholder='Enter your phone number'
                value={phone}
                disabled={patchMe.isPending}
                onChange={setPhone}
                error={error?.phone}
              />

              <Button disabled={patchMe.isPending} className='h-10 md:h-12'>
                {patchMe.isPending ? <LoadingSpinner /> : 'Update'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
