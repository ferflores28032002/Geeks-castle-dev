// Importaciones de Angular
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Importaciones de Ngxs
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

// Importaciones de RxJS
import { tap } from 'rxjs/operators';

// Importaciones de modelos y servicios
import { ApiRickAndMortyResponse } from 'src/app/models/rickAndMorty.model';
import { RickAndMortyService } from 'src/app/services/rickAndMorty.service';

// Importaciones de acciones y modelo de estado
import { AlertDialogComponent } from 'src/app/pages/characters/alert-dialog/alert-dialog.component';
import {
  AddToFavorites,
  AddToSelected,
  ClearSelected,
  LoadCharacters,
  RemoveFromFavorites,
  RemoveFromSelected,
} from '../actions/rickAndMorty.actions';
import { CharacterStateModel } from '../models/CharacterStateModel';

// Decorador para el estado Ngxs
@State<CharacterStateModel>({
  name: 'characters',
  defaults: {
    characters: [],
    favorites: [],
    selected: [],
    currentPage: 1,
  },
})
// Decorador para la inyección de dependencias
@Injectable()
// Clase que implementa NgxsOnInit para la inicialización del estado
export class CharacterState implements NgxsOnInit {
  // Constructor con inyección de servicios
  constructor(
    private rickAndMortyService: RickAndMortyService,
    private dialog: MatDialog
  ) {}

  // Selector para obtener todos los personajes con información adicional de favoritos
  @Selector()
  static characters(state: CharacterStateModel) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return state.characters.map((char) => ({
      ...char,
      isFavorite: favorites.includes(char.id),
    }));
  }

  // Selector para obtener solo los personajes marcados como favoritos
  @Selector()
  static favorites(state: CharacterStateModel) {
    return state.characters.filter((char) => state.favorites.includes(char.id));
  }

  // Selector para obtener los personajes seleccionados
  @Selector()
  static selected(state: CharacterStateModel) {
    return state.characters.filter((char) => state.selected.includes(char.id));
  }

  // Método de inicialización NgxsOnInit
  ngxsOnInit(ctx: StateContext<CharacterStateModel>) {
    // Obtener favoritos y seleccionados almacenados en el localStorage
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    const savedSelected = JSON.parse(localStorage.getItem('selected') || '[]');

    // Si hay favoritos o seleccionados guardados, actualizar el estado
    if (savedFavorites.length > 0 || savedSelected.length > 0) {
      ctx.patchState({
        favorites: savedFavorites,
        selected: savedSelected,
      });
    }
  }

  // Acción para cargar personajes desde el servicio
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

        // Actualizar el estado con los nuevos personajes
        patchState({
          characters: [...state.characters, ...newCharacters],
          currentPage: page,
        });
      })
    );
  }

  // Acción para agregar a favoritos
  @Action(AddToFavorites)
  addToFavorites(
    { getState, patchState }: StateContext<CharacterStateModel>,
    { characterId }: AddToFavorites
  ) {
    const state = getState();
    // Verificar si el personaje no está ya en favoritos
    if (!state.favorites.includes(characterId)) {
      // Actualizar el estado marcando el personaje como favorito
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

      // Guardar cambios en el localStorage
      this.saveToLocalStorage(getState());
    }
  }

  // Acción para quitar de favoritos
  @Action(RemoveFromFavorites)
  removeFromFavorites(
    { getState, patchState }: StateContext<CharacterStateModel>,
    { characterId }: RemoveFromFavorites
  ) {
    const state = getState();
    // Actualizar el estado marcando el personaje como no favorito
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

    // Guardar cambios en el localStorage
    this.saveToLocalStorage(getState());
  }

  @Action(AddToSelected)
  addToSelected(
    { getState, patchState }: StateContext<CharacterStateModel>,
    { characterId }: AddToSelected
  ) {
    const state = getState();

    // Verificar si el personaje ya está seleccionado
    if (state.selected.includes(characterId)) {
      // Eliminar el personaje de la lista si ya está seleccionado
      const updatedSelected = state.selected.filter((id) => id !== characterId);
      patchState({ selected: updatedSelected });
    } else {
      // Verificar límite de 3 personajes seleccionados
      if (state.selected.length >= 3) {
        // Mostrar alerta si se supera el límite
        this.dialog.open(AlertDialogComponent, {
          data: { message: 'Solo puedes seleccionar hasta 3 personajes.' },
        });
        return;
      }
      // Agregar el nuevo personaje seleccionado
      patchState({
        selected: [...state.selected, characterId],
      });
    }

    // Guardar cambios en el localStorage
    this.saveToLocalStorage(getState());
  }

  // Acción para quitar de seleccionados
  @Action(RemoveFromSelected)
  removeFromSelected(
    { getState, patchState }: StateContext<CharacterStateModel>,
    { characterId }: RemoveFromSelected
  ) {
    const state = getState();
    // Actualizar el estado removiendo el personaje de los seleccionados
    patchState({
      selected: state.selected.filter((id) => id !== characterId),
    });

    // Guardar cambios en el localStorage
    this.saveToLocalStorage(getState());
  }

  // Acción para limpiar la lista de seleccionados
  @Action(ClearSelected)
  clearSelected({ getState, setState }: StateContext<CharacterStateModel>) {
    const state = getState();
    // Limpiar la lista de seleccionados en el estado
    setState({
      ...state,
      selected: [],
    });

    // Guardar cambios en el localStorage
    this.saveToLocalStorage(getState());
  }

  // Método privado para guardar favoritos y seleccionados en el localStorage
  private saveToLocalStorage(state: CharacterStateModel) {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    localStorage.setItem('selected', JSON.stringify(state.selected));
  }
}
