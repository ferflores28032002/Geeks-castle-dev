import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/rickAndMorty.model';
import { RemoveFromSelected } from 'src/app/store/rickAndMorty/rickAndMorty.actions';
import { CharacterState } from 'src/app/store/rickAndMorty/rickAndMorty.state';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class AppChipsComponent {
  @Select(CharacterState.selected) selected$!: Observable<Character[]>;

  constructor(private store: Store) {}

  deselectCharacter(characterId: number) {
    this.store.dispatch(new RemoveFromSelected(characterId));
  }
}
