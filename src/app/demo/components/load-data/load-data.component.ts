import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { WorkerService } from 'src/app/_services/worker.service';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.scss']
})
export class LoadDataComponent implements OnInit {


  public vpMap:any;

  constructor(private router: Router,private workerService:WorkerService) { }

  ngOnInit(): void {
    console.log("jdhshsadkhjksahsa")
   
    
    this.vpMap=[
      {
        id:1,
        Doctor:'13',
        Nurse:'10',
        NaibQasid:'20',
        Total:'23',
      },
      {
        id:2, 
        Doctor:'13',
        Nurse:'10',
        NaibQasid:'13',
        Total:'23',
      },
      {
        id:3,
        Doctor:'12',
        Nurse:'14',
        NaibQasid:'12',
        Total:'10',
      },
      {
        id:4,
        Doctor:'11',
        Nurse:'5',
        NaibQasid:'10',
        Total:'13',
      },
      {
        id:5,
        Doctor:'10',
        Nurse:'11',
        NaibQasid:'16',
        Total:'14',
      }
    ]  
  }

  
  public selectMarker(event: any, window:any, val:any) {
    debugger

    console.log("i am clicked....!")
    console.log(event[val])
    sessionStorage.setItem('id',event[val]);
    this.router.navigate([`uikit/workerList/${event[val]}`]);



    // console.log(this.hfmisCode)
    //console.log(this.hfmisCode) 
    // console.log(event.Category);
    // this.router.navigate(['wagercatlist'], { queryParams: { Category: event.Category, Type: this.hfmisCode, value: val } });

    // debugger
    // console.log(event);

    // this.setVpTechnologist();
    // let codeMap = this.hfCodesMap.filter(x => x.HrHfId == event.HF_Id);
    // this.surgeries = [];
    // if (codeMap[0]) {
    //   this.dhisCode = codeMap[0].DHISHfCode;
    //   this.dhisFiltetType = 'facility';
    //   this.getSurgeries();
    // }

    // this.showMap = true;
    // this.openedWindow = event.Code;
    // this.pauseShow = true;
    // /* if (this.previous) {
    //   this.previous.close();
    // }
    // this.previous = window; */


    // this.zoom = 9;
    // this.facilityProfilesData = {};
    // let obj: any = {
    //   DesignationIds: this.selectedDesignations,
    //   HFTypeCodes: this.hfTypeCodes,

    //   HfmisCode: event.Code,
    //   showProfileViewId: this.showProfileViewId
    // };
    //  this._dashboardService.getEmployeePersons(obj).subscribe((response: any) => {
    //   if (response) {
    //     this.personProfiles = response.Persons;
    //     this.loadingMap = false;
    //     this.loadingVpMaster = false;
    //   }
    // }, err2 => {
    //   this.loadingVpMaster = false;
    //   this.loadingMap = false;
    // });
  }

}
