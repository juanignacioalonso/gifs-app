import {  Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',

})
export default class GifHistoryComponent {

  gifService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map(params => params['query']))
  );


  //Usamos un computed para obtener los gifs de la query
  //Usamos el servicio para obtener los gifs de la query

  gifsByKey = computed(()=>this.gifService.getHistoryGifs(this.query()))

  //es lo mismo que pero la funcion con el return

  //gifsByKey = computed(()=>{
    //return this.gifService.getHistoryGifs(this.query())
 // })
}


