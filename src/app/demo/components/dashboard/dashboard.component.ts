import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RootService } from 'src/app/_services/_rootService';
import { EmployeeService } from 'src/app/_services/employee.service';
import { ProfileFiltersModel } from './models/profile-filters-model.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    templateUrl: './dashboard.component.html',
    
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: any;

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    private profileFiltersModel = new ProfileFiltersModel;

    isLoader:boolean=false

    @ViewChild('filter') filter!: ElementRef;

    constructor(
      private rootService: RootService, 
      public layoutService: LayoutService, 
      private _EmployeeService: EmployeeService,
      private spinnerService: NgxSpinnerService
      ) {
    }

    ngOnInit() {
        this.isLoading = true
        
        this.getDivisions();
        var retrievedObject: any = localStorage.getItem('ussr');
        this.user = JSON.parse(retrievedObject);

        console.log("USER :: ",this.user);
        
        console.log("In on init User HFMIS Code",this.user.hfmisCode);
        console.log("In on init Filter Model hFMIS CODE",this.profileFiltersModel.hfmisCode);
        // debugger
        if (this.user.HfmisCode) {
            this.profileFiltersModel.hfmisCode = this.user.HfmisCode
            this.GetEmplyeeCount(this.profileFiltersModel)
          }else{
            this.profileFiltersModel.hfmisCode = "0"
            this.GetEmplyeeCount(this.profileFiltersModel)
          }
        
        
        // Getting Dashboard Values
        this.getEmployeeCount(this.user.HfmisCode)

        this.GetoverAllCount(this.user.HfmisCode);

        // this.GetEmplyeeCount(this.profileFiltersModel) // Table list data

        // Always place this function in the end Because loaded end here!!!
        this.GetEmployeeHfTypeCount(this.user.HfmisCode)
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public user: any = null;
    public HFType: any[] = [];
    public designation: Array<{ Name: string }> = []
    public designationData: any;
    public _designationData: any;
    public filteredDesignation: any[] = [];
    public divisions: Array<{ Name: string, Code: string }> = []
    public divisionsData = { Name: "", Code: "" };
    public districts: Array<{ Name: string, Code: string }> = [];
    public districtsData = { Name: "", Code: "" };
    public tehsils: Array<{ Name: string, Code: string }> = [];
    public tehsilsData = { Name: "", Code: "" };
    public hfTypes: Array<{ Name: string, Code: string }> = [];
    public HfTypesData = { Name: "", Code: "" };
    public EmpList = { hfmisCode: "", month: "", DesignationName: "", hfTypeCode: "" };
    public isShow = false
    public isDisable: boolean = false;
    public healthFacilities: Array<{ Name: string, Code: string, FullName: string }> = [];
    public healthFacilitiesData = { Name: "", Code: "", Hfmiscode: "" };
    public BasicHealthUnit: Array<{ Name: string, Code: string }> = [];
    public BasicHealthUnitType = { Name: "", Code: "" };
    public displayModal: boolean = false;
    public tempHF: string = ""
    public placeHolderDivision = 'Select Division'
    public placeHolderDistrict = 'Select District'
    public placeHolderTehsil = 'Select Tehsil'
    public placeHolderBHU = 'Select Basic Health Unit Type'
    public placeHolderHfType = 'Select HF Type'
    public placeHolderHf = 'Select Health Facility'
    public placeHolderDes = 'Select Designation'
    disableDivnDist:boolean= false
    public isLoading = false
    public totalRec: any = [];
    public morningShiftCount = 1;
    public eveningShiftCount = 1;
    public nightShiftCount = 1;
    // rowGroupMetadata: any; // Extra
    public employeeCountTotal = { TotalCount: 0, RegisterCount: 0, UnRegisterCount: 0 };
    public employeeCountHfType = { tEmployeeBhuSimple: 0, tEmployeeBhuPlus: 0, tEmployeeBhuFull: 0, tEmployeeDhq: 0, tEmployeeThq: 0, tEmployeeRhc: 0, SyncCount:0, UnSyncCount:0 };
    public overAllCount = {dhq:0,thq:0,rhc:0,bhu:0}

    public devicesData = {totalRegisteredDevices:0,totalUnRegisteredDevices:0}

    // Dashboard Total Employee count (hfmisCode) => First Row
    public getEmployeeCount(code: string) {
        this.rootService.GetEmployeeCountLoginWise(code)
          .subscribe((x: any) => {
            if (x) {
            this.employeeCountTotal = x;
            console.log("Dashboard Total Employee count :: ",x);
            
            }
          });
    }
    public GetoverAllCount(code) {
        this.rootService.GetoverAllCount(code)
          .subscribe((x: any) => {
            if (x) {
            this.overAllCount = x;
            console.log("Dashboard Get DHQ, THQ, RHC, BHU count :: ", x);
            
            }
          });
    }

    // Dashboard Count total Employees DHQ, THQ, RHC, BHU => Row 2 & 3
    public GetEmployeeHfTypeCount(code: string) {
        this.rootService.GetEmployeeHfTypeCount(code)
          .subscribe((x: any) => {
            if (x) {
            this.employeeCountHfType = x;
            console.log("Dashboard Employee count By HF Type :: ",x);
            this.isLoading=false
            
            }
          });
    }

    private getDivisions = () => {
        this.rootService.getDivisions().subscribe((res: any) => { 
          this.divisions = res;
          console.log("Printing all divisions :: ",this.divisions);
          if (this.user.DivisionCode != null) {
            this.placeHolderDivision = ''
            this.placeHolderDistrict = ''
              this.divisions = this.divisions.filter(x => x.Code === this.user.DivisionCode);
              this.disableDivnDist = true;
              this.loadDistrict(this.user.DistrictCode)
              if (this.user.TehsilCode != null) {
                this.loadTehsils(this.user.TehsilCode);
              } else {
                this.loadTehsils(this.user.DistrictCode);
              }
          }
          console.log("Printing User divisions :: ",this.divisions);
        },
          err => { this.handleError(err); }
        );
    }

    public loadDistrict(divCode: string) {
        ;
        this.districts = [];
        this.rootService.getDistricts(divCode)
          .subscribe((x: any) => {
            if (x) {
              this.districts = x;
            }
          });
    }

      public loadTehsils(disCode: string) {
        this.tehsils = [];
        this.rootService.getTehsils(disCode)
          .subscribe((x: any) => {
            if (x) {
    
              this.tehsils = x;
            }
          });
      }
      public getHfTypes() {
        this.rootService.getHfTypes().subscribe((res: any) => {
          this.hfTypes = res;
          console.log(this.hfTypes);
        },
          err => { this.handleError(err); }
        );
      }
      private handleError(err: any) {
        if (err.status == 403) {
          console.log(err.message);
          this.isShow = true;
        }
        this.isShow = true;
    
      }
      public getHfList(disCode: string, bhuCode: string, bhuName: string) {

        this.rootService.getHfList(disCode, bhuCode, bhuName).subscribe(
          (res: any) => {
    
            if (res) {
              if (this.isDisable) {
                this.healthFacilities = res;
                this.healthFacilities = this.healthFacilities.filter(x => x.FullName === this.tempHF);
                this.displayModal = true;
                console.log(this.healthFacilities);
              } else {
                this.healthFacilities = res;
              }
            }
          },
          err => {
          }
        );
      }
    
      public getBhuList() {
    
        this.rootService.getBhuList().subscribe(
          (res: any) => {
            if (res) {
    
              this.BasicHealthUnit = res;
              console.log(this.BasicHealthUnit);
            }
          },
          err => {
          }
        );
      }
      public GetEmployeesList(EmpList: object) {
        try {
          this.isLoading = true;
          this._EmployeeService.GetEmployeesList(EmpList).subscribe((res: any) => {
            this.totalRec = res;
            console.log("Total Record :: ",this.totalRec);
            
    
          }),
            err => { this.handleError(err); }
        } catch (error: any) {
          console.log(error.message);
          this.isShow = true;
        }
    
      }
      private getDesignation = (hfmisCode: string,hfTypeCode:string) => {
        this.rootService.getDesignation(hfmisCode,hfTypeCode).subscribe((res: any) => {
          this.morningShiftCount = 1;
          this.eveningShiftCount = 1;
          this.nightShiftCount = 1;
          if (res) {
          this.designation = res;
          console.log("Designation Response :: ",this.designation);
          }
        },
          err => { this.handleError(err); }
        );
      }
 // Getting Data for Table
      private GetEmplyeeCount = (profileFiltersModel) => {
        this.isLoading = true
        this.rootService.GetEmplyeesWithDesignations(this.user.HfmisCode).subscribe((res: any) => {
          if (res) {
            console.log("Get Emplyee List Response :: ",res);
            console.log("Get Emplyee List :: ",res.List);
            this.products = res.List
            this.isLoading = false
          }
        },
          err => { this.handleError(err); }
        );
      }
    // Drop down options
    public dropdownValueChanged = (value, filter) => {
      debugger
        console.log(value);
        if (!value) {
          return;
        }
    
        if (filter == 'Div') {
          this.profileFiltersModel = {}
          this.districts = []
          this.tehsils = []
          this.hfTypes = []
          this.healthFacilities = []
          this.designation = []
          this.products = [];

          this.loadDistrict(value.Code);
          this.EmpList.hfmisCode = value.Code;
          this.profileFiltersModel.DivisionCode=value.Code;
          this.profileFiltersModel.hfmisCode=value.Code;
          this.GetEmplyeeCount(this.profileFiltersModel);
    
        }
        if (filter == 'Dis') {
          this.profileFiltersModel = {}
          this.BasicHealthUnitType = {Name:'null',Code:'null'}
          this.tehsils = []
          this.hfTypes = []
          this.healthFacilities = []
          this.designation = []
          this.products = [];

          this.loadTehsils(value.Code);
          this.EmpList.hfmisCode = value.Code;
          this.profileFiltersModel.DivisionCode=value.Code;
          this.profileFiltersModel.hfmisCode=value.Code;
          this.GetEmplyeeCount(this.profileFiltersModel);
    
        }
        if (filter == 'Teh') {
          this.profileFiltersModel = {}
          this.BasicHealthUnitType = {Name:'null',Code:'null'}
          this.hfTypes = []
          this.healthFacilities = []
          this.designation = []
          this.products = [];

          this.getHfTypes();
          this.EmpList.hfmisCode = value.Code;
            this.profileFiltersModel.hfmisCode = value.Code
          this.GetEmplyeeCount(this.profileFiltersModel);
    
        }
        if (filter === "bhu") {
          this.profileFiltersModel = {}
          this.BasicHealthUnitType = {Name:'null',Code:'null'}
          this.healthFacilities = []
          this.designation = []
          this.products = [];

          if (value.Name === 'Basic Health Unit') {
            this.getBhuList();
            this.EmpList.hfmisCode = this.districtsData.Code;
            this.EmpList.hfTypeCode = value.Code;
          } else {
            this.profileFiltersModel = {}
            this.BasicHealthUnitType = {Name:'null',Code:'null'}
            this.healthFacilities = []
            this.designation = []
            this.products = [];

            this.EmpList.hfmisCode = this.districtsData.Code;
            this.EmpList.hfTypeCode = value.Code;
            this.getHfList(this.tehsilsData.Code, this.HfTypesData.Code, this.BasicHealthUnitType?.Name);
          }
        }
    
        if (filter === 'hft') {
          this.profileFiltersModel = {}
          this.healthFacilities = []
          this.designation = []
          this.products = [];

          if (this.BasicHealthUnitType?.Name == 'BHU 24/7') {
            this.BasicHealthUnitType.Name = 'BHU 24'
          }
          this.getHfList(this.districtsData.Code, this.HfTypesData.Code, this.BasicHealthUnitType?.Name);          
        }
        if (filter === 'hf') {
          this.profileFiltersModel = {}
          this.designation = []
          this.products = [];
          
           this.getDesignation(value.Hfmiscode,value.HftypeCode);
           this.profileFiltersModel.DivisionCode = value.DivisionCode
           this.profileFiltersModel.hfmisCode = value.Hfmiscode
            this.GetEmplyeeCount(this.profileFiltersModel);
    
          //this.EmpList.DesignationName = this.designationData.Name;
    
        //   this.GetEmployeesList(this.EmpList);
        }
        if (filter === 'des') {
           this.profileFiltersModel.hfmisCode = value.HfmisCode
           this.profileFiltersModel.Designation = value.Name
            this.GetEmplyeeCount(this.profileFiltersModel);
        }
    
    
    };

}
