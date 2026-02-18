import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-md-bold tracking-[-0.02em] disabled:pointer-events-none shrink-0 transition-all outline-none cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary-300 hover:bg-primary-300/90 text-neutral-25',
        transparent:
          'border border-neutral-300 hover:bg-primary-100 text-neutral-950',
      },
      size: {
        default: 'h-12 px-4 w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot='button'
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
