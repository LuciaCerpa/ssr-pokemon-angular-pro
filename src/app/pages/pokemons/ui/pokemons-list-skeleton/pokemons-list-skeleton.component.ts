import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemons-list-skeleton',
  imports: [],
  templateUrl: './pokemons-list-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListSkeletonComponent {}
