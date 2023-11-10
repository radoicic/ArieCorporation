import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { LoggedInResponse } from 'app/main/authentication/models/authentication-models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  /**
   *
   * @param {HttpClient} _http

   */
  constructor(private _http: HttpClient) {
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string, otp: string = ''): Observable<LoggedInResponse> {
    return this._http.post<LoggedInResponse>(`${environment.apiUrl}/Auth/Login`, { email, password, otp })
  }

  beginPasswordReset(email: string): Observable<any> {
    return this._http.post(`${environment.apiUrl}/Auth/InitiatePasswordReset`, { email }, {responseType: 'text'})
  }

  processPasswordReset(email: string, password: string, code: string): Observable<any> {
    return this._http.post(`${environment.apiUrl}/Auth/ResetPassword`, { email, password, code }, {responseType: 'text'})
  }
}
