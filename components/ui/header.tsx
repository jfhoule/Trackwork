'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Sidebar } from '@/components/ui/sidebar';

export function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="flex h-14 items-center border-b bg-white px-4 dark:border-gray-800 dark:bg-gray-950">
      <Button variant="ghost" className="mr-2 md:hidden" onClick={() => setOpen(true)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="ml-auto flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar>
              <AvatarFallback color="#2563eb" className="text-white">
                JD
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0">
          <Sidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  );
}
