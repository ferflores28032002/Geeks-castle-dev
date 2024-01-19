import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiRickAndMortyResponse } from '../models/rickAndMorty.model';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  // variable de entorno
  private apiUrl = environment.apiUrlRickAndMorty;

  constructor(private http: HttpClient) {}

  getCharacters(page: number): Observable<ApiRickAndMortyResponse> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<ApiRickAndMortyResponse>(url);
  }
}
