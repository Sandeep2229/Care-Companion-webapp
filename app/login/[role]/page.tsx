import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LoginForm } from '@/components/login-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { UserRole } from '@/lib/auth-utils';

interface LoginPageProps {
  params: {
    role: string;
  };
}

export async function generateStaticParams() {
  return [
    { role: 'technician' },
    { role: 'doctor' },
  ];
}

export default function LoginPage({ params }: LoginPageProps) {
  // Validate the role parameter
  const role = params.role as UserRole;
  if (role !== 'technician' && role !== 'doctor') {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Care Companion</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-1 text-sm mb-8 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          
          <LoginForm role={role} />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {role === 'technician' 
                ? "Are you a doctor? " 
                : "Are you a technician? "}
              <Link 
                href={role === 'technician' ? "/login/doctor" : "/login/technician"}
                className="underline hover:text-primary"
              >
                {role === 'technician' ? "Login as doctor" : "Login as technician"}
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-4">
        <div className="container flex justify-center text-sm text-muted-foreground">
          &copy; 2025 Care Companion. All rights reserved.
        </div>
      </footer>
    </div>
  );
}