import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Traveler, GetTravelerUI, TravelerListUI, Country} from './traveler.model';

@Injectable({
  providedIn: 'root'
})
export class TravelerService {

    /**
   *
   * @param {HttpClient} _http
   */

  constructor(private _http: HttpClient) { }

  GetTravelerList(pageSize: number, pageNumber: number): Observable<TravelerListUI[]>{
    return this._http.get<TravelerListUI[]>(`${environment.apiUrl}/Traveler/GetTravelerList?pageSize=${pageSize}&pageNumber=${pageNumber}`)
  }

  GetTravelerById(travelerId: number): Observable<GetTravelerUI>{
    return this._http.get<GetTravelerUI>(`${environment.apiUrl}/Traveler/GetTravelerById?id=${travelerId}`)
  }

  AddTraveler(traveler: Traveler): Observable<Traveler> {
    return this._http.post<Traveler>(`${environment.apiUrl}/Traveler/AddTraveler`, traveler);
  }

  UpdateTraveler(traveler: Traveler): Observable<Traveler> {
    return this._http.put<Traveler>(`${environment.apiUrl}/Traveler/UpdateTraveler`, traveler);
  }

  DeleteTraveler(travelerId: number): Observable<void>{
    return this._http.delete<void>(`${environment.apiUrl}/Traveler/DeleteTraveler?id=${travelerId}`);
  }

  GetCountryList(): Observable<Country[]>{
    return this._http.get<Country[]>(`${environment.apiUrl}/Child/GetCountryList`)
  }
}
