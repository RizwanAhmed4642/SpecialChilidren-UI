import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import {MultiSelectModule} from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { AuthInterceptor,authInterceptorProviders } from 'src/app/Services/auth.interceptor';
import { LoadingServiceService } from 'src/app/Services/loading-service.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { CalendarModule } from "primeng/calendar";
import { DatePipe } from '@angular/common';
import { Ng9OdometerModule } from 'ng9-odometer';
import { ParameterreportComponent } from './parameterreport/parameterreport.component';
import { DiseasesReportComponent } from './diseases-report/diseases-report.component';
import { DevicesReportComponent } from './devices-report/devices-report.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        MultiSelectModule,
        DropdownModule,
        DialogModule,
        ProgressSpinnerModule,
        CalendarModule,
        Ng9OdometerModule.forRoot()
      
    ],
    providers: [
        authInterceptorProviders,
        DatePipe,
        AuthInterceptor
        
    ],
    declarations: [DashboardComponent, ParameterreportComponent, DiseasesReportComponent, DevicesReportComponent]
})
export class DashboardModule { }
