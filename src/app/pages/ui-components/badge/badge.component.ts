import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Character } from 'src/app/models/rickAndMorty.model';
import { CharacterState } from 'src/app/store/rickAndMorty/rickAndMorty.state';
import {
  AddToFavorites,
  AddToSelected,
  ClearSelected,
  LoadCharacters,
  RemoveFromFavorites,
  RemoveFromSelected,
} from '../../../store/rickAndMorty/rickAndMorty.actions';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
})
export class AppBadgeComponent implements OnInit, OnDestroy {
  @Select(CharacterState.characters) characters$!: Observable<Character[]>;
  @Select(CharacterState.favorites) favorites$!: Observable<Character[]>;
  @Select(CharacterState.selected) selected$!: Observable<Character[]>;
  isLoading: boolean = true;

  private scrollSubscription?: Subscription;
  constructor(private store: Store) {}

  ngOnInit() {
    this.isLoading = true;
    this.store.dispatch(new LoadCharacters(1)).subscribe({
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy() {
    // Cancelar la suscripción si existe
    this.scrollSubscription?.unsubscribe();
  }

  onScroll() {
    const currentPage = this.store.selectSnapshot(
      (state) => state.characters.currentPage
    );

    const nextPage = Number(currentPage) + 1;
    this.store.dispatch(new LoadCharacters(nextPage));
  }

  loadMoreCharacters() {
    this.store.dispatch(new LoadCharacters(1));
  }

  toggleFavorite(characterId: number) {
    const isFavorite = this.isFavorite(characterId);
    if (isFavorite) {
      this.store.dispatch(new RemoveFromFavorites(characterId));
    } else {
      this.store.dispatch(new AddToFavorites(characterId));
    }
  }
  isFavorite(characterId: number): boolean {
    const favorites = this.store.selectSnapshot(CharacterState.favorites);
    const favoriteCharacter = favorites.find(
      (character: Character) => character.id === characterId
    );
    return !!favoriteCharacter?.isFavorite;
  }

  isSelected(characterId: number): boolean {
    const selectedCharacters = this.store.selectSnapshot(
      CharacterState.selected
    );
    return selectedCharacters.some((character) => character.id === characterId);
  }
  selectCharacter(characterId: number) {
    this.store.dispatch(new AddToSelected(characterId));
  }

  deselectCharacter(characterId: number) {
    this.store.dispatch(new RemoveFromSelected(characterId));
  }
  clearSelected() {
    this.store.dispatch(new ClearSelected());
  }
}
