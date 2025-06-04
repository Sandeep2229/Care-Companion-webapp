"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, getUserFromSession, clearUserSession, UserRole } from '@/lib/auth-utils';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadUser = () => {
      const sessionUser = getUserFromSession();
      setUser(sessionUser);
      setIsLoading(false);
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // If no user is logged in and the path is a protected route
      if (!user && pathname?.startsWith('/dashboard')) {
        router.push('/');
      }
      
      // If user is logged in but accessing wrong role dashboard
      if (user && pathname?.startsWith('/dashboard')) {
        const urlRole = pathname.split('/')[2] as UserRole;
        if (urlRole && urlRole !== user.role) {
          router.push(`/dashboard/${user.role}`);
        }
      }
    }
  }, [user, isLoading, pathname, router]);

  const logout = () => {
    clearUserSession();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);