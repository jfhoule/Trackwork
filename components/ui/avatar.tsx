'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const Avatar = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  )
);
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
  )
);
AvatarImage.displayName = 'AvatarImage';

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
}
const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, color, style, ...props }, ref) => (
    <span
      ref={ref}
      style={{ ...style, backgroundColor: color }}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300',
        className
      )}
      {...props}
    />
  )
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
