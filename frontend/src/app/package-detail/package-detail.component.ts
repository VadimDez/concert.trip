import { Component, OnInit } from '@angular/core';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {
  eventBooked: boolean;
  hotelBooked: boolean;
  tripBooked: boolean;
  
  constructor(private packageService: PackageService) {
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

  /*getPrice() {
    return parseInt(this.concertData.concert.price)
      + parseInt(this.getBookingPrice(), 10)
      + parseInt(this.getTransportPrice(), 10);
  }
  
  getTransportPrice() {
    return this.concertData.transport && this.concertData.transport.indicativePrice ? this.concertData.transport.indicativePrice.price : 0
  }

  getBookingPrice() {
    return this.concertData.bookings && this.concertData.bookings.hotels && this.concertData.bookings.hotels.length ? this.concertData.bookings.hotels[0].price : 0;
  }*/
  
  get concertData () {
    return this.packageService.selectedPackage;
  }
}
