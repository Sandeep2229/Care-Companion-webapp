import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight, Stethoscope, Heart, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Care Companion</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login/technician">
              <Button variant="ghost">Technician Login</Button>
            </Link>
            <Link href="/login/doctor">
              <Button variant="ghost">Doctor Login</Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="container py-24 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Advanced Medical Imaging Platform
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Streamline your workflow with our secure, intuitive platform for medical imaging management and analysis.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/login/technician">
                  <Button size="lg" className="group">
                    Technician Login
                    <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/login/doctor">
                  <Button size="lg" variant="outline" className="group">
                    Doctor Login
                    <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-80 w-80 rounded-full bg-blue-100/80 flex items-center justify-center">
                <Stethoscope className="h-40 w-40 text-blue-600" />
              </div>
            </div>
          </div>
        </section>
        
        <section className="container py-16 sm:py-24">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Key Features</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
                title: "Secure Uploads",
                description: "Industry-leading security protocols to protect sensitive medical data."
              },
              {
                icon: <Stethoscope className="h-10 w-10 text-blue-600" />,
                title: "Multiple View Options",
                description: "Specialized viewing options for different medical imaging requirements."
              },
              {
                icon: <Heart className="h-10 w-10 text-blue-600" />,
                title: "Role-Based Access",
                description: "Custom interfaces for technicians and doctors with appropriate permissions."
              }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center rounded-lg p-6 text-center shadow-sm border transition-all hover:shadow-md">
                <div className="mb-4 rounded-full bg-blue-100 p-3">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">Care Companion</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Care Companion. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}