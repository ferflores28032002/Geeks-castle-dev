import { Routes } from '@angular/router';
import { AppCharactersFavoritesComponent } from './characters-favorites/charactersFavorites.component';
import { AppCharactersListComponent } from './characters-list/charactersList.component';
import { AppcharactersSelectedComponent } from './characters-selected/charactersSelected.component';

export const charactersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: AppCharactersListComponent,
      },
      {
        path: 'selected',
        component: AppcharactersSelectedComponent,
      },
      {
        path: 'favorites',
        component: AppCharactersFavoritesComponent,
      },
    ],
  },
];
