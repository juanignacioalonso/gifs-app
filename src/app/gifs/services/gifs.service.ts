import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif } from './../interfaces/gif.interface';
import { GifMapper } from './../mapper/gif.mapper';
import { environment } from '#@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { map, Observable, tap } from 'rxjs';



// Guardamos los gifs en el localStorage con la clave 'gifs'
const GIF_KEY = 'gifs';


// Esta función se encarga de cargar los gifs desde el localStorage

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; // record<string, Gif[]>
  const gifs = JSON.parse(gifsFromLocalStorage);
  console.log(gifs)
  return gifs;
}



@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(true);

  //Para almacenar la busqueda de los gif que hacemos
  searchHistory = signal<Record<string,Gif[]>>(loadFromLocalStorage())
  searchHistoryKeys = computed(()=>Object.keys(this.searchHistory()));

  constructor() {

    this.loadTrendingGifs();

  }

  saveGifsToLocalStorage = effect(()=>{
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs',historyString);
  })


  loadTrendingGifs() {

    this.http.get<GiphyResponse>(`${ environment.gipghyApiUrl }/gifs/trending`,{
      params:{
        api_key: environment.giphyApiKey,
        limit:20,
      },
    })
    .subscribe((resp)=>{

      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);

      console.log({gifs});

    })

  }

  searchGifs(query: string):Observable<Gif[]> {
    //Si la query esta vacia, no hacemos nada
        return this.http.get<GiphyResponse>(`${ environment.gipghyApiUrl }/gifs/search`,{
      params:{
        api_key: environment.giphyApiKey,
        limit:20,
        q: query,
      },
    })
    .pipe(
      map(({data})=>data),
      map((items)=>GifMapper.mapGiphyItemsToGifArray(items)),

      // Historial
      //Cada ves que busque un elemento y tenga una resolución del mismo va a ser necesario usar un efecto secundario, el operador para este fin es tap
      tap( (items)=>{
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items,
        }));
      })
    );
    //.subscribe((resp)=>{

      //const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);

      //console.log({ search: gifs});

    //})

  }

  getHistoryGifs(query:string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
