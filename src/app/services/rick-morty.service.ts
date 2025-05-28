import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1): Observable<Character[]> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      map(response => {
        // Añadimos propiedades adicionales para los componentes Material
        return response.results.map((character: Character) => ({
          ...character,
          powerLevel: Math.floor(Math.random() * 100) + 1,
          experiencePoints: Math.floor(Math.random() * 1000) + 100
        }));
      })
    );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`).pipe(
      map(character => ({
        ...character,
        powerLevel: Math.floor(Math.random() * 100) + 1,
        experiencePoints: Math.floor(Math.random() * 1000) + 100
      }))
    );
  }
}
