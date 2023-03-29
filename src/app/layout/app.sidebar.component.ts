import { Component, ElementRef } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent {
    user:any
    constructor(public layoutService: LayoutService, public el: ElementRef) { 
        var retrievedObject: any = localStorage.getItem('ussr');
        this.user = JSON.parse(retrievedObject);

        console.log("USER :: ",this.user);
    }
}

