import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-tablet pi-chart-line', routerLink: ['/dashboard'] },
                    { label: 'Mising Token', icon: 'pi pi-tablet pi-chart-line', routerLink: ['/dashboard/parameterropert'] },
                    { label: 'Diseases Report', icon: 'pi pi-tablet pi-chart-line', routerLink: ['/dashboard/dieasesreport'] },
                      
                ]
                
            },
            // {
            //     label: 'Events',
            //     items: [
            //         {
            //             label: 'Event',
            //             icon: 'pi pi-fw pi-fw pi-calendar',
            //             items: [
            //                 {
            //                     label: 'Create Event',
            //                     icon: 'pi pi-fw pi-list',
            //                     routerLink: ['/dashboard/duty-roster']
            //                 },
                            
                            
            //                 {
            //                     label: 'Manage Event',
            //                     icon: 'pi  pi-fw pi-file',
            //                     routerLink: ['/dashboard/duty-roster/manage-shifts']
            //                 },
                            
                          
                            
            //             ]
            //         },
                   
                    
            //     ]
            // },
                
           
    //        
        ];
     }
}
