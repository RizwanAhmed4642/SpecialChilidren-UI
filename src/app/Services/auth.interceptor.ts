import { HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../Services/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {LoadingServiceService} from './loading-service.service'

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private loadingService: LoadingServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.spinnerService.show();
    this.loadingService.setLoading(true);
    let authReq = req;
    // const token = this.token.getToken();
    const token = localStorage.getItem("token")
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      // this.spinnerService.hide();
    }
    return next.handle(authReq)
    .pipe(tap(async (event: HttpEvent < any > ) => {
      if (event instanceof HttpResponse) {
    
        this.loadingService.setLoading(false);
      }
  },
  (err: any) => {
    // this.spinnerService.hide();
    this.loadingService.setLoading(false);

  }));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    // navigate to login page as user is not authenticated      
    this.router.navigate(['auth/login']);
    return false;
  }

  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('ussr')) {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }
}
  
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
