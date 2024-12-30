import { getProfile } from '@/app/_actions/profile';
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
import { Company } from '@/lib/entities/models/company';
import { User } from '@/lib/entities/models/user';
import { getCurrentSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function layout({
   children,
}: {
   children: React.ReactNode;
}) {
   let session = await getProfile();
   return (
      <SidebarProvider>
         <AppSidebar
            className="bg-white"
            company={(session?.company as Company) ?? null}
            user={session?.user}
         />
         <SidebarInset className="bg-[#ECEDF4]">{children}</SidebarInset>
      </SidebarProvider>
   );
}
