'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      {children}
    </div>
  );
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'left' | 'right';
}

export function SheetContent({
  side = 'left',
  className,
  ...props
}: SheetContentProps) {
  return (
    <div
      className={cn(
        'absolute top-0 h-full w-64 bg-white p-4 shadow-lg dark:bg-gray-950',
        side === 'left' ? 'left-0' : 'right-0',
        className
      )}
      {...props}
    />
  );
}
