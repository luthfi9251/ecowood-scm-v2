'use client';

import {
   Folder,
   Forward,
   MoreHorizontal,
   Trash2,
   type LucideIcon,
} from 'lucide-react';

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuAction,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export function NavUtility({
   utilities,
}: {
   utilities: {
      title: string;
      url: string;
      icon: LucideIcon;
      isActive?: boolean;
   }[];
}) {
   return (
      <SidebarGroup>
         <SidebarGroupLabel>Utility</SidebarGroupLabel>
         <SidebarMenu>
            {utilities.map((item) => (
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
