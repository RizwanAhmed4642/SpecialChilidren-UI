import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../_helpers/config.class";

@Injectable({
  providedIn: 'root'
})
export class SpecialShiftsService {

  constructor(
    private http: HttpClient,
  ) { }

  public DutyRosterDesignationCountForSpecialManageBhuShift(EmpList:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "DutyRosterDesignationCountForSpecialManageBhuShift")}`,EmpList);
  }
  public DutyRosterDesignationCountForSpecialManageRhcShift(EmpList:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "DutyRosterDesignationCountForSpecialManageRhcShift")}`,EmpList);
  }

  public GetSpecialShiftEmployeeList(EmpList:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "GetSpecialShiftEmployeeList")}`,EmpList);
  }

  // public GetSpecialDesignationByHfmisCode(hfmiscode:string) {
  //   debugger
  //   return this.http.post(`${Config.getControllerUrl("DutyRoster", "GetSpecialDesignationByHfmisCode")}`,hfmiscode);
  // }

  // public GetAllSpecialDesignations() {
  //   debugger
  //   return this.http.get(`${Config.getControllerUrl('Root', 'GetAllSpecialDesignations')}`);
  // }

  public AddBHUSpecialEmployeeShift(EmpObject:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "AddEmployeeShift")}`,EmpObject);
  }

  public GetAllShiftTimesByHfmis(HfmisCode: string) {
    debugger
    return this.http.get(`${Config.getControllerUrl('Root', 'GetAllShiftTimesByHfmis')}/${HfmisCode}`);
  }
  public DutyRosterAllHfspecialDesignations(HfmisCode: string) {
    debugger
    return this.http.get(`${Config.getControllerUrl('Root', 'DutyRosterAllHfspecialDesignations')}/${HfmisCode}`);
  }
  
  public AddNewSpecialShift(AddNewSpecialShiftForm: object){
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "AddSpecialDesignation")}`,AddNewSpecialShiftForm);
  }
  
}