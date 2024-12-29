import { AppSidebar } from '@/components/app-sidebar';
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from '@/components/ui/sidebar';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
   return (
      <SidebarProvider>
         <AppSidebar className="bg-white" />
         <SidebarInset className="bg-[#ECEDF4]">{children}</SidebarInset>
      </SidebarProvider>
   );
}
