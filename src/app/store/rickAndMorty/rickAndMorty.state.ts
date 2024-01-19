import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import {
  ApiRickAndMortyResponse,
  Character,
} from 'src/app/models/rickAndMorty.model';
import { AlertDialogComponent } from 'src/app/pages/ui-components/alert-dialog/alert-dialog.component';
import { RickAndMortyService } from 'src/app/services/rickAndMorty.service';
import {
  AddToFavorites,
  AddToSelected,
  ClearSelected,
  LoadCharacters,
  RemoveFromFavorites,
  RemoveFromSelected,
} from './rickAndMorty.actions';

export class CharacterStateModel {
  characters: Character[] = [];
  favorites: number[] = [];
  selected: number[] = [];
  currentPage: number = 1;
}

@State<CharacterStateModel>({
  name: 'characters',
  defaults: {
    characters: [],
    favorites: [],
    selected: [],
    currentPage: 1,
  },
})
@Injectable()
export class CharacterState implements NgxsOnInit {
  constructor(
    private rickAndMortyService: RickAndMortyService,
    private dialog: MatDialog
  ) {}

  @Selector()
  static characters(state: CharacterStateModel) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return state.characters.map((char) => ({
      ...char,
      isFavorite: favorites.includes(char.id),
    }));
  }

  @Selector()
  static favorites(state: CharacterStateModel) {
    return state.characters.filter((char) => state.favorites.includes(char.id));
  }

  @Selector()
  static selected(state: CharacterStateModel) {
    return state.characters.filter((char) => state.selected.includes(char.id));
  }

  ngxsOnInit(ctx: StateContext<CharacterStateModel>) {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    const savedSelected = JSON.parse(localStorage.getItem('selected') || '[]');

    if (savedFavorites.length > 0 || savedSelected.length > 0) {
      ctx.patchState({
        favorites: savedFavorites,
        selected: savedSelected,
      });
    }
  }

  @Action(LoadCharacters)
  loadCharacters(
    { getState, patchState }: StateContext<CharacterStateModel>,
    { page }: LoadCharacters
  ) {
    return this.rickAndMortyService.getCharacters(page).pipe(
      tap((response: ApiRickAndMortyResponse) => {
        const state = getState();
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const newCharacters = response.results
          .map((newChar) => ({
            ...newChar,
            isFavorite: favorites.includes(newChar.id),
          }))
          .filter(
            (newChar) =>
              !state.characters.some((char) => char.id === newChar.id)
          );

        patchState({
          characters: [...state.characters, ...newCharacters],
          currentPage: page,
        });
      })
    );
  }

  @Action(AddToFavorites)
  addToFavorites(
    { getState, patchState }: StateContext<CharacterStateModel>,
    { characterId }: AddToFavorites
  ) {
    const state = getState();
    if (!state.favorites.includes(characterId)) {
      const characters = state.characters.map((character) => {
        if (character.id === characterId) {
          return { ...character, isFavorite: true };
        }
        return character;
      });

      patchState({
        characters,
        favorites: [...state.favorites, characterId],
      });

      this.saveToLocalStorage(getState());
    }
  }

  @Action(RemoveFromFavorites)
  removeFromFavorites(
    { getState, patchState }: StateContext<CharacterStateModel>,
    { characterId }: RemoveFromFavorites
  ) {
    const state = getState();
    const characters = state.characters.map((character) => {
      if (character.id === characterId) {
        return { ...character, isFavorite: false };
      }
      return character;
    });

    patchState({
      characters,
      favorites: state.favorites.filter((id) => id !== characterId),
    });

    this.saveToLocalStorage(getState());
  }

  @Action(AddToSelected)
  addToSelected(
    { getState, patchState }: StateContext<CharacterStateModel>,
    { characterId }: AddToSelected
  ) {
    const state = getState();
    if (!state.selected.includes(characterId)) {
      if (state.selected.length >= 3) {
        this.dialog.open(AlertDialogComponent, {
          data: { message: 'Solo puedes seleccionar hasta 3 personajes.' },
        });
        return;
      }
      patchState({
        selected: [...state.selected, characterId],
      });

      this.saveToLocalStorage(getState());
    }
  }

  @Action(RemoveFromSelected)
  removeFromSelected(
    { getState, patchState }: StateContext<CharacterStateModel>,
    { characterId }: RemoveFromSelected
  ) {
    const state = getState();
    patchState({
      selected: state.selected.filter((id) => id !== characterId),
    });

    this.saveToLocalStorage(getState());
  }

  @Action(ClearSelected)
  clearSelected({ getState, setState }: StateContext<CharacterStateModel>) {
    const state = getState();
    setState({
      ...state,
      selected: [],
    });

    this.saveToLocalStorage(getState());
  }

  private saveToLocalStorage(state: CharacterStateModel) {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    localStorage.setItem('selected', JSON.stringify(state.selected));
  }
}
