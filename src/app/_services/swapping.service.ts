import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../_helpers/config.class";

@Injectable({
  providedIn: 'root'
})
export class SwappingService {

  constructor(
    private http: HttpClient,
  ) { }

  public GetSwappingFromDetails(CNIC:string) {
    debugger
    let a = `${Config.getControllerUrl('DutyRoster', 'GetSwappingFromDetails')}/${CNIC}`
    return this.http.get(`${Config.getControllerUrl('DutyRoster', 'GetSwappingFromDetails')}/${CNIC}`);
  }

  public GetSwappingTODetails(obj : any) {
    debugger
    
    return this.http.post(`${Config.getControllerUrl('DutyRoster', 'GetSwappingTODetails')}`, obj );
  }

  public SaveSwappingForm(obj : any) {
    debugger
    
    return this.http.post(`${Config.getControllerUrl('DutyRoster', 'SaveSwappingForm')}`, obj );
  }

  public GetSwappedListByLogin(HfmisCode:string){
    debugger
    return this.http.get(`${Config.getControllerUrl('DutyRoster', 'GetSwappedListByLogin')}/${HfmisCode}`);
  }
}
