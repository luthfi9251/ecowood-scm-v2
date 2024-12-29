'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export function NavMain({
   items,
}: {
   items: {
      title: string;
      url: string;
      icon: any;
      isActive?: boolean;
   }[];
}) {
   return (
      <SidebarGroup>
         <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
         <SidebarMenu>
            {items.map((item) => (
               <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                     <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
         </SidebarMenu>
      </SidebarGroup>
   );
}
