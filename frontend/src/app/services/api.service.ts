/**
 * Created by vadimdez on 25.06.17.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const backend = 'http://localhost:3000/api/';

@Injectable()
export class ApiService {
  constructor(private http: Http) {

  }

  getArtists() {
    return this.http.get(`${ backend }artists`, { withCredentials: true })
  }

  getConcerts(artistId) {
    return this.http.get(`${ backend }artists/${ artistId }/concerts`);
  }
}