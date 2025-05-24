import { GifMapper } from './../mapper/gif.mapper';
import { environment } from '#@environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(true);

  constructor() {

    this.loadTrendingGifs();

  }

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

}
