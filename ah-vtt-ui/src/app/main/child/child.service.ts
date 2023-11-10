import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Child, GetChildUI, ChildListUI, Country} from './child.model';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

    /**
   *
   * @param {HttpClient} _http
   */

  constructor(private _http: HttpClient) { }

  GetChildList(pageSize: number, pageNumber: number): Observable<ChildListUI[]>{
    return this._http.get<ChildListUI[]>(`${environment.apiUrl}/Child/GetChildList?pageSize=${pageSize}&pageNumber=${pageNumber}`)
  }

  GetCountryList(): Observable<Country[]>{
    return this._http.get<Country[]>(`${environment.apiUrl}/Child/GetCountryList`)
  }

  GetChildById(childId: number): Observable<GetChildUI>{
    return this._http.get<GetChildUI>(`${environment.apiUrl}/Child/GetChildById?id=${childId}`)
  }

  AddChild(child: Child): Observable<Child> {
    return this._http.post<Child>(`${environment.apiUrl}/Child/AddChild`, child);
  }

  UpdateChild(child: Child): Observable<Child> {
    return this._http.put<Child>(`${environment.apiUrl}/Child/UpdateChild`, child);
  }

  DeleteChild(childId: number): Observable<void>{
    return this._http.delete<void>(`${environment.apiUrl}/Child/DeleteChild?id=${childId}`);
  }  
}
