import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlowRegistrationStep } from '@core/types';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { ChildData, LookupRequest, Draft, GuardianData, LoadDraftRequest } from './flow.model';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(private _http: HttpClient) { }
  private _draftLoadEvent: Subject<number> = new Subject<number>();
  private _saveAndClearEvent: Subject<void> = new Subject();
  get draftLoadEvent$(){
    return this._draftLoadEvent.asObservable();
  }
  draftLoadEvent(draftId: number){
    this._draftLoadEvent.next(draftId);
  }
  get saveAndClearEvent$(){
    return this._saveAndClearEvent.asObservable();
  }
  saveAndClear(){
    this._saveAndClearEvent.next();
  }
  getDraftList(sdpId: number): Observable<Draft[]>{
    return this._http.get<Draft[]>(`${environment.apiUrl}/flow/getFlowRegistrationDraftList?sdpId=${sdpId}`);
  }
  getSelectedSdp(): Observable<string> {
    return this._http.get(`${environment.apiUrl}/flow/getSdpContext`, {responseType: 'text'});
  }
  setSelectedSdp(sdpId: number): Observable<any> {
    return this._http.post(`${environment.apiUrl}/flow/setSdpContext`, { sdpId },{responseType: 'text'})
  }
  draftFlowRegistration(serializedFormData: string, sdpId: number, draftId: number,flowRegistrationStep: number): Observable<number>{
    return this._http.post<number>(`${environment.apiUrl}/flow/draftFlowRegistration`, {serializedFormData, sdpId, draftId, flowRegistrationStep})
  }

  getFlowRegistrationDraft(flowRegistrationStep: number, sdpId: number = undefined, draftId: number = undefined): Observable<string> {
    let params = {} as LoadDraftRequest;
    params.flowRegistrationStep = flowRegistrationStep;
    if(sdpId){
      params.sdpId = sdpId;
    }
    if(draftId){
      params.draftId = draftId;
    }
    return this._http.get(`${environment.apiUrl}/flow/getFlowRegistrationDraft`,  { params: (params as any), responseType: 'text'})
  }

  submitDraft(draftId: number){
    return this._http.post(`${environment.apiUrl}/flow/submitDraft`, { draftId });
  }

  lookupChildren(params: LookupRequest): Observable<ChildData[]> {
    return this._http.get<ChildData[]>(`${environment.apiUrl}/flow/LookupChildren`, { params: (params as any) })
  }

  lookupGuardians(params: LookupRequest): Observable<GuardianData[]> {
    return this._http.get<GuardianData[]>(`${environment.apiUrl}/flow/LookupGuardians`, { params: (params as any) })
  }
}
