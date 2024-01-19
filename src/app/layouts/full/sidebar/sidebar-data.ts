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
    route: '/characters/list',
  },
  {
    displayName: 'selected',
    iconName: 'poker-chip',
    route: '/characters/selected',
  },
  {
    displayName: 'favorites',
    iconName: 'list',
    route: '/characters/favorites',
  },
];

export const navItemLogout = {
  displayName: 'Logout',
  iconName: 'logout',
  route: '/login',
};
