import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../_helpers/config.class";

@Injectable({
  providedIn: 'root'
})
export class LeaveApplicationService {

  constructor(
    private http: HttpClient,
  ) { }

  public GetEmployeeByCNIC(Cnic:string) {
    debugger
    
    let a = `${Config.getControllerUrl('DutyRoster', 'GetEmployeeByCNIC')}/${Cnic}`
    return this.http.get(`${Config.getControllerUrl('DutyRoster', 'GetEmployeeByCNIC')}/${Cnic}`);
  }
  public GetLeaveOptions() {
    debugger
    return this.http.get(`${Config.getControllerUrl('DutyRoster', 'GetLeaveOptions')}`);
  }

  public GetLeavePrintDetails(EmpId:number, leaveId:number) {
    debugger
    return this.http.get(`${Config.getControllerUrl('DutyRoster', 'GetLeavePrintDetails')}/${EmpId}/${leaveId}`);
  }
  
  public GetLeavesOfEmployee(Cnic:string) {
    debugger
    
    return this.http.get(`${Config.getControllerUrl('DutyRoster', 'GetLeavesOfEmployee')}/${Cnic}`);
  }

  public SaveEmpLeaveForm(obj : any) {
    debugger
    
    return this.http.post(`${Config.getControllerUrl('DutyRoster', 'SaveEmpLeaveForm')}`, obj );
  }

  public uploadPhoto(obj: any) {
    debugger
    let a = `${Config.getControllerUrl('DutyRoster', 'UploadLeaveAttachment')}/`

    return this.http.post(`${Config.getControllerUrl('DutyRoster', 'UploadLeaveAttachment')}`, obj);
  }

  public GetEmployeesLeavesListByLogin(HfmisCode:string){
    debugger
    return this.http.get(`${Config.getControllerUrl('DutyRoster', 'GetEmployeesLeavesListByLogin')}/${HfmisCode}`);
  }

}

