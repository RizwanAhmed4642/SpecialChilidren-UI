import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    public user: any = null;
    constructor(private primengConfig: PrimeNGConfig,
        private spinnerService: NgxSpinnerService, private router: Router) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        var retrievedObject: any = localStorage.getItem('ussr');
        this.user = JSON.parse(retrievedObject);
        if(this.user == null){
            this.router.navigate(['/auth/login']);
        }
    }
}
