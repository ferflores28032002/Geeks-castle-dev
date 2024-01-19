import { Character } from 'src/app/models/rickAndMorty.model';

export class CharacterStateModel {
  characters: Character[] = [];
  favorites: number[] = [];
  selected: number[] = [];
  currentPage: number = 1;
}
