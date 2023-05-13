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
    
    return this.http.get(`${Config.getControllerUrl('Root', 'GetDutyRosterDesignation')}/${hfmisCode}/${hfTypeCode}`);
  }
  public getDivisions() {
    
    return this.http.get(`${Config.getControllerUrl('Root', 'GetDivisions')}`);
  }
  public GetEvents() {
    
    return this.http.get(`${Config.getControllerUrl('Root', 'GetEvents')}`);
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

  public getDistricts(code: string) {

    return this.http.get(`${Config.getControllerUrl('Root', 'GetDistricts')}/${code}`);
  }

  public getTehsils(disCode: string) {
    
    return this.http.get(`${Config.getControllerUrl('Root', 'GetTehsils')}/${disCode}`);
  }
  public getSchools(code: string) {
    
    return this.http.get(`${Config.getControllerUrl('Root', 'GetSchools')}/${code}`);
  }

  public getHFTypes() {

    return this.http.get(`${Config.getControllerUrl('Root', 'GetTypes')}`);
  }

  public getHfList(disCode: string, bhuCode: string, bhuName: string) {
    // 
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
    
    return this.http.get(`${Config.getControllerUrl("Root", "GetEmpDesignationList")}/${id}/${hfmisCode}/${hfTypeCode}`);
  }

  public getHealthFacilityForShift(HfName: any) {
    
    return this.http.get(`${Config.getControllerUrl("Root", "GetHealthFacilityForShift")}/${HfName}`);
  }
  // Need to check this API
  public GetEmplyeeCount(profileFiltersModel) {
    
    return this.http.post<any>(Config.getControllerUrl("Dashboard", "GetEmplyeeCount"), profileFiltersModel,
    )
  }

  public getRegisteredHftypes(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetRegisteredHftypes")}`,obj);
  }
  
  public getPresentHftypes(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetPresentHftypes")}`,obj);
  }
  public getAbsentHftypes(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetAbsentHftypes")}`,obj);
  }
  public getLeaveHftypes(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetLeaveHftypes")}`,obj);
  }
  public getLateHftypes(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetLateHftypes")}`,obj);
  }
  public getAttendanceCountsHFTypeWise(HfmisCode:string){
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetAttendanceCountsHFTypeWise")}/${HfmisCode}`);
  }


  public getCountsHFTypeWise(HfmisCode:string){
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetCountsHFTypeWise")}/${HfmisCode}`);
  }

  // public GetEmployeeCountLoginWise(code:any) {
  //   
  //   return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeeCountLoginWise")}/${code}`);
  // }
  // public GetEmployeeHfTypeCount(code:any) {
  //   
  //   return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeeHfTypeCount")}/${code}`);
  // }
  // public GetEmployeesByDeviceStatus(code:any,status:any) {
  //   
  //   return this.http.get(`${Config.getControllerUrl("Dashboard", "GetDeviceStatus")}/${code}/${status}`);
  // }
  // public GetoverAllCount(code:any) {
  //   
  //   return this.http.get(`${Config.getControllerUrl("Dashboard", "HftypeCount")}/${code}`);
  // }
  // public GetEmployeeWithPercentage(code:any) {
  //   
  //   return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeewithPersentage")}/${code}`);
  // }
  public GetDashboardCount() {
    
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetCounterDashboard")}`);
   
  }
  // public GetDashboardCountDate(DateFrom:any,DateTo:any) {
  //   
  //   return this.http.get(`${Config.getControllerUrl("Dashboard", "GetCounterDashboard")}/${DateFrom}/${DateTo}`);
   
  // }

  public GetDashboardCountDate(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetCounterDashboard")}`,obj);
  }
  public GetMisingToken(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("MissingToken", "GetMisingToken")}`,obj);
  }
  public GetPhysicalDiseasesReport(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Diseases", "GetPhysicalDiseasesReport")}`,obj);
  }
  public GetDentalDiseasesReport(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Diseases", "GetDentalDiseasesReport")}`,obj);
  }
  public GetOphthalmologistDiseasesReport(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Diseases", "GetOphthalmologistDiseasesReport")}`,obj);
  }
  public GetSpeechReport(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Diseases", "GetSpeechReport")}`,obj);
  }
  public GetMentalReport(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Diseases", "GetMentalReport")}`,obj);
  }
  public GetEntReport(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Diseases", "GetEntReport")}`,obj);
  }
  public GetMisingTokenDetail(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("MissingToken", "GetMixingDetailList")}`,obj);
  }
  public GetStudentScreeningReport(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetStudentScreeningReport")}`,obj);
  }
  public GetDetailDashboardList(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetDashboardDetailCount")}`,obj);
  }
  public GetMisingTokenList(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("MissingToken", "GetMisingToken")}`,obj);
  }
  public GetStudentList(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("Dashboard", "GetStudentList")}`,obj);
  }
  public GetMixingStudent(obj:object) {
    
    return this.http.post(`${Config.getControllerUrl("MissingToken", "GetMixingStudentList")}`,obj);
  }
 
  public GetEmployeeCountLoginWise(code: any) {
    // 
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeeCountLoginWise")}/${code}`);
  }
  public GetEmployeeHfTypeCount(code: any) {
    // 
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeeHfTypeCount")}/${code}`);
  }
  public GetEmployeesByDeviceStatus(code: any, status: any) {
    // 
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetDeviceStatus")}/${code}/${status}`);
  }
  public GetoverAllCount(code: any) {
    // 
    return this.http.get(`${Config.getControllerUrl("Dashboard", "HftypeCount")}/${code}`);
  }
  public GetEmployeeWithPercentage(code: any) {
    // 
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeewithPersentage")}/${code}`);
  }
  // 02-01-2023 // Getting Employees counts
  public GetHfDesignationEmployees(HfmisCode: any) {
    // 
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetProfileDetails")}/${HfmisCode}`);
  }
  // 03-01-2023 // Getting Designations counts
  public GetDesignationCountViews(HfmisCode: any, designationId: number) {
    // 
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetDesignationCountViews")}/${HfmisCode}/${designationId}`);
  }

  public GetSpecialDesignationByHfmisCode(hfmisCode: string) {
    return this.http.get(`${Config.getControllerUrl('Root', 'GetSpecialDesignationByHfmisCode')}/${hfmisCode}`);
  }
  public DutyRosterAllHfspecialDesignations(hfmisCode: string) {
    return this.http.get(`${Config.getControllerUrl('Root', 'DutyRosterAllHfspecialDesignations')}/${hfmisCode}`);
  }
  public getDepartments() {
    
    return this.http.get(`${Config.getControllerUrl("Root", "GetDepartments")}`);
  }
  public DutyRosterHasDone(code) {
    
    return this.http.get(`${Config.getControllerUrl("Dashboard", "DutyRosterHasDone")}/${code}`);
  }
  public GetEmplyeesWithDesignations(code) {
    // 
    return this.http.get(`${Config.getControllerUrl("Dashboard", "GetEmployeesDesignationsCount")}/${code}`);
  }
  

  public DutyRosterGetPreDefinedShiftDesignations() {
    // 
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
