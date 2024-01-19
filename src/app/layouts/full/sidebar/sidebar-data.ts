import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'characters',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'selected',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'favorites',
    iconName: 'list',
    route: '/ui-components/lists',
  },
];
