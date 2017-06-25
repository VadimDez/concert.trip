import { Injectable } from '@angular/core';

@Injectable()
export class PackageService {
  selectedPackage: Object;
  constructor() {
    this.selectedPackage = null;
  }
  
  selectPackage (concertData) {
    this.selectedPackage = concertData;
  }
}
