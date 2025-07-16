import { ScrollStateService } from './../../../shared/services/scroll-state.service';
import {   AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';

import { GifService } from '../../services/gifs.service';




@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit{

  gifService = inject(GifService)
  ScrollStateService = inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.ScrollStateService.trendingScrollState(); // esto es para que cuando se vuelva a renderizar el componente, se mantenga el scroll en la posicion que estaba antes
  }

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
    this.ScrollStateService.trendingScrollState.set(scrollTop); // esto no es recomendado pq cualquier componente va a cambiar la señal y va a hacer que se vuelva a renderizar todo el componente

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }

 }
