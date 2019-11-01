import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/enviroments.backup';



@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3';
  private API_KEY = environment.API_KEY_YOUTUBE;
  private PLAYLIST_ID = 'UUy5znSnfMsDwaLlROnZ7Qbg';
  private NEXT_PAGE_TOKEN: string;

  constructor(public httpClient: HttpClient) { }

  getVideos() {

    const parametros = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.PLAYLIST_ID)
      .set('key', this.API_KEY);

    const url = `${this.YOUTUBE_URL}/playlistItems`;
    return this.httpClient.get(url, {params: parametros}).pipe(map( (respuesta: any) => {
      this.NEXT_PAGE_TOKEN = respuesta.nextPageToken;

      const videos: any[] = [];
      for (const video of respuesta.items) {
        const snippet = video.snippet;
        videos.push(snippet);
      }

      return videos;
    }));
  }
}
