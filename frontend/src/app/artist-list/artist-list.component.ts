import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists = [];

  constructor(apiService: ApiService) {
    apiService.getArtists()
      .subscribe((res: any) => {
        this.artists = res.json();
      });
  }

  ngOnInit() {
  }

}
