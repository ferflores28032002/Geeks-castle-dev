import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiRickAndMortyResponse } from '../models/rickAndMorty.model';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) {}

  getCharacters(page: number): Observable<ApiRickAndMortyResponse> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<ApiRickAndMortyResponse>(url);
  }
}
