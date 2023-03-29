import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss']
})
export class WorkerListComponent implements OnInit {

  public workerData:any
  public data:any;
  
  public cols = ['Name', 'cnic', 'designation', 'EmpMode','Action'];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.data = sessionStorage.getItem('id');
    this.workerData=[
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
      {
        name:'Araiz Javed',
        cnic:'3520285886773',
        designation:'Doctor',
        EmpMode:'testing',
        Total:'23',
      },
    ]  
  }



  public getShedule(i:any){
    debugger
    this.router.navigate([`uikit/shedule/1`])
  }
  }
