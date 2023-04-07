import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { LoadDataComponent } from './././././demo/components/load-data/load-data.component';
import { BrowserModule } from '@angular/platform-browser';
import { WorkerListComponent } from './demo/components/worker-list/worker-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import {MatTableModule} from '@angular/material/table';
import {TokenStorageService} from './Services/token-storage.service'
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, authInterceptorProviders } from './Services/auth.interceptor';



@NgModule({
    declarations: [
        AppComponent, NotfoundComponent,LoadDataComponent, WorkerListComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        AppLayoutModule,
        BrowserAnimationsModule,
        MatTableModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
         },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,TokenStorageService,authInterceptorProviders

    ],
    bootstrap: [AppComponent],
    
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
})
export class AppModule { }
