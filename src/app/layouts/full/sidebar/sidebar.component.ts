import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { navItemLogout, navItems } from './sidebar-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;
  navItemLogout = navItemLogout;
  @Output() toggleMobileNav = new EventEmitter<void>();

  constructor(public navService: NavService) {}

  ngOnInit(): void {}

  isMobile(): boolean {
    return window.innerWidth < 768;
  }
}
