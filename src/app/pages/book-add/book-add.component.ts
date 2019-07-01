import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Form, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'app/service/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifService } from 'app/service/notif.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {

  @ViewChild('inputCover') inputCover;
  @ViewChild('inputEbook') inputEbook;

  myForm: FormGroup;
  formFields = {};
  tempCover: any;
  tempEbook: any;
  categoryList: any;
  book: any;
  isDelete: boolean;
  serialId: any;

  constructor(
    public fb: FormBuilder,
    public restApi: RestApiService,
    public router: Router,
    public route: ActivatedRoute,
    public notifService: NotifService
  ) { }

  ngOnInit() {

    this.initForm();
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.serialId = params.s;
        this.getDetail(params.c);
      }
    })
    this.getCategories();
  }


  initForm(data?: any) {
    let book = new BookInterface();
    let fields = book.fields;
    for (let key in fields) {
      let required = [];
      let value = (typeof data != 'undefined') ? data[key] : '';

      if (fields[key] == 'required') {
        required = [value, Validators.compose([Validators.required])];
      }
      else {
        required = [value, ''];
      }

      this.formFields[key] = required;
    }
    this.myForm = this.fb.group(this.formFields);
  }

  getCategories() {
    this.restApi.getCategories().subscribe((result) => {
      this.categoryList = result;
    })
  }

  processWebImage(event, field) {

    if (field == 'cover-book') {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (field == 'cover-book') {
          this.tempCover = reader.result;
          this.myForm.get("path_image").setValue(event.target.files[0])
        }

      }, false);
      reader.readAsDataURL(event.target.files[0]);
    }
    else {
      this.myForm.get("ebook").setValue(event.target.files[0]);
    }

  }

  getDetail(bookId) {
    this.restApi.getDetailBook(bookId).subscribe((results:BookInterface) => {
      this.initForm(results);
      this.book = results;
      this.tempCover = this.restApi.url + results.path_image;
      this.tempEbook = results.ebook;
    })
  }

  cancel(){
    this.router.navigateByUrl("book");
  }

  save() {
    this.restApi.bookStore(this.myForm.value,this.serialId).subscribe((res) => {
      this.notifService.showMessage('Data berhasil disimpan', 'success', 'bottom');
      this.router.navigateByUrl("book");
    }, error => {
      this.notifService.showMessage('Data gagal disimpan', 'warning', 'bottom');
    })
  }

  confirmDelete(){
    this.isDelete = true; 
  }

  delete(serialId){
    this.restApi.deleteBook(serialId).subscribe((result) => {
      this.notifService.showMessage("Data berhasil dihapus", 'success', 'bottom');
      this.router.navigateByUrl("book");
    })
  }

  cancelDelete(){
    this.isDelete = false;
  }


}

export class BookInterface {
    kode_buku: any
    judul: any
    kode_kategori: any
    pengarang: any
    penerbit: any
    tahun_terbit: any
    stok: any
    jumlah: any
    path_image:any;
    ebook:any 
    sinopsis:any
    harga_ebook:any

  fields = {
    'kode_buku': 'required',
    'judul': 'required',
    'kode_kategori': 'required',
    'pengarang': 'required',
    'penerbit': 'required',
    'tahun_terbit': 'required',
    'stok': 'required',
    'jumlah': 'required',
    'path_image': '',
    'ebook': '',
    'harga_ebook': '',
    'sinopsis': ''
  }

}
