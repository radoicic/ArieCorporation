import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../service/session.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _route: ActivatedRoute, private _sessionService: SessionService, private _toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 && !['AuthLoginComponent', 'AuthForgotPasswordComponent'].includes(this._route.firstChild.component.name)) {
          this._router.navigate(['/authentication/login']);
          this._sessionService.endSession();
        }
        else if(err.status === 403){
          this._toastr.error('Access denied')
        }
        return throwError(err);
      })
    );
  }
}
