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
  selector: 'app-diseases-report',
  templateUrl: './diseases-report.component.html',
  styleUrls: ['./diseases-report.component.scss'],
    
    providers: [MessageService]
    
})
export class DiseasesReportComponent implements OnInit, OnDestroy {
 DateFrom : Date = new Date();
    items!: MenuItem[];
    EventList!: any;
    LocationDropdown:any =false;
    ScreenTypeDropdown:any =false;
    products!: any;
    DashboardCountList!: any;
    StudentRecordList!: any;
    Report!: any;
    DashboardCount!: any;
    MisingTokenList!: any;
    PhysicalList!: any;
    DentalList!: any;
    OphthalmologistList!: any;
    SpeechList!: any;
    EntList!: any;
    MentalList!: any;
    code='';
    chartData: any;
    chartOptions: any;
    ScreeningTypeId=0;
    public EventData = { Id: 0, Name: "" };
    subscription!: Subscription;
    public DateForm: FormGroup = new FormGroup({
      Name: new FormControl(''),
      DateFrom: new FormControl(''),
      DateTo: new FormControl(''),
   
  
    });
    public user: any = null;
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
        // this.GetDashboardCount();
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
          this.dashboardDetailDto.location=this.user.Location;
         
          this.DashboardDto.location=this.user.Location;
        }
        if(this.user.FullName=='Special Children Dashboard')
        {
          this.ScreenTypeDropdown=false;
          this.dashboardDetailDto.ScreeningTypeId=1;
         
          this.DashboardDto.ScreeningTypeId=1;
        }
        else
        {
          this.ScreenTypeDropdown=true;
       
        }
        this.getDivisions();
        // this.GetDashboardCountList(this.dashboardDetailDto);
        this.GetDashboardCountDate(this.DashboardDto)
        this.GetPhysicalDiseasesReport(this.DashboardDto)
        this.GetDentalDiseasesReport(this.DashboardDto)
        this.GetOphthalmologistDiseasesReport(this.DashboardDto)
        this.GetSpeechReport(this.DashboardDto)
        this.GetEntReport(this.DashboardDto)
        this.GetMentalReport(this.DashboardDto)
        this.getEvents();


        // this.getDivisions();
        // var retrievedObject: any = localStorage.getItem('ussr');
        // this.user = JSON.parse(retrievedObject);

        // console.log("USER :: ",this.user);
        
        // console.log("In on init User HFMIS Code",this.user.hfmisCode);
        // console.log("In on init Filter Model hFMIS CODE",this.profileFiltersModel.hfmisCode);
        // // debugger
        // if (this.user.HfmisCode) {
        //     this.profileFiltersModel.hfmisCode = this.user.HfmisCode
        //     this.GetEmplyeeCount(this.profileFiltersModel)
        //   }else{
        //     this.profileFiltersModel.hfmisCode = "0"
        //     this.GetEmplyeeCount(this.profileFiltersModel)
        //   }
        
        
        // Getting Dashboard Values
  

        

        // this.GetEmplyeeCount(this.profileFiltersModel) // Table list data

        // Always place this function in the end Because loaded end here!!!
    
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


   
   
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
        this.GetPhysicalDiseasesReport(obj);
        this.GetDentalDiseasesReport(obj);
        this.GetOphthalmologistDiseasesReport(obj);
        this.GetSpeechReport(obj);
        this.GetEntReport(obj);
        this.GetMentalReport(obj);


      }  
    };

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
          this.saveAsExcelFile(excelBuffer, 'DevicesList');
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
public GetPhysicalDiseasesReport (object:any) {
    this.isLoading = true;
    this.PhysicalList =[];
    debugger
    this.rootService.GetPhysicalDiseasesReport(object)
      .subscribe((x: any) => {
        if (x) {
          debugger
          this.isLoading =false; 
          // this.DashBoardCountTotal.;
        this.PhysicalList = x;
        console.log("Dashboard Total Employee count :: ",x);
        
        }
      });
}
public GetDentalDiseasesReport (object:any) {
  this.isLoading = true;
  debugger
  this.rootService.GetDentalDiseasesReport(object)
    .subscribe((x: any) => {
      if (x) {
        debugger
        this.isLoading =false; 
        // this.DashBoardCountTotal.;
      this.DentalList = x;
      console.log("Dashboard Total Employee count :: ",x);
      
      }
    });
}
public GetOphthalmologistDiseasesReport (object:any) {
  this.isLoading = true;
  debugger
  this.rootService.GetOphthalmologistDiseasesReport(object)
    .subscribe((x: any) => {
      if (x) {
        debugger
        this.isLoading =false; 
        // this.DashBoardCountTotal.;
      this.OphthalmologistList = x;
      console.log("Dashboard Total Employee count :: ",x);
      
      }
    });
}
public GetSpeechReport (object:any) {
  this.isLoading = true;
  debugger
  this.rootService.GetSpeechReport(object)
    .subscribe((x: any) => {
      if (x) {
        debugger
        this.isLoading =false; 
        // this.DashBoardCountTotal.;
      this.SpeechList = x;
      console.log("Dashboard Total Employee count :: ",x);
      
      }
    });
}
public GetEntReport (object:any) {
  this.isLoading = true;
  debugger
  this.rootService.GetEntReport(object)
    .subscribe((x: any) => {
      if (x) {
        debugger
        this.isLoading =false; 
        // this.DashBoardCountTotal.;
      this.EntList = x;
      console.log("Dashboard Total Employee count :: ",x);
      
      }
    });
}
public GetMentalReport (object:any) {
  this.isLoading = true;
  debugger
  this.rootService.GetMentalReport(object)
    .subscribe((x: any) => {
      if (x) {
        debugger
        this.isLoading =false; 
        // this.DashBoardCountTotal.;
      this.MentalList = x;
      console.log("Dashboard Total Employee count :: ",x);
      
      }
    });
}
  
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
  Param:para

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
      
        if(this.user.FullName=='Special Children Dashboard')
        {
                  
          this.ScreeningTypeId=1;
        }
        var obj = {
     
          DateFrom: this.DateForm.value.DateFrom,
          DateTo   : this.DateForm.value.DateTo,
          ScreeningTypeId:this.ScreeningTypeId,
          Location:this.user.Location
         
        }
        this.GetDashboardCountDate(obj)
        this.GetPhysicalDiseasesReport(obj)
        this.GetDentalDiseasesReport(obj)
        this.GetOphthalmologistDiseasesReport(obj)
        this.GetSpeechReport(obj)
        this.GetEntReport(obj)
        this.GetMentalReport(obj)
       
    
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
          
       
          this.GetDashboardCountDate( this.dashboardDetailDto)
          this.GetPhysicalDiseasesReport( this.dashboardDetailDto)
          this.GetDentalDiseasesReport( this.dashboardDetailDto)
          this.GetOphthalmologistDiseasesReport( this.dashboardDetailDto)
          this.GetSpeechReport( this.dashboardDetailDto)
          this.GetEntReport( this.dashboardDetailDto)
          this.GetMentalReport( this.dashboardDetailDto)
         
    
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
    exportExcelReport(ReportType:any )
     {
      debugger
      this.Report=[];
      if(ReportType=='PhysicalAssessmentReport')
        {
          this.Report=this.PhysicalList;
        }
        else if(ReportType==='DentalAssessmentReport')
        {
          this.Report=this.DentalList;
        }
        else if(ReportType==='VisualAssessmentReport')
        {
          this.Report=this.OphthalmologistList;
        }
        else if(ReportType==='SpeechAssessmentReport')
        {
          this.Report=this.SpeechList;
        }
        else if(ReportType==='HearingAssessmentReport')
        {
          this.Report=this.EntList;
        }
        else if(ReportType=='MentalAssessmentReport')
        {
          this.Report=this.MentalList;
        }
      import('xlsx').then((xlsx) => {        
         const worksheet = xlsx.utils.json_to_sheet(this.Report);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsReport(excelBuffer, ReportType);
      });
    }
  
    saveAsReport(buffer: any, fileName: string): void {
      debugger
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
  
}












