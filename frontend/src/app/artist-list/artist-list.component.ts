import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists = [];
  isLoading: boolean;

  @Output() selectArtist = new EventEmitter<any>();

  constructor(private apiService: ApiService, private router: Router) {
    this.getArtists();
  }

  ngOnInit() {
  }

  getArtists() {
    this.isLoading = true;

    this.apiService.getArtists()
      .subscribe((res: any) => {
        this.artists = res.json();
        this.isLoading = false;
      }, () => {
        this.router.navigate(['/login']);
      });
  }

  onSelectArtist(artist) {
    this.selectArtist.next(artist);
  }
}
