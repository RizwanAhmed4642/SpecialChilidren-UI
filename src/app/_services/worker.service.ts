import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../_helpers/config.class";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(
    private http: HttpClient,
  ) { }

  public AllEmpDutyRoasterList(empRoaster:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "AllEmpDutyRoasterList")}`,empRoaster);
  }
}
