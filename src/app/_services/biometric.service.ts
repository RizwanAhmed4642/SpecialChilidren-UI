import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../_helpers/config.class";

@Injectable({
  providedIn: 'root'
})
export class BiometricService {

  constructor(
    private http: HttpClient,
  ) { }

  public GetEmployeeBioMetric(Cnic:string) {
    debugger
    
    return this.http.get(`${Config.getControllerUrl('DutyRoster', 'GetEmployeeBioMetric')}/${Cnic}`);
  }
}
