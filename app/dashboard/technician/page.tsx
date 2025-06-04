"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Workflow, Settings as Lungs, Hand } from 'lucide-react';
import { getUserFromSession } from '@/lib/auth-utils';

export default function TechnicianDashboard() {
  const router = useRouter();
  const user = getUserFromSession();
  
  useEffect(() => {
    // Redirect if not logged in or not a technician
    if (!user) {
      router.push('/login/technician');
    } else if (user.role !== 'technician') {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, router]);
  
  if (!user) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader role="technician" />
      
      <main className="flex-1 container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Technician Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {user.name}. Upload and manage x-ray images.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Quick Upload</CardTitle>
                <Stethoscope className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  Choose an x-ray type to upload a new image
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Link href="/dashboard/technician/chest" className="flex-1">
                  <Button className="w-full" variant="outline">
                    <Lungs className="mr-2 h-4 w-4" />
                    Chest X-Ray
                  </Button>
                </Link>
                <Link href="/dashboard/technician/wrist" className="flex-1">
                  <Button className="w-full" variant="outline">
                    <Hand className="mr-2 h-4 w-4" />
                    Wrist X-Ray
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
          </div>
        </div>
      </main>
    </div>
  );
}