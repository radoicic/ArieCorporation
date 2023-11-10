import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormOptions, Vaccine } from "app/main/immunizations/vaccine-management/vaccine-management.model";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VaccineManagementService { 
  onDatatablessChanged: BehaviorSubject<any>;
  rows: any;
  constructor(private _httpClient: HttpClient) { }

  getFormOptions(): Observable<FormOptions> {
    return this._httpClient.get<FormOptions>(`${environment.apiUrl}/Vaccine/GetFormOptions`);
  }

  getVaccines(pageNumber: number, pageSize: number): Observable<Vaccine[]>{
    return this._httpClient.get<Vaccine[]>(`${environment.apiUrl}/Vaccine/GetVaccineCategoriesList?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  addVaccine(data: Vaccine): Observable<Vaccine>{
    return this._httpClient.post<Vaccine>(`${environment.apiUrl}/Vaccine/AddVaccine`, data);      
  }

  updateVaccine(data: Vaccine): Observable<Vaccine>{
    return this._httpClient.post<Vaccine>(`${environment.apiUrl}/Vaccine/UpdateVaccine`, data);      
  }

  deleteVaccine(data: Vaccine): Observable<Vaccine>{
    return this._httpClient.post<Vaccine>(`${environment.apiUrl}/Vaccine/DeleteVaccine`, data);      
  }

}