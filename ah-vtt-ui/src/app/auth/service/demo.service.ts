import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class DemoService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {}

  getVaccineCategories() {
    return this._http.get(`${environment.apiUrl}/demo`)
  }

}
