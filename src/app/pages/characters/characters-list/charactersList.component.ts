// Importaciones de Angular
import { Component, OnInit } from '@angular/core';

// Importaciones de NGXS y RxJS
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

// Importaciones de modelos y estados
import { Character } from 'src/app/models/rickAndMorty.model';
import { CharacterState } from 'src/app/store/states/rickAndMorty.state';

// Importaciones de acciones
import {
  AddToFavorites,
  AddToSelected,
  ClearSelected,
  LoadCharacters,
  RemoveFromFavorites,
  RemoveFromSelected,
} from '../../../store/actions/rickAndMorty.actions';

@Component({
  selector: 'app-charactersList',
  templateUrl: './charactersList.component.html',
})
export class AppCharactersListComponent implements OnInit {
  // Variables de estado NGXS
  @Select(CharacterState.characters) characters$!: Observable<Character[]>;
  @Select(CharacterState.favorites) favorites$!: Observable<Character[]>;
  @Select(CharacterState.selected) selected$!: Observable<Character[]>;

  // Variable de carga
  isLoading: boolean = true;

  // Constructor
  constructor(private store: Store) {}

  // Método de inicialización
  ngOnInit() {
    this.isLoading = true;
    this.dispatchLoadCharacters();
  }

  // Método para cargar personajes
  dispatchLoadCharacters(nextPage: number = 1) {
    this.store.dispatch(new LoadCharacters(nextPage)).subscribe({
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  // Método para cargar la siguiente página de personajes
  onNextPage() {
    const currentPage = this.store.selectSnapshot(
      (state) => state.characters.currentPage
    );

    const nextPage = Number(currentPage) + 1;
    this.dispatchLoadCharacters(nextPage);
  }

  // Método para cargar más personajes
  loadMoreCharacters() {
    this.store.dispatch(new LoadCharacters(1));
  }

  // Método para alternar favoritos
  toggleFavorite(characterId: number) {
    const isFavorite = this.isFavorite(characterId);
    if (isFavorite) {
      this.store.dispatch(new RemoveFromFavorites(characterId));
    } else {
      this.store.dispatch(new AddToFavorites(characterId));
    }
  }

  // Método para verificar si un personaje es favorito
  isFavorite(characterId: number): boolean {
    const favorites = this.store.selectSnapshot(CharacterState.favorites);
    const favoriteCharacter = favorites.find(
      (character: Character) => character.id === characterId
    );
    return !!favoriteCharacter?.isFavorite;
  }

  // Método para verificar si un personaje está seleccionado
  isSelected(characterId: number): boolean {
    const selectedCharacters = this.store.selectSnapshot(
      CharacterState.selected
    );
    return selectedCharacters.some((character) => character.id === characterId);
  }

  // Método para seleccionar un personaje
  selectCharacter(characterId: number) {
    this.store.dispatch(new AddToSelected(characterId));
  }

  // Método para deseleccionar un personaje
  deselectCharacter(characterId: number) {
    this.store.dispatch(new RemoveFromSelected(characterId));
  }

  // Método para limpiar la selección
  clearSelected() {
    this.store.dispatch(new ClearSelected());
  }
}
