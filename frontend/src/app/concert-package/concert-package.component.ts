import { Component, Input, OnInit } from '@angular/core';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-concert-package',
  templateUrl: './concert-package.component.html',
  styleUrls: ['./concert-package.component.css']
})
export class ConcertPackageComponent implements OnInit {
  @Input() concertData: any;
  isHotelRequired: boolean;
  hotelName: string;

  constructor(private packageService: PackageService) {}

  ngOnInit() {
    this.getHotelName();
  }

  getPrice() {
    console.log(this.concertData);

    this.concertData.totalPrice = parseInt(this.concertData.concert.price)
      + parseInt(this.getBookingPrice(), 10)
      + parseInt(this.getTransportPrice(), 10);
      
    return this.concertData.totalPrice;
  }

  getTransportPrice() {
    return this.concertData.transport && this.concertData.transport.indicativePrice ? this.concertData.transport.indicativePrice.price : 0
  }

  getBookingPrice() {
    return this.concertData.bookings && this.concertData.bookings.hotels && this.concertData.bookings.hotels.length ? this.concertData.bookings.hotels[0].price : 0;
  }

  getHotelName() {
    if (!this.concertData.bookings || !this.concertData.bookings.hotels || !this.concertData.bookings.hotels.length) {
      this.isHotelRequired = false;
      return;
    }

    this.isHotelRequired = true;
    this.hotelName = this.concertData.bookings.hotels[0].hotel_name;
  }

  getTime() {
    const time = this.concertData.transport.duration;

    return `${ Math.floor(time / 60) }h ${ Math.floor(time % 60) } m`;
  }
  
  onSelectPackage () {
    this.packageService.selectPackage(this.concertData);
  }
}
