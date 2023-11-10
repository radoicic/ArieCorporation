import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ILookupRegion, Region, RegionType } from './region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private _http: HttpClient) { }
  getRegionDetails(id: number, regionType: RegionType): Observable<any>{
    if(id && (regionType || regionType === RegionType.Country))
      return this._http.get(`${environment.apiUrl}/Region/GetRegionDetails?id=${id}&regionType=${regionType}`)
    return this._http.get(`${environment.apiUrl}/Region/GetRegionDetails`)
  }
  addRegion(region: Region): Observable<Region> {
    return this._http.post<Region>(`${environment.apiUrl}/Region/Transact`, region);
  }
  updateRegion(region: Region): Observable<Region> {
    return this._http.put<Region>(`${environment.apiUrl}/Region/Transact`, region);
  }
  GetLookupRegions(): Observable<any>{
    return this._http.get(`${environment.apiUrl}/Region/GetLookupRegions`);
  }
}
