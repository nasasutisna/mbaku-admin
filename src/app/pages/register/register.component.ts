import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestApiService } from 'app/service/rest-api.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  inputPassword: string = 'password';
  constructor(public restApi: RestApiService, public router: Router) { }
  registerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  ngOnInit() {
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

  processRegister(){
    this.restApi.registerAccount(this.registerForm.value).subscribe((results:any) => {
        console.log(results);
        this.showMessage(results.msg,'success');
        this.router.navigate(['/login']);
    }, err => {
      console.log('err',err);
      this.showMessage(err.error.msg,'danger');
    });
  }

  showMessage(msg: string = '', status: string = "success", from = 'top', align = 'right') {
    const type = ['info', 'success', 'warning', 'danger'];
    const statusMsg = type.findIndex(obj => obj == status);
    $.notify({
      icon: "notifications",
      message: msg

    }, {
        type: type[statusMsg],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

}
