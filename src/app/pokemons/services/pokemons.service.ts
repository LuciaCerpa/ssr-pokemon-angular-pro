import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import {
  PokemonResponse,
  Result,
} from '../interfaces/pokemonResponse.interface';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokemonId, PokemonIDResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  url = 'https://pokeapi.co/api/v2/pokemon';

  http = inject(HttpClient);

  loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http
      .get<PokemonResponse>(`${this.url}?offset=${page * 20}&limit=20`)
      .pipe(
        map((resp) => {
          const simplePokemons: SimplePokemon[] = resp.results.map(
            (pokemon) => ({
              id: pokemon.url.split('/').at(-2) ?? '',
              name: pokemon.name,
            })
          );
          return simplePokemons;
        }) //tambien se puede dejar asi y lo que sea que reciba el tap lo va a imprimir por consola
        // tap(console.log)
      );
  }

  getPokemonById(id: string): Observable<PokemonIDResponse> {
    return this.http
      .get<PokemonIDResponse>(`${this.url}/${id}`)
      .pipe(map((pokemon) => pokemon));
    // return this.http.get<PokemonIDResponse>(`${this.url}/${id}`).pipe(
    // map((pokemonResponse) => {
    // const responsePokemon: PokemonId = {
    //   id: pokemonResponse.id,
    //   is_default: pokemonResponse.is_default,
    //   location_area_encounters: pokemonResponse.location_area_encounters,
    //   name: pokemonResponse.name,
    //   order: pokemonResponse.order,
    //   image:
    //     pokemonResponse.sprites.other?.['official-artwork'].front_default ??
    //     '',
    // };
    // return responsePokemon;
    // })
    // );
  }

  getPokemons(): Observable<Result[]> {
    return this.http
      .get<PokemonResponse>(this.url)
      .pipe(map((data) => data.results));
  }
}
