import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../_helpers/config.class";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
  ) { }

  public GetEmployeesList(EmpList:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "GetEmployeesList")}`,EmpList);
  }

  public AddEmployeeShift(EmpObject:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "AddEmployeeShift")}`,EmpObject);
  }
  
  public addNewShift(newShiftDetails:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "AddNewShift")}`,newShiftDetails);
  }
  
  public addDutyRosterDesgnationShift(dutyRosterShift:any) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "AddDutyRosterDesgnationShift")}`,dutyRosterShift);
  }
  public GetEmployeesListForRHCManageShift(EmpList:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "GetEmployeesListForRHCManageShift")}`,EmpList);
  }
  public GetEmployeesListForBhuManageShift(EmpList:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "GetEmployeesListForBhuManageShift")}`,EmpList);
  }
  public EmployeeListForManageBhuShiftsView(EmpList:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "EmployeeListForManageBhuShiftsView")}`,EmpList);
  }
  public getSpecialDesgnationById(HfmisCode: string, designationId: number) {
    return this.http.get(`${Config.getControllerUrl('DutyRoster', 'GetSpecialDesgnationById')}/${HfmisCode}/${designationId}`);
  }
  //EmployeeListForManageBhuShiftsView
  public savePublicHoliday(holidayObj:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "savePublicHoliday")}`,holidayObj);
  }

  
  public getUperLevelDesignations(Hfmiscode:string) {
    debugger
    return this.http.get(`${Config.getControllerUrl("Root", "GetUperLevelDesignations")}/${Hfmiscode}`);
  }
  public GetEmployeesToAssignRHCDepartment(RHCList:object) {
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "GetEmployeesToAssignRHCDepartment")}`,RHCList);
  }
  public AssignDepartmentToRHCEmp(DeptList:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "AssignDepartmentToEmployees")}`,DeptList);
  }
  public RegisteredDevices(obj:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "RegisteredDevices")}`,obj);
  }
  public getRegistredDevices(HfmisCode:string) {
    debugger
    return this.http.get(`${Config.getControllerUrl("DutyRoster", "GetRegistredDevices")}/${HfmisCode}`);
  }
  
  public deleteImei(Id:number) {
    debugger
    return this.http.delete(`${Config.getControllerUrl("DutyRoster", "DeleteImei")}/${Id}`);
  }
  
  public deletePreDefineDepartment(Id:number) {
    debugger
    return this.http.delete(`${Config.getControllerUrl("DutyRoster", "DeletePreDefineDepartment")}/${Id}`);
  }

  public saveDutyRosterPreDefinedShift(obj:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "SaveDutyRosterPreDefinedShift")}`,obj);
  }

  public saveDutyRosterPreDefinedDepartment(obj:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "SaveDutyRosterPreDefinedDepartment")}`,obj);
  }

  //========= Shift Edit Services ========//
  public GetEmployeesListForEditBhuShift(EmpList:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "GetEmployeesListForEditBhuShift")}`,EmpList);
  }
  public EditEmployeeShift(EmpObject:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "EditEmployeeShift")}`,EmpObject);
  }

  public getPredefinedShiftDesgnations(hfmisCode:string){
    return this.http.get(`${Config.getControllerUrl("DutyRoster", "GetPredefinedShiftDesgnations")}/${hfmisCode}`);
  }
  public getSavedPreDefinedDepartments(HfmisCode:string){
    return this.http.get(`${Config.getControllerUrl("DutyRoster", "GetSavedPreDefinedDepartments")}/${HfmisCode}`);
  }

  public saveDepartment(departmentData:object){
    return this.http.post(`${Config.getControllerUrl("DutyRoster", "SaveDepartment")}`,departmentData);
  }
}
