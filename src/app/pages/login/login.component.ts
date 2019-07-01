import { Component, OnInit,ViewChild } from '@angular/core';
import { RestApiService } from 'app/service/rest-api.service';
import { MatInput } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifService } from 'app/service/notif.service';
import { Router } from '@angular/router';
import { AuthService } from 'app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  @ViewChild('email') email: MatInput;
  hide = true;
  inputPassword: string = 'password';
  emailInput: any = new FormControl();
  passwordInput: any = new FormControl();

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
 
  constructor(
    public restApi: RestApiService,
    public notifService: NotifService,
    public router: Router,
    public authService: AuthService
  ) { 
    let auth = JSON.parse(localStorage.getItem('authentication'));
    if(auth){
      this.router.navigateByUrl('/dashboard');
    }

  }

  ngOnInit() {
    setTimeout(() => {
      this.email.focus();
    },100)
 
  }

  processLogin(){
    this.authService.login(this.loginForm.value).then((result:any) => {
      console.log(result.user.userStatus);
      if(result.user.userStatus == 1){
        localStorage.setItem('authentication',JSON.stringify(result));
        localStorage.setItem('token',JSON.stringify(result['isLogin']['auth']));
        localStorage.setItem('user',JSON.stringify(result.user.userInfo));
        this.router.navigate(['/']);
      }
      else{
        this.notifService.showMessage("Mohon maaf anda tidak memiliki akses!",'danger');
      }

    }).catch((error) => {
      console.log(error);
        this.notifService.showMessage(error.error.msg,'danger');
    })
    // this.restApi.processLogin(this.loginForm.value).subscribe((result:any) => {
    //   localStorage.setItem('authentication',JSON.stringify(result.isLogin));
    //   this.router.navigate(['/']);
    //   this.notifService.showMessage(result.msg,'success');
    // },error => {
    //   console.log(error);
    //   this.notifService.showMessage(error.error.msg,'danger');
    // })
  }

  showHidePass() {
    this.hide = !this.hide;
    if (this.hide) {
      this.inputPassword = 'password';
    }
    else {
      this.inputPassword = 'text';
    }
  }
}
