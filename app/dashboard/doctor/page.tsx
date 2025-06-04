"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileSearch, ClipboardList, Workflow } from 'lucide-react';
import { getUserFromSession } from '@/lib/auth-utils';
import Link from 'next/link';

export default function DoctorDashboard() {
  const router = useRouter();
  const user = getUserFromSession();
  
  useEffect(() => {
    // Redirect if not logged in or not a doctor
    if (!user) {
      router.push('/login/doctor');
    } else if (user.role !== 'doctor') {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, router]);
  
  if (!user) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader role="doctor" />
      
      <main className="flex-1 container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Doctor's Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, Dr. {user.name}. View and analyze patient x-ray images.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Image Analysis</CardTitle>
                <FileSearch className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  View and analyze uploaded patient x-ray images
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/doctor/images" className="w-full">
                  <Button className="w-full">
                    View Images
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
                <Workflow className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  No recent activity to display
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" disabled>
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Patient Records</CardTitle>
                <ClipboardList className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Patient records integration coming soon
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" disabled>
                  View Records
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}