import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/rickAndMorty.model';
import { CharacterState } from 'src/app/store/states/rickAndMorty.state';

@Component({
  selector: 'app-charactersFavorites',
  templateUrl: './charactersFavorites.component.html',
})
export class AppCharactersFavoritesComponent {
  @Select(CharacterState.favorites) favorites$!: Observable<Character[]>;

  constructor(private store: Store) {}
}
