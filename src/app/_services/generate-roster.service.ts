import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../_helpers/config.class";

@Injectable({
  providedIn: 'root'
})
export class GenerateRosterService {

  constructor(
    private http: HttpClient,
  ) { }

  // public SaveDutyRoster( DistrictCode: string, UsersId: string , list : any) {
  //   debugger
  //   // let temp =  `${Config.getControllerUrl("DutyRoster", "SaveDutyRoster")}`
  //   // return this.http.post(
  //   //   `${Config.getControllerUrl("DutyRoster", "SaveDutyRoster")}`, { DistrictCode: DistrictCode, UsersId: UsersId, list:HflistWithMode }
  //   // );
  //   //return this.http.post(`${Config.getControllerUrl('DutyRoster', 'UploadLeaveAttachment')}`, obj);
  //   return this.http.post<any>(`https://localhost:52690/api/DutyRoster/SaveDutyRoster?DistrictCode=${DistrictCode}&UsersId=${UsersId}`, list)
  // }

  public SaveDutyRoster( HfmisCode: string, UserId: string , HflistWithMode : any) {
    debugger
    // let temp =  `${Config.getControllerUrl("DutyRoster", "SaveDutyRoster")}`
    return this.http.post(
      `${Config.getControllerUrl("DutyRoster", "SaveDutyRoster")}/${HfmisCode}/${UserId}`, HflistWithMode
    );
    //return this.http.post<any>(`https://localhost:52690/api/DutyRoster/SaveDutyRoster?DistrictCode=${DistrictCode}&UsersId=${UsersId}`, list)
    
  }
  public GetEmployeesListByHFName(HFName:string){
      debugger
  
      return this.http.get(`${Config.getControllerUrl('DutyRoster', 'GetEmployeesListByHFName')}/${HFName}`);
    
  }
}
