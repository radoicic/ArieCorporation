import { Injectable } from '@angular/core';
import { LoggedInResponse } from 'app/main/authentication/models/authentication-models';
import { Observable, Subject } from 'rxjs';
import { Session } from '../models/session.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  private _sessionStart: Subject<Session> = new Subject<Session>();

  sessionStart$():Observable<Session>{
    return this._sessionStart.asObservable();
  }

  beginSession(loggedInResponse: LoggedInResponse){
    this.endSession();
    const session: Session = {
      jwt: loggedInResponse.token,
      email: loggedInResponse.claims.email,
      userId: loggedInResponse.claims.userId,
      userModuleAccessViews: loggedInResponse.claims.userModuleAccessViews,
      userRegionAssignments: loggedInResponse.claims.userRegionAssignments
    };
    localStorage.setItem('jwt', session.jwt);
    localStorage.setItem('email', session.email);
    localStorage.setItem('userId', session.userId);
    localStorage.setItem('userModuleAccessViews', JSON.stringify(session.userModuleAccessViews));
    localStorage.setItem('userRegionAssignments', JSON.stringify(session.userRegionAssignments));
    this._sessionStart.next(session);
  }

  endSession(){
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  getClaim(claim: string): string {
    return localStorage.getItem(claim); // TO-DO: Consider parsing
  }
}
