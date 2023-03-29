import { Component } from '@angular/core';

import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from '../../../../Services/login.service'
import { TokenStorageService } from '../../../../Services/token-storage.service'
import { Message, MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{


    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    loading = false
    disabled = false
    public loginResponse: any = {};
    public msgs: Message[] = [];

    constructor(
        public layoutService: LayoutService,
        private _authService: LoginService,
        private tokenStorage: TokenStorageService,
        private router: Router,
    ) { }
    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    } 
      
    public EnterSubmit(event){
        if (event.keyCode === 13) {
            this.login();
        }
    }
    public login() {
        this.loading = true;
        this.disabled = true;
        debugger
        if(this.form.username == '' || this.form.password == ''){
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Please Enter Email/UserName & Password" });
        
        }

        this._authService.login(this.form).subscribe(
            (Response: any) => {
                debugger
                console.log(Response);
                if(Response == null){
                    this.disabled = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: "Wrong UserName/Password" });
                    this.loading = false;

                }else{
                    debugger
                    this.loginResponse = Response;
                    localStorage.setItem('userName', this.form.username);
                    localStorage.setItem('password', this.form.password);
                    if (this._authService.setUser(Response)) {
                    this.router.navigate(['/dashboard']);
                    }
                    this.loading = false;
                }
            }
        )
    }
    


}
