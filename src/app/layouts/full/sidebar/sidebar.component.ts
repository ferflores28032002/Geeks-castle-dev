import { Component, OnInit } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { navItems } from './sidebar-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  constructor(public navService: NavService) {}

  ngOnInit(): void {}
}
