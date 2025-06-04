"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';
import { ImageUploader } from '@/components/image-uploader';
import { getUserFromSession } from '@/lib/auth-utils';
import { Card, CardContent } from '@/components/ui/card';
import { Settings as Lungs } from 'lucide-react';

export default function ChestXRayUpload() {
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
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100">
              <Lungs className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Chest X-Ray Upload</h1>
              <p className="text-muted-foreground mt-1">
                Upload chest x-ray images in standard formats
              </p>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <ImageUploader 
                title="Chest X-Ray Upload"
                description="Upload a chest x-ray image. Ensure proper patient positioning and image quality."
                maxSizeMB={15}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Guidelines for Chest X-Ray Images</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded text-xs">Tip</span>
                  <span>Ensure the patient is properly positioned for the anterior-posterior (AP) or posterior-anterior (PA) view.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded text-xs">Tip</span>
                  <span>The image should show both lungs clearly, from apex to costophrenic angles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded text-xs">Tip</span>
                  <span>Ensure proper exposure – lung fields should be clearly visible.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded text-xs">Tip</span>
                  <span>Minimize rotation – medial ends of clavicles should be equidistant from spine.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}