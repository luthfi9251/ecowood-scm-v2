'use client';

import * as React from 'react';
import {
   AudioWaveform,
   BookOpen,
   Bot,
   Box,
   Command,
   Factory,
   Frame,
   GalleryVerticalEnd,
   LayoutGrid,
   LogOut,
   Map,
   PieChart,
   Settings,
   Settings2,
   SquareTerminal,
   UserRound,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUtility } from '@/components/nav-utility';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarRail,
} from '@/components/ui/sidebar';
import { HREF_LINK } from '@/constant/href-link';
import Link from 'next/link';
import Image from 'next/image';
import EcowoodLogo from '@/assets/ecowood-logo.svg';
import { Spacer } from '@nextui-org/spacer';

// This is sample data.
const data = {
   user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
   },
   teams: [
      {
         name: 'Acme Inc',
         logo: GalleryVerticalEnd,
         plan: 'Enterprise',
      },
      {
         name: 'Acme Corp.',
         logo: AudioWaveform,
         plan: 'Startup',
      },
      {
         name: 'Evil Corp.',
         logo: Command,
         plan: 'Free',
      },
   ],
   navMain: [
      {
         title: 'Playground',
         url: '#',
         icon: SquareTerminal,
         isActive: true,
         items: [
            {
               title: 'History',
               url: '#',
            },
            {
               title: 'Starred',
               url: '#',
            },
            {
               title: 'Settings',
               url: '#',
            },
         ],
      },
      {
         title: 'Models',
         url: '#',
         icon: Bot,
         items: [
            {
               title: 'Genesis',
               url: '#',
            },
            {
               title: 'Explorer',
               url: '#',
            },
            {
               title: 'Quantum',
               url: '#',
            },
         ],
      },
      {
         title: 'Documentation',
         url: '#',
         icon: BookOpen,
         items: [
            {
               title: 'Introduction',
               url: '#',
            },
            {
               title: 'Get Started',
               url: '#',
            },
            {
               title: 'Tutorials',
               url: '#',
            },
            {
               title: 'Changelog',
               url: '#',
            },
         ],
      },
      {
         title: 'Settings',
         url: '#',
         icon: Settings2,
         items: [
            {
               title: 'General',
               url: '#',
            },
            {
               title: 'Team',
               url: '#',
            },
            {
               title: 'Billing',
               url: '#',
            },
            {
               title: 'Limits',
               url: '#',
            },
         ],
      },
   ],
   projects: [
      {
         name: 'Design Engineering',
         url: '#',
         icon: Frame,
      },
      {
         name: 'Sales & Marketing',
         url: '#',
         icon: PieChart,
      },
      {
         name: 'Travel',
         url: '#',
         icon: Map,
      },
   ],
};

const navMainData = [
   {
      title: 'Dashboard',
      url: HREF_LINK.HILIR.DASHBOARD,
      icon: LayoutGrid,
      isActive: false,
   },
   {
      title: 'Products',
      url: HREF_LINK.HILIR.PRODUCT.HOME,
      icon: Box,
      isActive: false,
   },
   {
      title: 'Supply Chain',
      url: '',
      icon: Factory,
      isActive: false,
   },
];

const navUtilityData = [
   {
      title: 'Profile',
      url: HREF_LINK.HILIR.DASHBOARD,
      icon: UserRound,
      isActive: false,
   },
   {
      title: 'Setting',
      url: HREF_LINK.HILIR.DASHBOARD,
      icon: Settings,
      isActive: false,
   },
   {
      title: 'Log Out',
      url: HREF_LINK.HILIR.DASHBOARD,
      icon: LogOut,
      isActive: false,
   },
];

const SidebarLogo = () => {
   return (
      <Link href="/" className="flex items-center gap-3">
         <Image src={EcowoodLogo} width={40} height={40} alt="Ecowood Logo" />
         <p className="text-black font-bold">Ecowood SCM</p>
      </Link>
   );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar collapsible="icon" {...props}>
         <SidebarHeader>
            <SidebarLogo />
            {/* <Spacer /> */}
            {/* <TeamSwitcher teams={data.teams} /> */}
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={navMainData} />
            <NavUtility utilities={navUtilityData} />
         </SidebarContent>
         <SidebarFooter>
            <NavUser user={data.user} />
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   );
}
