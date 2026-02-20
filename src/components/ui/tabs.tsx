import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Tabs as TabsPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

function Tabs({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        'group/tabs flex gap-3.75 data-[orientation=horizontal]:flex-col md:gap-6',
        className
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  'rounded-2xl group/tabs-list text-neutral-25 inline-flex w-fit items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function TabsList({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      data-variant={variant}
      className={cn(
        tabsListVariants({ variant }),
        'flex h-14 w-full items-center gap-2 rounded-2xl bg-neutral-100 p-2 md:max-w-139.25',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(
        'h-10 w-full rounded-xl py-1 tracking-[-0.03em] whitespace-nowrap transition-all data-[state=active]:tracking-[-0.02em]',
        'text-sm-medium md:text-md-medium md:data-[state=active]:text-md-bold data-[state=active]:text-sm-bold text-neutral-600 data-[state=active]:bg-white data-[state=active]:text-neutral-950',
        'data-[state=active]:shadow-[0_0_20px_0_#CBCACA40]',
        'cursor-pointer',
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
