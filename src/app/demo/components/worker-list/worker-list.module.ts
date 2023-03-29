import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { WorkerListComponent } from './worker-list.component';

@NgModule({
	imports: [
		CommonModule,
        ButtonModule
	]
})
export class WorkerListModule { }
