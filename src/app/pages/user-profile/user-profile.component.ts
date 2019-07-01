import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'app/service/rest-api.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotifService } from 'app/service/notif.service';
import { AuthService } from 'app/service/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  user: any;
  image: any;
  serialId: any;
  formData = new FormGroup({});
  file:any;
  isDelete:boolean;

  constructor(public router: Router, public authService: AuthService, public route: ActivatedRoute, public fb: FormBuilder, public restApi: RestApiService, public notifService: NotifService) { }

  ngOnInit() {
    this.serialId = this.route.snapshot.params['id'];
    this.getDetailData();
    this.defineForm('')
  }


  defineForm(user: any) {
    if (user) {
      this.formData = this.fb.group({
        kode_anggota: [user.kode_anggota,Validators.compose([Validators.required])],
        nama_lengkap: [user.nama_lengkap,Validators.compose([Validators.required])],
        email: [user.email,Validators.compose([Validators.required])],
        nomor_handphone: [user.nomor_handphone],
        status: [user.status,Validators.compose([Validators.required])],
        alamat: [user.alamat],
        photo: ['']
      });
    }
    else{
      this.formData = this.fb.group({
        kode_anggota: ['',Validators.compose([Validators.required])],
        nama_lengkap: ['',Validators.compose([Validators.required])],
        email: ['',Validators.compose([Validators.required])],
        nomor_handphone: [''],
        status: ['',Validators.compose([Validators.required])],
        alamat: [''],
        photo: ['']
      });
    }
  }

  getDetailData() {
    let auth = JSON.parse(localStorage.getItem('authentication'));
    this.restApi.detailAccount(this.serialId).subscribe((result: any) => {
      this.user = result;
      this.image = this.restApi.url + this.user.photo;
      localStorage.setItem('user', JSON.stringify(result));
      this.defineForm(this.user);
      this.authService.navbar.emit();
    }, err => {
        this.notifService.showMessage(err.error.msg, 'warning', 'top');
      });
  }

  updateProfile() {
    let params = {
      serial_id: this.user.serial_id
    }

    params = Object.assign(this.formData.value,params);
    this.restApi.updateAccount(params).subscribe((result: any) => {
      this.notifService.showMessage(result.msg, 'success', 'bottom');
      this.router.navigateByUrl("anggota-view");
    }, err => {
        console.log(err);
        this.notifService.showMessage(err.error.msg, 'warning', 'bottom');
      });
  }

  browseImage(){
    this.fileInput.nativeElement.click();
  }

  processWebImage(event) {
    var reader = new FileReader();
    this.file = event.target.files[0];
    console.log('file',this.file)
    this.formData.get("photo").setValue(this.file);

    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event:any) => { // called once readAsDataURL is completed
      this.image = event.target.result
    }

  }


  confirmDelete(){
    this.isDelete = true; 
  }

  delete(serialId){
    this.restApi.deleteAnggota(serialId).subscribe((result) => {
      this.notifService.showMessage("Data berhasil dihapus", 'success', 'bottom');
      this.router.navigateByUrl("anggota-view");
    })
  }

  cancelDelete(){
    this.isDelete = false;
  }

}
