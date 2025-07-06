import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsListSkeletonComponent } from './ui/pokemons-list-skeleton/pokemons-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonsListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  pokemonService = inject(PokemonsService);

  pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  title = inject(Title);

  currentPage = toSignal<number>(
    //?cambios para generar las rutass de los pokemons en tiempo de cosntruccion
    //! se removio el output mode : server en el angular.json
    // this.route.queryParamMap.pipe(
    //ya la ruta ya no viene en queryparam viene en los parametros
    this.route.params.pipe(
      // map((params) => params.get('page') ?? '1'),
      // aqui es casi lo mismo solo que los params es un objeto literal y de este objeto vamos a tomar la pagina
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  //?cambios para generar las rutass de los pokemons en tiempo de cosntruccion
  // se agrega esto para la carga de los pokemones por pagina
  loadOnPageChanged = effect(
    () => {
      //como estamos actulizando una signal en un effect y esta funcion en el subscribe actualiza otra signal y esa signal si se actualiza podria disparar nuevamente este efecto y podriamos caer en un evento cilico, se le tiene que indicar a angular que si sabemos lo que estamos haciendo y que permita que se modifique esa signal
      this.loadPokemons(this.currentPage());
    },
    {
      allowSignalWrites: true,
    }
  );

  // isLoading = signal(true);

  // como el setTimeout del ngoninit() se resuelve hasta que la aplicacion esta estable, nos enseña con esto a saber cuando una app esta estable
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable });
  // });

  //para iniciar la aplicacion no vamos a necesitar esto de la carga porque como estamo sen ssr se van a mostrar los 2 componentes ya que al cliente se le manda la data precargada entonces en cuanto se cargue la aplicacion ya se van a ver los componentes y despues se hidratan, esto del loading seria mejor al cambiar de pagina ahi si se podria integrar
  //?cambios para generar las rutass de los pokemons en tiempo de cosntruccion
  // este no lo vamos a necesitar y vamos a eliminar su implementacion
  // ngOnInit() {
  //   // despues de los 3 seg imprime que isStable true
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // }, 3000);

  //   this.loadPokemons();
  // }

  // ngOnDestroy(): void {
  //   console.log('destroy');
  //   this.$appState.unsubscribe();
  // }

  // pokemonResource = rxResource({
  //   request: () => ({}),
  //   loader: () => {
  //     return this.pokemonService.getPokemons();
  //   },
  // });

  loadPokemons(page = 0) {
    // this.pokemonService.loadPage(page).subscribe((pokemons) => {
    //   // console.log('on init');
    //   this.pokemons.set(pokemons);
    // });

    //?cambios para generar las rutass de los pokemons en tiempo de cosntruccion
    //esta ya no hace falta
    //const pageToLoad = this.currentPage()! + page;

    //tambien se puede simplificar asi, igual que el tap el valor recibido se va a setear a los pokemones
    //.loadPage(pageToLoad)
    this.pokemonService
      .loadPage(page)
      .pipe(
        //?cambios para generar las rutass de los pokemons en tiempo de cosntruccion
        //este tap ya no va a ser necesario
        // tap(() =>
        //   // con esto no estamos navegando a ningun lugar, solo estamos cambiando los query params
        //   this.router.navigate([], { queryParams: { page: pageToLoad } })
        // ),
        //tap(() => this.title.setTitle(`Pokemon SSR - Page: ${pageToLoad}`))
        tap(() => this.title.setTitle(`Pokemon SSR - Page: ${page}`))
      )
      .subscribe(this.pokemons.set);
  }
}
