// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../../../_helpers/config.class';


// @Injectable()
export class AuthServiceService {
 
  constructor(private http: HttpClient  ) { }
  login(userName :string,password :string) {
    debugger
    return this.http.post(`${Config.getServerUrl()}/Token`, 'username=' + userName + '&password=' + password + '&grant_type=password');
  }
}
