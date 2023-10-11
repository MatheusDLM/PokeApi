import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './app.interface';

@Injectable({
  providedIn: 'root' // TODO? Não usar providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getDados(name: string): Observable<Pokemon> | null {
    if (name === '') return null;

    return this._http.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/' + name);
  }

}
