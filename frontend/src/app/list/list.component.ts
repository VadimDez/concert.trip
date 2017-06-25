import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  concerts = [];
  hasSelectedArtist = false;
  isLoading: boolean;
  isEmpty: boolean;

  constructor(private apiService: ApiService, private router: Router) { }

  onSelectArtist(artist) {
    this.hasSelectedArtist = true;
    this.isLoading = true;
    this.concerts = [];
    this.isEmpty = false;

    this.apiService.getConcerts(artist.id)
      .subscribe((res: any) => {
        this.concerts = res.json()
         // .sort((a, b) => { return a.price - b.price; })
         // .filter((concert) => { return concert.price; })
         .map((data) => {
           data.concert.startDate = moment(data.concert.start_time).format('MMMM DD, YYYY');
           data.concert.endDate = moment(data.concert.end_time).format('MMMM DD, YYYY');
           data.concert.startTime = moment(data.concert.start_time).format('HH:mm');
           data.concert.image = artist.image.medium.url;
           return data;
         });

        this.isEmpty = this.concerts.length === 0;
        this.isLoading = false;
      }, () => {
        this.router.navigate(['/login']);
      });
  }
}
