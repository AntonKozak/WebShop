import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AccountService } from '../services/account/account.service';
import { Observable, take } from 'rxjs';

@Injectable()

export class jwtInterceptor implements HttpInterceptor {
  private accountService = inject(AccountService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`
            }
          })
        }
      }
    });
    return next.handle(req);
  }
};
