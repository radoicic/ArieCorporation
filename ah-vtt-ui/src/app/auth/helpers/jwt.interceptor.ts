import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { SessionService } from '../service/session.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _sessionService: SessionService) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var jwt = this._sessionService.getToken();
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (jwt && isApiUrl) {
      if(request.body instanceof FormData){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${jwt}`,
            'Access-Control-Allow-Origin': '*' 
            /*
             Required Content-Type is multipart/form-data in this case.
             But this header, and the Boundary, must be set by Angular during the call, not tampered with before
            */
          },
        });
      }
      else{
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${jwt}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
