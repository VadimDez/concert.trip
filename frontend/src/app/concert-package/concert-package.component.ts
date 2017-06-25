import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-concert-package',
  templateUrl: './concert-package.component.html',
  styleUrls: ['./concert-package.component.css']
})
export class ConcertPackageComponent {
  @Input() concertData: any;
  constructor() { }

  getPrice() {
    console.log(this.concertData);

    return this.concertData.concert.price
      + parseInt(this.getBookingPrice(), 10)
      + parseInt(this.getTransportPrice(), 10);
  }

  getTransportPrice() {
    return this.concertData.transport && this.concertData.transport.indicativePrice ? this.concertData.transport.indicativePrice.price : 0
  }

  getBookingPrice() {
    return this.concertData.booking && this.concertData.booking.hotels && this.concertData.booking.hotels.length ? this.concertData.booking.hotels[0].price : 0;
  }
}
