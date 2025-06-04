"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, Menu, X, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { clearUserSession, getUserFromSession, UserRole } from '@/lib/auth-utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface NavLink {
  href: string;
  label: string;
  active: boolean;
}

interface DashboardHeaderProps {
  role: UserRole;
}

export function DashboardHeader({ role }: DashboardHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const user = getUserFromSession();
  
  const baseRoutePath = `/dashboard/${role}`;
  
  const technicianLinks: NavLink[] = [
    {
      href: baseRoutePath,
      label: 'Dashboard',
      active: pathname === baseRoutePath,
    },
    {
      href: `${baseRoutePath}/chest`,
      label: 'Chest X-Ray',
      active: pathname === `${baseRoutePath}/chest`,
    },
    {
      href: `${baseRoutePath}/wrist`,
      label: 'Wrist X-Ray',
      active: pathname === `${baseRoutePath}/wrist`,
    },
  ];
  
  const doctorLinks: NavLink[] = [
    {
      href: baseRoutePath,
      label: 'Dashboard',
      active: pathname === baseRoutePath,
    },
    {
      href: `${baseRoutePath}/images`,
      label: 'View Images',
      active: pathname === `${baseRoutePath}/images`,
    },
  ];
  
  const links = role === 'technician' ? technicianLinks : doctorLinks;
  
  const handleLogout = () => {
    clearUserSession();
    router.push('/');
  };
  
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={baseRoutePath} className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Care Companion</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                link.active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5 text-sm font-medium">
                {user?.name || 'User'}
              </div>
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu Trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 sm:w-80">
              <div className="flex items-center justify-between">
                <Link 
                  href={baseRoutePath} 
                  className="flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <Heart className="h-6 w-6 text-blue-600" />
                  <span className="font-bold">Care Companion</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="mt-8 flex flex-col gap-4">
                {links.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      link.active ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button 
                  variant="ghost" 
                  className="justify-start px-2 mt-4"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}