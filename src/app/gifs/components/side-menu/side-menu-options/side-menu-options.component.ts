import {  Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [
    RouterLink,RouterLinkActive,
  ],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {

  // Inyectamos el servicio de gifs
  // Este servicio nos permite acceder a los gifs y a las funcionalidades de la aplicacion
  gifServise = inject(GifService)

    menuOptions:MenuOption[] = [
    {
      icon:'fa-solid fa-chart-line',
      label:'Trening',
      subLabel: 'Gifs Populares',
      route:'/dashboard/trending'
    },
    {
      icon:'fa-solid fa-magnifying-glass',
      label:'Buscador',
      subLabel: 'Buscar gifs',
      route:'/dashboard/search'
    },

  ];
 }
