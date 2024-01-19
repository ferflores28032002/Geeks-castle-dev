import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from '../material.module';
import { PagesRoutes } from './pages.routing.module';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
})
export class PagesModule {}
