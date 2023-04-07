import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription } from 'rxjs';
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

@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService]
    
})
export class DashboardComponent implements OnInit, OnDestroy {
 DateFrom : Date = new Date();
    items!: MenuItem[];

    products!: any;
    DashboardCountList!: any;
    StudentRecordList!: any;
    DashboardCount!: any;
    code='';

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;
    public DateForm: FormGroup = new FormGroup({
      Name: new FormControl(''),
      DateFrom: new FormControl(''),
      DateTo: new FormControl(''),
   
  
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
        // this.GetDashboardCount();
        this.getDivisions();
        this.GetDashboardCountList(this.dashboardDetailDto);
        this.GetDashboardCountDate(this.DashboardDto)
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
              debugger
              // this.DashBoardCountTotal.;
            this.DashBoardCountTotal = x;
            console.log("Dashboard Total Employee count :: ",x);
            
            }
          });
    }
    public GetDashboardCountDate(object:any) {
      debugger
      this.rootService.GetDashboardCountDate(object)
        .subscribe((x: any) => {
          if (x) {
            debugger
            // this.DashBoardCountTotal.;
          this.DashBoardCountTotal = x;
          console.log("Dashboard Total Employee count :: ",x);
          
          }
        });
  }

  private GetDashboardCountList(object:any)
  {
   debugger
   this.isLoading = true;
   this.DashboardCountList=[];

   this.rootService.GetDetailDashboardList(object).subscribe((res: any) => {
     if (res) {
       console.log("Get  Response :: ",res);

       this.DashboardCountList = res
       this.isLoading = false
     }
   },
     err => { this.handleError(err); }
   );
 }
 public StudentList(event:any) {
  debugger
  this.displayModal=true;
  this.StudentRecordList=[];
 var obj ={
  SchoolId :event.SchoolId,
  locationId:event.TehsilId

 }
 this.rootService.GetStudentList(obj).subscribe((res: any) => {
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
         
        }
        this.GetDashboardCountDate(obj);
     
        
        this.GetDashboardCountList(obj)
       
    
      }
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
