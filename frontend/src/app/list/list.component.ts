import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

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
        this.concerts = res.json();
      })
  }
}
