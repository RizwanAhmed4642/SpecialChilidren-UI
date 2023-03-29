import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShedularComponent } from './shedular.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ShedularComponent }
	])],
	exports: [RouterModule]
})
export class ShedularComponentRoutingModule { }
