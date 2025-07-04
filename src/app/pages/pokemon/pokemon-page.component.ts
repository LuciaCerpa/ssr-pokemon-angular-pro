import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { PokemonId, PokemonIDResponse } from '../../pokemons/interfaces';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent {
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonsService);
  title = inject(Title);
  meta = inject(Meta);
  //pokemon = signal<PokemonId | null>(null);
  pokemon = signal<PokemonIDResponse | null>(null);

  ngOnInit() {
    this.getPokemonById();
  }

  getPokemonById() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    if (!id) return;

    this.pokemonService
      .getPokemonById(id)
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`;
          const descripcion = `Pagina del pokemon ${name}`;
          this.title.setTitle(pageTitle);
          // le gusta usar este porque sino esta la tag la crea y sino pues la actualiza
          this.meta.updateTag({
            name: 'description',
            contact: descripcion,
          });
          //este es utilizado para redes sociales signigica open graph
          this.meta.updateTag({
            name: 'og:title',
            contact: pageTitle,
          });
          this.meta.updateTag({
            name: 'og:description',
            contact: descripcion,
          });
          //esta es la imagen que se utiliza cuando alguien comparte nuestro enlace
          this.meta.updateTag({
            name: 'og:image',
            contact: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        })
      )
      .subscribe(this.pokemon.set);
  }
}
