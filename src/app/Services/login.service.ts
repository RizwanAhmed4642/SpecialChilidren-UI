import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

// import { Config } from '../_helpers/config.class';

import { catchError, finalize, map, Observable, tap, throwError } from 'rxjs';
import { LocalService } from './local.service';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';
import { Config } from "../_helpers/config.class";


@Injectable({
  providedIn: 'root'
})

export class LoginService  {

  constructor(private http: HttpClient,
    private _localService: LocalService,
    private _cookieService: CookieService,
    private router: Router
    ) { }
 
  login(signInDto): Observable<any> {
    debugger
   return this.http.get(`${Config.getControllerUrl('Auth', 'Login')}/${signInDto.username}/${signInDto.password}`);
  // return this.http.post('http://localhost:6854/api/token', 'username=' + signInDto.username + '&password=' + signInDto.password + '&grant_type=password')
  // .pipe(map((data: any) => data))
  // .pipe(
  //   map(
  //     (data: any) =>
  //     ({

  //       result: data.data,

  //     } as any)
  //   )
  // )
  // .pipe((data: any) => data);
   // return this.http.get(`${Config.getServerUrl()}/Account/simple`);
  }

  public setUser(_: any): boolean {
    let user = _.user,
      token = _.access_token;
    if (token !== '') {
      debugger
      this._cookieService.deleteAndSetCookie('token', token);
      user.HfmisCode = (user.HfmisCode ?
        user.HfmisCode : user.TehsilCode ?
          user.TehsilCode : user.DistrictCode ?
            user.DistrictCode : user.DivisionCode ?
              user.DivisionCode : '0');
      this._localService.set('ussr', user);
      localStorage.setItem('token', token);
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  public getUser() {
    return this._localService.get('ussr');
  }

  public getUserHfmisCode() {
    // return this.getUser().HfmisCode;
  }
  logout() {
    this._cookieService.deleteCookie('ussr');
    this._localService.set('ussr', null);
    this.router.navigate(['/auth/login']);
  }
}
