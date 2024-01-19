import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/rickAndMorty.model';
import { RemoveFromSelected } from 'src/app/store/actions/rickAndMorty.actions';
import { CharacterState } from 'src/app/store/states/rickAndMorty.state';

@Component({
  selector: 'app-charactersSelected',
  templateUrl: './charactersSelected.component.html',
})
export class AppcharactersSelectedComponent {
  @Select(CharacterState.selected) selected$!: Observable<Character[]>;

  constructor(private store: Store) {}

  deselectCharacter(characterId: number) {
    this.store.dispatch(new RemoveFromSelected(characterId));
  }
}
