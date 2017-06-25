import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {
  eventBooked: boolean;
  hotelBooked: boolean;
  tripBooked: boolean;
  
  constructor() {
    this.eventBooked = false;
    this.hotelBooked = false;
    this.tripBooked = false;
  }

  ngOnInit() {
  }

  toggleEventBooked () {
    this.eventBooked = !this.eventBooked;
  }
  
  toggleHotelBooked () {
    this.hotelBooked = !this.hotelBooked;
  }
  
  toggleTripBooked () {
    this.tripBooked = !this.tripBooked;
  }
}
