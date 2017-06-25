/**
 * Created by vadimdez on 24.06.17.
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  title = 'app';

  constructor(router: Router, apiService: ApiService) {
    apiService.getArtists()
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}