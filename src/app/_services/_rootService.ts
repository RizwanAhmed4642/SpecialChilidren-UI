import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../_helpers/config.class";
@Injectable({
  providedIn: "root"
})
export class RootService {
  constructor(
    private http: HttpClient,
  ) { }

  public getDesignation(hfmisCode: string, hfTypeCode: string) {
    debugger
    return this.http.get(`${Config.getControllerUrl('Root', 'GetDutyRosterDesignation')}/${hfmisCode}/${hfTypeCode}`);
  }
  public getDivisions() {
    return this.http.get(`${Config.getControllerUrl('Root', 'GetDivisions')}`);
  }

  public GetAllShifts() {
    return this.http.get(`${Config.getControllerUrl('Root', 'GetAllShifts')}`);
  }
  public GetAllSpecialDesignations() {
    return this.http.get(`${Config.getControllerUrl('Root', 'GetAllSpecialDesignations')}`);
  }

  public getShiftById(shiftId: any) {
    return this.http.get(`${Config.getControllerUrl('Root', 'GetShiftById')}/${shiftId}`);
  }

  public getDistricts(divCode: string) {

    return this.http.get(`${Config.getControllerUrl('Root', 'GetDistricts')}/${divCode}`);
  }

  public getTehsils(disCode: string) {
    return this.http.get(`${Config.getControllerUrl('Root', 'GetTehsils')}/${disCode}`);
  }

  public getHFTypes() {

    return this.http.get(`${Config.getControllerUrl('Root', 'GetTypes')}`);
  }

  public getHfList(disCode: string, bhuCode: string, bhuName: string) {
    // debugger
    let a = `${Config.getControllerUrl('Root', 'GetServiceListFacility')}/${disCode}/${bhuCode}/${bhuName}`
    if (bhuName === "") {
      bhuName = 'null';
    }
    return this.http.get(`${Config.getControllerUrl('Root', 'GetServiceListFacility')}/${disCode}/${bhuCode}/${bhuName}`);
  }

  public getHfTypes() {
    return this.http.get(`${Config.getControllerUrl('Root', 'GetHfTypes')}`);
  }

  public getBhuList() {
    return this.http.get(`${Config.getControllerUrl('Root', 'GetBhuList')}`);
  }

  public getEmpDesignationList(id: number, hfmisCode: string, hfTypeCode: string) {
    debugger
    return this.http.get(`${Config.getControllerUrl("Root", "GetEmpDesignationList")}/${id}/${hfmisCode}/${hfTypeCode}`);
  }

  public getHealthFacilityForShift(HfName: any) {
    debugger
    return this.http.get(`${Config.getControllerUrl("Root", "GetHealthFacilityForShift")}/${HfName}`);
  }
  // Need to check this API
  public GetEmplyeeCount(profileFiltersModel) {
    debugger
    return this.http.post<any>(Config.getControllerUrl("Dashboard", "GetEmplyeeCount"), profileFiltersModel,
    )
  }

  public getRegisteredHftypes(obj:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetRegisteredHftypes")}`,obj);
  }
  
  public getPresentHftypes(obj:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetPresentHftypes")}`,obj);
  }
  public getAbsentHftypes(obj:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetAbsentHftypes")}`,obj);
  }
  public getLeaveHftypes(obj:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetLeaveHftypes")}`,obj);
  }
  public getLateHftypes(obj:object) {
    debugger
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetLateHftypes")}`,obj);
  }
  public getAttendanceCountsHFTypeWise(HfmisCode:string){
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetAttendanceCountsHFTypeWise")}/${HfmisCode}`);
  }


  public getCountsHFTypeWise(HfmisCode:string){
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetCountsHFTypeWise")}/${HfmisCode}`);
  }

  // public GetEmployeeCountLoginWise(code:any) {
  //   debugger
  //   return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeeCountLoginWise")}/${code}`);
  // }
  // public GetEmployeeHfTypeCount(code:any) {
  //   debugger
  //   return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeeHfTypeCount")}/${code}`);
  // }
  // public GetEmployeesByDeviceStatus(code:any,status:any) {
  //   debugger
  //   return this.http.get(`${Config.getControllerUrl("Dashboard", "GetDeviceStatus")}/${code}/${status}`);
  // }
  // public GetoverAllCount(code:any) {
  //   debugger
  //   return this.http.get(`${Config.getControllerUrl("Dashboard", "HftypeCount")}/${code}`);
  // }
  // public GetEmployeeWithPercentage(code:any) {
  //   debugger
  //   return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeewithPersentage")}/${code}`);
  // }
  public GetEmployeeCountLoginWise(code: any) {
    // debugger
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeeCountLoginWise")}/${code}`);
  }
  public GetEmployeeHfTypeCount(code: any) {
    // debugger
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeeHfTypeCount")}/${code}`);
  }
  public GetEmployeesByDeviceStatus(code: any, status: any) {
    // debugger
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetDeviceStatus")}/${code}/${status}`);
  }
  public GetoverAllCount(code: any) {
    // debugger
    return this.http.get(`${Config.getControllerUrl("Dashboard", "HftypeCount")}/${code}`);
  }
  public GetEmployeeWithPercentage(code: any) {
    // debugger
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeewithPersentage")}/${code}`);
  }
  // 02-01-2023 // Getting Employees counts
  public GetHfDesignationEmployees(HfmisCode: any) {
    // debugger
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetProfileDetails")}/${HfmisCode}`);
  }
  // 03-01-2023 // Getting Designations counts
  public GetDesignationCountViews(HfmisCode: any, designationId: number) {
    // debugger
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetDesignationCountViews")}/${HfmisCode}/${designationId}`);
  }

  public GetSpecialDesignationByHfmisCode(hfmisCode: string) {
    return this.http.get(`${Config.getControllerUrl('Root', 'GetSpecialDesignationByHfmisCode')}/${hfmisCode}`);
  }
  public DutyRosterAllHfspecialDesignations(hfmisCode: string) {
    return this.http.get(`${Config.getControllerUrl('Root', 'DutyRosterAllHfspecialDesignations')}/${hfmisCode}`);
  }
  public getDepartments() {
    debugger
    return this.http.get(`${Config.getControllerUrl("Root", "GetDepartments")}`);
  }
  public DutyRosterHasDone(code) {
    debugger
    return this.http.get(`${Config.getControllerUrl("Dashboard", "DutyRosterHasDone")}/${code}`);
  }
  public GetEmplyeesWithDesignations(code) {
    // debugger
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeesDesignationsCount")}/${code}`);
  }

  public DutyRosterGetPreDefinedShiftDesignations() {
    // debugger
    return this.http.get(`${Config.getControllerUrl("Root", "DutyRosterGetPreDefinedShiftDesignations")}`);
  }

  public getHrDesignation(HfmisCode: string) {
    return this.http.get(`${Config.getControllerUrl("Root", "GetHrDesignation")}/${HfmisCode}`);
  }
  
  public getAttendanceReportCounts(HfmisCode: string) {
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetAttendanceReportCounts")}/${HfmisCode}`);
  }

  public getDataAttendanceReport(obj:object) {
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetDataAttendanceReport")}`,obj);
  }
}
