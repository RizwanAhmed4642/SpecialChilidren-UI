import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from "../_helpers/config.class";

@Injectable({
  providedIn: 'root'
})
export class BiomatricRegistrationService {

    constructor(private http: HttpClient) { }

    public GetBioDashboardCounts(hfmisCode:string) {
      debugger
      return this.http.get(`${Config.getControllerUrl("Dashboard", "GetHfDevices")}/${hfmisCode}`);
    }
}
