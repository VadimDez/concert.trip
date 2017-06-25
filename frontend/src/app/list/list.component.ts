import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  concerts = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }

  onSelectArtist(artist) {

    this.apiService.getConcerts(artist.id)
      .subscribe((res: any) => {
        this.concerts = res.json()
                           .sort((a, b) => { return a.price - b.price; })
                           .filter((concert) => { return concert.price; })
                           .map((concert) => {
                              concert.startDate = moment(concert.start_time).format('MMMM DD, YYYY');
                              concert.endDate = moment(concert.end_time).format('MMMM DD, YYYY');
                              concert.startTime = moment(concert.start_time).format('HH:mm');
                              return concert;
                            });
      })
  }
}
