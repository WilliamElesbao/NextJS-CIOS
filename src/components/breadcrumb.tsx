'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { LinkItem, links } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const linkMap = links.reduce((map, link) => {
  map[link.href] = link;
  return map;
}, {} as { [key: string]: LinkItem });

const getBreadcrumbLinks = (pathname: string): LinkItem[] => {
  if (pathname === '/cios') return [linkMap['/cios']];

  if (pathname.startsWith('/cios/records/new')) {
    return [
      linkMap['/cios/records'],
      { name: 'Novo', href: `${linkMap['/cios/records'].href}/new` },
    ];
  }
  if (pathname.startsWith('/cios/records')) return [linkMap['/cios/records']];

  if (pathname.startsWith('/cios/workers'))
    return [linkMap['/cios/workers']];

  // if (pathname.startsWith('/cios/analytics'))
  //   return [linkMap['/cios/analytics']];

  if (pathname.startsWith('/cios/settings/reasons')) {
    return [
      linkMap['/cios/settings'],
      { name: 'Motivos', href: `${linkMap['/cios/settings'].href}/reasons` },
    ];
  }
  if (pathname.startsWith('/cios/settings/equipments')) {
    return [
      linkMap['/cios/settings'],
      {
        name: 'Equipamentos',
        href: `${linkMap['/cios/settings'].href}/equipments`,
      },
    ];
  }
  if (pathname.startsWith('/cios/settings')) return [linkMap['/cios/settings']];

  return [];
};

export function BreadcrumbComponent() {
  const pathname = usePathname();
  const breadcrumbLinks = getBreadcrumbLinks(pathname);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbLinks.map((link, index) => (
          <React.Fragment key={link.href}>
            <BreadcrumbItem>
              {index === breadcrumbLinks.length - 1 ? (
                <span className="font-bold text-foreground">{link.name}</span>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={link.href}>{link.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbLinks.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
