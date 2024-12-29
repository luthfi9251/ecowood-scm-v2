import { Fragment } from 'react';
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Separator } from './ui/separator';
import { SidebarTrigger } from './ui/sidebar';

export type PageProps = {
   children: React.ReactNode;
   breadCrumbs: {
      label: string;
      isActive: boolean;
      href: string;
   }[];
};

export default function PageBase(props: PageProps) {
   return (
      <>
         <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
               <SidebarTrigger className="-ml-1" />
               <Separator orientation="vertical" className="mr-2 h-4" />
               <Breadcrumb>
                  <BreadcrumbList>
                     {props.breadCrumbs.map((item, idx) => {
                        if (item.isActive) {
                           return (
                              <Fragment key={idx}>
                                 <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={item.href}>
                                       {item.label}
                                    </BreadcrumbLink>
                                 </BreadcrumbItem>
                                 <BreadcrumbSeparator className="hidden md:block" />
                              </Fragment>
                           );
                        } else {
                           return (
                              <BreadcrumbItem key={idx}>
                                 <BreadcrumbPage>{item.label}</BreadcrumbPage>
                              </BreadcrumbItem>
                           );
                        }
                     })}
                  </BreadcrumbList>
               </Breadcrumb>
            </div>
         </header>
         {props.children}
      </>
   );
}
