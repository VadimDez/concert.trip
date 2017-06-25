import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {
  tripBooked = false;
  
  constructor() {}

  ngOnInit() {
  }

  toggleTripBooked () {
    this.tripBooked = !this.tripBooked;
  }
}
