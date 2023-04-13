import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ParameterreportComponent } from './parameterreport/parameterreport.component';
import { DiseasesReportComponent } from './diseases-report/diseases-report.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'parameterropert', component: ParameterreportComponent },
        { path: 'dieasesreport', component: DiseasesReportComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
