import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-concert-package',
  templateUrl: './concert-package.component.html',
  styleUrls: ['./concert-package.component.css']
})
export class ConcertPackageComponent implements OnInit {
  @Input() concertData: Object;
  constructor() { }

  ngOnInit() {
  }

}
