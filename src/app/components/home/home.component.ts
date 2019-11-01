import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  public videos: any[] = [];
  public videoSeleccionado: any;

  constructor(public youtubeService: YoutubeService) {
    this.youtubeService.getVideos().subscribe(videos => this.videos = videos);
  }

  ngOnInit() {
  }


  public verVideo(video: any) {
    this.videoSeleccionado = video;
    $('#myModal').modal();

  }

  public cerrarModal() {
    this.videoSeleccionado = null;
    $('#myModal').modal('hide');
  }

  public cargarMas() {
    this.youtubeService.getVideos().subscribe(videos => this.videos = this.videos.concat(videos));
  }

}
