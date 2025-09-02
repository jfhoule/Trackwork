'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = React.createContext<DropdownContextValue | undefined>(undefined);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');
  const { open, setOpen } = context;
  return (
    <button
      className={className}
      onClick={() => setOpen(!open)}
      {...props}
    />
  );
}

export function DropdownMenuContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error('DropdownMenuContent must be used within DropdownMenu');
  const { open, setOpen } = context;
  if (!open) return null;
  return (
    <div
      className={cn(
        'absolute right-0 mt-2 w-40 rounded-md border bg-white p-1 shadow-md dark:border-gray-800 dark:bg-gray-950',
        className
      )}
      onClick={() => setOpen(false)}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error('DropdownMenuItem must be used within DropdownMenu');
  const { setOpen } = context;
  return (
    <div
      className={cn(
        'cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800',
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    />
  );
}
