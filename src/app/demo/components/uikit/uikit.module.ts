import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIkitRoutingModule } from './uikit-routing.module';
import { ShedularComponent } from './shedular/shedular.component';
// import { BrowserModule } from '@angular/platform-browser'
@NgModule({
	imports: [
		// BrowserModule,
		CommonModule,
		UIkitRoutingModule
	],
	
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
	
    declarations: [
        //  ShedularComponent
	
    ]
	
})
export class UIkitModule { }
