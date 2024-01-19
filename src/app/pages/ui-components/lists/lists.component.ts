import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/rickAndMorty.model';
import { CharacterState } from 'src/app/store/rickAndMorty/rickAndMorty.state';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./list.components.scss'],
})
export class AppListsComponent {
  @Select(CharacterState.favorites) favorites$!: Observable<Character[]>;

  constructor(private store: Store) {}
}
