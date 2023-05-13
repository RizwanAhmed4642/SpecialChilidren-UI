import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import {LoadingServiceService} from './loading-service.service'

@Injectable()
export class LoadingInterceptorInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingServiceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.loadingService.setLoading(true);

    return next.handle(request)
    .pipe(tap(async (event: HttpEvent < any > ) => {
      if (event instanceof HttpResponse) {
      
        this.loadingService.setLoading(false)
      }
  },
  (err: any) => {
    this.loadingService.setLoading(false)

  }));
  }
}
