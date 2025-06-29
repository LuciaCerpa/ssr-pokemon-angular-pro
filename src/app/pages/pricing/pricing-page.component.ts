import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // if (!isPlatformServer(this.platform)) {
    //   document.title = 'Pricing Page';
    // }
    // console.log(isPlatformBrowser(this.platform));
    // console.log(isPlatformServer(this.platform));

    //console.log(this.platform);

    // con el ssr no tenemos acceso a document, location, entre otras
    // document.title = 'Pricing page';
    //console.log({ document });
    //console.log({ hola: 'mundo' });

    this.title.setTitle('Pricing Page');
    this.meta.updateTag({
      name: 'descripcion',
      content: 'Este es mi Pricing page',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Pricing Page',
    });
  }
}
