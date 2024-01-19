import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MatNativeDateModule } from '@angular/material/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { charactersRoutes } from './characters.routing';

import { AppCharactersFavoritesComponent } from './characters-favorites/charactersFavorites.component';
import { AppCharactersListComponent } from './characters-list/charactersList.component';
import { AppcharactersSelectedComponent } from './characters-selected/charactersSelected.component';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(charactersRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    InfiniteScrollModule,
  ],
  declarations: [
    AppCharactersListComponent,
    AppCharactersFavoritesComponent,
    AppcharactersSelectedComponent,
    AlertDialogComponent,
  ],
})
export class charactersModule {}
