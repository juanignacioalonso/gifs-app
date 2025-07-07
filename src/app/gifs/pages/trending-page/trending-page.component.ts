import {  Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';




@Component({
  selector: 'app-trending-page',
  //imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifService)

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    //scrollTop ES LA CANTIDAD DE SCROLL QUE SE HA HECHODESDE LA PARTE DE ARRIVA
    const scrollTop = scrollDiv.scrollTop;
    // clientHeigth es el tamaño del viewpoint, es decir, la parte visible del scroll
    const clientHeigth = scrollDiv.clientHeight;
    // scrollHeight cuanto es el scroll posible que podemos hacer en ese elemento
    const scrollHeight = scrollDiv.scrollHeight;

    //console.log({ scrollTotal: scrollTop + clientHeigth,scrollHeight})

    const isAtBottom = scrollTop + clientHeigth +300 >= scrollHeight;

    console.log({ isAtBottom });
  }

 }
