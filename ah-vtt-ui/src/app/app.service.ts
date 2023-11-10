import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Region } from './main/region/region.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient) { }
  getAssignedSdps(): Observable<Region[]> {
    return this._http.get<Region[]>(`${environment.apiUrl}/Region/GetAssignedSdps`);
  }

}
