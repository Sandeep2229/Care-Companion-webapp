"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';
import { getUserFromSession } from '@/lib/auth-utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { mockImageData } from '@/lib/mock-data';
import Image from 'next/image';

export default function DoctorImages() {
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
            <h1 className="text-3xl font-bold tracking-tight">Patient X-Ray Images</h1>
            <p className="text-muted-foreground mt-2">
              View and analyze patient x-ray images uploaded by technicians.
            </p>
          </div>
          
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription>
              This is a demo interface showing example x-ray images. In a production environment, 
              this would display actual patient images from your database.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="chest">
            <TabsList className="mb-6">
              <TabsTrigger value="chest">Chest X-Rays</TabsTrigger>
              <TabsTrigger value="wrist">Wrist X-Rays</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chest">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockImageData.chest.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={image.url}
                        alt={image.label}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{image.label}</p>
                          <p className="text-sm text-muted-foreground">{image.date}</p>
                        </div>
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {image.type}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="wrist">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockImageData.wrist.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={image.url}
                        alt={image.label}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{image.label}</p>
                          <p className="text-sm text-muted-foreground">{image.date}</p>
                        </div>
                        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {image.type}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}