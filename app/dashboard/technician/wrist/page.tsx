"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';
import { ImageUploader } from '@/components/image-uploader';
import { getUserFromSession } from '@/lib/auth-utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Hand } from 'lucide-react';

export default function WristXRayUpload() {
  const router = useRouter();
  const user = getUserFromSession();
  const [activeTab, setActiveTab] = useState('view1');
  
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
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100">
              <Hand className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Wrist X-Ray Upload</h1>
              <p className="text-muted-foreground mt-1">
                Upload wrist x-ray images in different views
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="view1" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="view1">View 1 (PA View)</TabsTrigger>
              <TabsTrigger value="view2">View 2 (Lateral View)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="view1">
              <Card>
                <CardContent className="pt-6">
                  <ImageUploader 
                    title="Wrist X-Ray - PA View"
                    description="Upload a posterior-anterior (PA) view of the wrist. This view shows the bones of the wrist from front to back."
                    maxSizeMB={10}
                  />
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Guidelines for PA View</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded text-xs">Tip</span>
                      <span>Position the wrist flat against the detector with palm down.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded text-xs">Tip</span>
                      <span>Ensure all carpal bones, distal radius and ulna, and proximal metacarpals are visible.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded text-xs">Tip</span>
                      <span>The image should be properly centered on the carpal bones.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="view2">
              <Card>
                <CardContent className="pt-6">
                  <ImageUploader 
                    title="Wrist X-Ray - Lateral View"
                    description="Upload a lateral view of the wrist. This view shows the wrist from the side."
                    maxSizeMB={10}
                  />
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Guidelines for Lateral View</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded text-xs">Tip</span>
                      <span>Position the wrist with the thumb side up, and the ulnar side against the detector.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded text-xs">Tip</span>
                      <span>The radius and ulna should appear superimposed proximally.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded text-xs">Tip</span>
                      <span>Ensure proper alignment of the forearm and hand.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}