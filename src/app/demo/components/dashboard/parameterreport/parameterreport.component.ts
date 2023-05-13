
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Product } from '../../../api/product';
import { Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RootService } from 'src/app/_services/_rootService';
import { EmployeeService } from 'src/app/_services/employee.service';
import { ProfileFiltersModel } from '../models/profile-filters-model.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { DashboardDto } from '../models/dashboard-dto';
import { DashboardDetailDto } from '../models/dashboard-detail-dto';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-parameterreport',
  templateUrl: './parameterreport.component.html',
  styleUrls: ['./parameterreport.component.scss'],
    
    providers: [MessageService]
    
})
export class ParameterreportComponent implements OnInit, OnDestroy {
 DateFrom : Date = new Date();
    items!: MenuItem[];

    products!: any;
    DashboardCountList!: any;
    StudentRecordList!: any;
    DashboardCount!: any;
    MisingTokenList!: any;
    code='';
    EventList!: any;
    chartData: any;
    ScreeningTypeId=0;
    chartOptions: any;
    LocationDropdown:any =false;

    subscription!: Subscription;
    public DateForm: FormGroup = new FormGroup({
      Name: new FormControl(''),
      DateFrom: new FormControl(''),
      DateTo: new FormControl(''),
      ScreeningTypeId: new FormControl(0),
   
  
    });

    private profileFiltersModel = new ProfileFiltersModel;
    private dashboardDetailDto = new DashboardDetailDto;
   
    private DashboardDto = new DashboardDto;
    isLoader:boolean=false

    @ViewChild('filter') filter!: ElementRef;

    constructor(
      private rootService: RootService, 
      public layoutService: LayoutService, 
      private _EmployeeService: EmployeeService,
      private spinnerService: NgxSpinnerService,
      private _MessageService: MessageService,
      private datePipe: DatePipe
      ) {
    }

    ngOnInit() {
        this.isLoading = true;
        var retrievedObject: any = localStorage.getItem('ussr');
        this.user = JSON.parse(retrievedObject);
        debugger
        if(this.user.Location ==null || this.user.Location =='' )
        {
          this.LocationDropdown=true;
        }
        else
        {
          this.LocationDropdown=false;
          //this.dashboardDetailDto.location=this.user.Location;
         
          this.DashboardDto.location=this.user.Location;
        }
        // this.GetDashboardCount();
        this.getDivisions();
        // this.GetDashboardCountList(this.dashboardDetailDto);
        this.GetDashboardCountDate(this.DashboardDto);
        this.getEvents();
  
    
    
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public user: any = null;
   
   
    public divisions: Array<{ NAME: string, PKCODE: string }> = []
    public divisionsData = { NAME: "", PKCODE: "" };
    public districts: Array<{ NAME: string, PKCODE: string }> = [];
    public districtsData = { NAME: "", PKCODE: "" };
    public tehsils: Array<{ NAME: string, PKCODE: string }> = [];
    public schools: Array<{ NAME: string, PKCODE: string }> = [];
    public schoolsData = { NAME: "", PKCODE: "" };
    public tehsilsData = { NAME: "", PKCODE: "" }; 
    public displayModal: boolean = false;     
    public isShow: boolean = false;
    
    public placeHolderDivision = 'Select Division'
    public placeHolderDistrict = 'Select District'
    public placeHolderTehsil = 'Select Tehsil'
    public placeHolderBHU = 'Select Basic Health Unit Type'
    public Loader : boolean = false
    disableDivnDist:boolean= false
    public isLoading = false
    public totalRec: any = [];
    public EventData = { Id: 0, Name: "" };
    public placeHolderEvent = 'Select Event'
 
    // rowGroupMetadata: any; // Extra
    public DashBoardCountTotal = { TotalPatientRegistration: 0, TotalPhysicalParameters: 0, TotalDental: 0,TotalOphthalmologist:0,TotalSpeechTherapist:0,TotalENT:0
      , TotalMentalHealth: 0, TodayPatientRegistration: 0,TodayPhysicalParameters:0,TodayDental:0,TodayOphthalmologist:0
      ,TodaySpeechTherapist:0,TodayENT:0,TodayMentalHealth:0
    };
    private getEvents = () => {
      this.rootService.GetEvents().subscribe((res: any) => { 
        debugger
        this.EventList = res;
        console.log("Printing all EventList :: ",this.EventList);
        // if (this.user.DivisionCode != null) {
        //   this.placeHolderDivision = ''
        //   this.placeHolderDistrict = ''
        //     this.divisions = this.divisions.filter(x => x.PKCODE === this.user.DivisionCode);
        //     this.disableDivnDist = true;
        //     this.loadDistrict(this.user.DistrictCode)
        //     if (this.user.TehsilCode != null) {
        //       this.loadTehsils(this.user.TehsilCode);
        //     } else {
        //       this.loadTehsils(this.user.DistrictCode);
        //     }
        // }
        
      },
        err => { this.handleError(err); }
      );
  }



    // Dashboard Total Employee count (hfmisCode) => First Row
    public GetDashboardCount() {
        this.rootService.GetDashboardCount()
          .subscribe((x: any) => {
            if (x) {
              debugger
              // this.DashBoardCountTotal.;
            this.DashBoardCountTotal = x;
            console.log("Dashboard Total Employee count :: ",x);
            
            }
          });
    }
    exportExcelDevices() {
      debugger
      import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(this.DashboardCountList);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, 'MixingListCountList');
      });
    }
  
    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
    exportMisingDetail() {
      debugger
      var obj = {
     
        DateFrom: this.DateForm.value.DateFrom,
        DateTo   : this.DateForm.value.DateTo,
        ScreeningTypeId:this.ScreeningTypeId,
        Location:this.user.Location
        
      }
      this.GetMixingDetailList(obj);

      import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(this.MisingTokenList);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, 'MissingTokenDetail');
      });
    }
    public GetMixingDetailList(object:any) {
      this.isLoading = true;
      debugger
      this.rootService.GetMisingTokenDetail(object)
        .subscribe((x: any) => {
          if (x) {
            debugger
            this.isLoading =false; 
            // this.DashBoardCountTotal.;
          this.MisingTokenList = x;
          console.log("Dashboard Total Employee count :: ",x);
          
          }
        });
  }
  public EventValueChanged = (value) => {
    debugger
    this.ScreeningTypeId=0;
      console.log(value);
      if (!value) {
        return;
      }
      else
      {
        debugger
        this.ScreeningTypeId=value.Id;
       
        var obj = {
     
          DateFrom: this.DateForm.value.DateFrom,
          DateTo   : this.DateForm.value.DateTo,
          ScreeningTypeId:this.ScreeningTypeId,
          Location:this.user.Location
        }
        this.GetDashboardCountDate(obj);
        this.GetDashboardCountList(obj);

      }  
    };
  
   
  
  
    public GetDashboardCountDate(object:any) {
      this.isLoading = true;
      debugger
      this.rootService.GetMisingToken(object)
        .subscribe((x: any) => {
          if (x) {
            debugger
            this.isLoading =false; 
            // this.DashBoardCountTotal.;
          this.DashboardCountList = x;
          console.log("Dashboard Total Employee count :: ",x);
          
          }
        });
  }

  private GetDashboardCountList(object:any)
  { 
   debugger
   this.isLoading = true;
   this.DashboardCountList=[];

   this.rootService.GetMisingTokenList(object).subscribe((res: any) => {
     if (res) {
       console.log("Get  Response :: ",res);

       this.DashboardCountList = res
       this.isLoading = false
     }
   },
     err => { this.handleError(err); }
   );
 }

 public StudentList(event:any,para:any) {
  debugger
  this.displayModal=true;
  this.StudentRecordList=[];
 var obj ={
  SchoolId :event.SchoolId,
  locationId:event.TehsilId,
  Param:para,
  DateFrom: this.DateForm.value.DateFrom,
  DateTo   : this.DateForm.value.DateTo,
  ScreeningTypeId:this.ScreeningTypeId

 }
 this.rootService.GetMixingStudent(obj).subscribe((res: any) => {
  if (res) {
    console.log("Get  Response :: ",res);
    debugger  

    this.StudentRecordList = res
    this.isLoading = false
  }
},
  err => { this.handleError(err); }
);
}
 
  
    private getDivisions = () => {
        this.rootService.getDivisions().subscribe((res: any) => { 
          debugger
          this.divisions = res;
          console.log("Printing all divisions :: ",this.divisions);
          if (this.user.DivisionCode != null) {
            this.placeHolderDivision = ''
            this.placeHolderDistrict = ''
              this.divisions = this.divisions.filter(x => x.PKCODE === this.user.DivisionCode);
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

    SubmitSearch(){
      debugger
      this.Loader = true;
      var dateFrom = new Date(this.DateForm.value.DateFrom);
      var dateTo = new Date(this.DateForm.value.DateTo)
    
      if(dateFrom.getTime() > dateTo.getTime()){
        debugger
        this._MessageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: "Please Enter Correct Dates" });
        return
      }
      else{
      
        var obj = {
     
          DateFrom: this.DateForm.value.DateFrom,
          DateTo   : this.DateForm.value.DateTo,
          ScreeningTypeId:this.ScreeningTypeId,
          Location:this.user.Location


         
        }
        this.GetDashboardCountDate(obj);
     
        
        this.GetDashboardCountList(obj)
       
    
      }
      this.Loader = false;
    }
   

    public loadDistrict(divCode: string) {
        
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
        debugger
        this.rootService.getTehsils(disCode)
          .subscribe((x: any) => {
            if (x) {
    
              this.tehsils = x;
            }
          });
      }
     
      private handleError(err: any) {
        if (err.status == 403) {
          console.log(err.message);
          this.isShow = true;
        }
        this.isShow = true;
    
      }
    
   
      
   
 // Getting Data for Table
 
    
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
          this.code=value.PKCODE
          
       
          this.loadDistrict(value.PKCODE);
          this.dashboardDetailDto.DateFrom=this.DateForm.value.DateFrom;
          this.dashboardDetailDto.DateTo=this.DateForm.value.DateTo;
          this.dashboardDetailDto.location=value.PKCODE;
          
          this.GetDashboardCountList(this.dashboardDetailDto)
         
    
        }
        if (filter == 'Dis') {
          this.profileFiltersModel = {}
          this.code=value.PKCODE
          this.schools = []
    
      
          this.LoadSchool(value.PKCODE);
          this.dashboardDetailDto.DateFrom=this.DateForm.value.DateFrom;
          this.dashboardDetailDto.DateTo=this.DateForm.value.DateTo;
          this.dashboardDetailDto.location=value.PKCODE;
          
          this.GetDashboardCountList(this.dashboardDetailDto)
     
         
    
        }     
    
       
       
    
    
    };
    public LoadSchool(disCode: string) {
      this.schools = [];
      debugger
      this.rootService.getSchools(disCode)
        .subscribe((x: any) => {
          if (x) {
  
            this.schools = x;
          }
        });
    }
  
  
}





