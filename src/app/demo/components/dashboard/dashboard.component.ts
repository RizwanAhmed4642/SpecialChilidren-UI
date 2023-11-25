import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';


import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RootService } from 'src/app/_services/_rootService';
import { EmployeeService } from 'src/app/_services/employee.service';
import { ProfileFiltersModel } from './models/profile-filters-model.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { DashboardDto } from './models/dashboard-dto';
import { DashboardDetailDto } from './models/dashboard-detail-dto';
import * as FileSaver from 'file-saver';
import { LoadingServiceService } from 'src/app/Services/loading-service.service';


@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush
    
})
export class DashboardComponent implements OnInit, OnDestroy {
 DateFrom : Date = new Date();
    items!: MenuItem[];
    ScreeningTypeId=0;
    products!: any;
    DashboardCountList!: any;
    StudentRecordList!: any;
    DashboardCount!: any;
    RegisterStudentReport!: any;
    EventList!: any;
    code='';

    LocationDropdown:any =false;
   ScreenTypeDropdown:any =false;

    chartData: any;

    chartOptions: any;

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
      private datePipe: DatePipe,
      public loadingService: LoadingServiceService
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
        // this.GetDashboardCount();
         this.getDivisions();
        this.GetDashboardCountList(this.dashboardDetailDto);
        this.GetDashboardCountDate(this.DashboardDto);
        this.GetStudentScreeningReport(this.DashboardDto);
        this.getEvents();
       
       

         console.log("USER :: ",this.user);
        
        // console.log("In on init User HFMIS Code",this.user.hfmisCode);
        // console.log("In on init Filter Model hFMIS CODE",this.profileFiltersModel.hfmisCode);
        // // 
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

    public user: any = null;
   
   
    public divisions: Array<{ NAME: string, PKCODE: string,CODE :string }> = []
    public divisionsData = { NAME: "", PKCODE: "" };
    public districts: Array<{ NAME: string, PKCODE: string }> = [];
    public districtsData = { NAME: "", PKCODE: "" };
    public tehsils: Array<{ NAME: string, PKCODE: string }> = [];
    public schools: Array<{ NAME: string, PKCODE: string }> = [];
    public schoolsData = { NAME: "", PKCODE: "" };
    public tehsilsData = { NAME: "", PKCODE: "" };
    public EventData = { Id: 0, Name: "" };


 
    public displayModal: boolean = false;     
    public isShow: boolean = false;
    public Loader : boolean = false

    public placeHolderDivision = 'Select Division'
    public placeHolderEvent = 'Select Event'
    public placeHolderDistrict = 'Select District'
    public placeHolderTehsil = 'Select Tehsil'
    public placeHolderBHU = 'Select Basic Health Unit Type'

    disableDivnDist:boolean= false
    public isLoading = false
    public totalRec: any = [];
 
    // rowGroupMetadata: any; // Extra
    public DashBoardCountTotal = { TotalPatientRegistration: 0, TotalPhysicalParameters: 0, TotalDental: 0,TotalOphthalmologist:0,TotalSpeechTherapist:0,TotalENT:0
      , TotalMentalHealth: 0, TodayPatientRegistration: 0,TodayPhysicalParameters:0,TodayDental:0,TodayOphthalmologist:0
      ,TodaySpeechTherapist:0,TodayENT:0,TodayMentalHealth:0
    };
  


    // Dashboard Total Employee count (hfmisCode) => First Row
    public GetDashboardCount() {
        this.rootService.GetDashboardCount()
          .subscribe((x: any) => {
            if (x) {
              
              // this.DashBoardCountTotal.;
            this.DashBoardCountTotal = x;
            console.log("Dashboard Total Employee count :: ",x);
            
            }
          });
    }
    public GetDashboardCountDate(object:any) {
   
      
      this.rootService.GetDashboardCountDate(object)
        .subscribe((x: any) => {
          if (x) {
            
        
            // this.DashBoardCountTotal.;
          this.DashBoardCountTotal = x;
          console.log("Dashboard Total Employee count :: ",x);
          
          }
        });
  }

  private GetDashboardCountList(object:any)
  {
   
  debugger
  
  if(this.user.Location!=null ||this.user.Location!='')
  {
    object.Location=this.user.Location;
  }
   this.DashboardCountList=[];

   this.rootService.GetDetailDashboardList(object).subscribe((res: any) => {
     if (res) {
       console.log("Get  Response :: ",res);

       this.DashboardCountList = res
     
     }
   },
     err => { this.handleError(err); }
   );
 }
 exportCountScreeningReport() {
  
  var obj = {
 
    DateFrom: this.DateForm.value.DateFrom,
    DateTo   : this.DateForm.value.DateTo,
   
  }


  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.DashboardCountList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'Screening Report');
  });
}
 exportStudentScreeningReport() {

  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.RegisterStudentReport);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFileScreeningReport(excelBuffer, 'Student Detail Report');
  });
}
saveAsExcelFileScreeningReport(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
public GetStudentScreeningReport(object:any) {
  
  this.rootService.GetStudentScreeningReport(object)
    .subscribe((x: any) => {
      if (x) {
        
        // this.DashBoardCountTotal.;
      this.RegisterStudentReport = x;
      console.log("Register Student Report  :: ",x);
      
      }
    });
}

 public StudentList(event:any,para:any) {
  
  this.displayModal=true;
  this.StudentRecordList=[];
 var obj ={
  SchoolId :event.SchoolId,
  locationId:event.TehsilId,
  DateFrom: this.DateForm.value.DateFrom,
  DateTo   : this.DateForm.value.DateTo,
  Param:para

 }
 this.rootService.GetStudentList(obj).subscribe((res: any) => {
  if (res) {
    console.log("Get  Response :: ",res);
      

    this.StudentRecordList = res
    this.isLoading = false
  }
},
  err => { this.handleError(err); }
);
}
 
  
    private getDivisions = () => {
        this.rootService.getDivisions().subscribe((res: any) => { 
          
          this.divisions = res;
          console.log("Printing all divisions :: ",this.divisions);
          // if (this.user.Location != null) {
          //   this.placeHolderDivision = ''
          //   this.placeHolderDistrict = ''
          //   
          //  var divCode= this.user.Location.slice(0, 3)
          //     this.divisions = this.divisions.filter(x => x.CODE === divCode);
          //     this.disableDivnDist = true;
          //     this.loadDistrict(this.user.Location)
         
          // console.log("Printing User divisions :: ",this.divisions);
          // }
        },
          err => { this.handleError(err); }
        );
    }
    private getEvents = () => {
      this.rootService.GetEvents().subscribe((res: any) => { 
        
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
      public EventValueChanged = (value) => {
        
        this.ScreeningTypeId=0;
          console.log(value);
          if (!value) {
            return;
          }
          else
          {
            
            this.ScreeningTypeId=value.Id;
    
            var obj = {
         
              DateFrom: this.DateForm.value.DateFrom,
              DateTo   : this.DateForm.value.DateTo,
              ScreeningTypeId:this.ScreeningTypeId,
              Location:this.user.Location
            }
            this.GetDashboardCountDate(obj);
            this.GetDashboardCountList(obj);
            this.GetStudentScreeningReport(obj);

          }  
        };
        SubmitSearch(){
          
           
          var dateFrom = new Date(this.DateForm.value.DateFrom);
          var dateTo = new Date(this.DateForm.value.DateTo)
        
          if(dateFrom.getTime() > dateTo.getTime()){
            
            return this._MessageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: "Please Enter Correct Dates" });
            
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
            this.GetDashboardCountDate(obj); 
            this.GetDashboardCountList(obj);
            this.GetStudentScreeningReport(obj);
           
        
          }
           ;
       
        }
   
      
   
 // Getting Data for Table
 
    
    // Drop down options
    public dropdownValueChanged = (value, filter) => {
      
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
          this.dashboardDetailDto.ScreeningTypeId=this.ScreeningTypeId       

          
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
          this.dashboardDetailDto.ScreeningTypeId=this.ScreeningTypeId       
          this.GetDashboardCountList(this.dashboardDetailDto)
     
         
    
        }     
    
       
       
    
    
    };
    public LoadSchool(disCode: string) {
      this.schools = [];
      
      this.rootService.getSchools(disCode)
        .subscribe((x: any) => {
          if (x) {
  
            this.schools = x;
          }
        });
    }
  
  
}
