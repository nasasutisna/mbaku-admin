import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'app/service/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { QrCodeScannerDialogComponent } from 'app/qr-code-scanner-dialog/qr-code-scanner-dialog.component';
import { NotifService } from 'app/service/notif.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class TransactionAddComponent implements OnInit {

  kodeAnggota: any;
  transaction: any;
  tanggal_pengembalian: any;
  content: any;
  bookList:any[] = [];
  tempBookList:any[] = [];
  tempBook:any[] = [];
  dateNow:any;
  constructor(
    public restApi: RestApiService,
    public route: ActivatedRoute,
    public router:Router,
    private readonly _dialog: MatDialog,
    public notifService: NotifService
  ) { }

  ngOnInit() {
    this.dateNow = moment().format("DD/MM/YYYY");
    this.tanggal_pengembalian =  moment().toISOString();
    this.kodeAnggota = this.route.snapshot.params['id'];

    this.route.queryParams.subscribe((params) => {
      this.transaction = params['transaction'];
      this.content = JSON.parse(params['content']);
      if(this.transaction == 'pengembalian'){
        this.getListPeminjaman();
      }
    })
  }

  // getDetailAnggota(kodeAnggota) {
  //   this.restApi.detailAccount(kodeAnggota).subscribe((result) => {
  //     this.content = result;
  //     if(!this.content.kode_anggota){
  //       console.log('tidak ditemukan')
  //       thi
  //     }
  //   });
  // }

  getListPeminjaman(){
    this.restApi.getListByAnggota({kode_anggota: this.kodeAnggota}).subscribe((results:any) => {
        this.tempBookList = results;
    }, error => {
      this.notifService.showMessage('Gagal Mengambil Data','danger','bottom');
    });
  }

  openDialog() {
    this._dialog.open(QrCodeScannerDialogComponent, {}).afterClosed().subscribe(result => {
        if (result) {
          let kodeBuku = result;
          this.getDetailBook(kodeBuku);
        }
    });
  }

  getDetailBook(kodeBuku){
    this.restApi.getDetailBook(kodeBuku).subscribe((result:any) => {
      if(result.kode_buku){
        let index = this.bookList.findIndex(book => book.kode_buku == result.kode_buku);
        if(index != -1){
          this.bookList[index]['qty']++;
        }
        else{
          result['qty'] = 1;
          this.bookList.push(result);
        }
      }
      else{
        this.notifService.showMessage("Kode buku tidak ditemukan","danger","bottom");
      }
    });  
  }

  save(){
    let params = {
      kode_anggota: this.kodeAnggota,
      tanggal_pengembalian: this.tanggal_pengembalian,
      bookList: this.bookList,
      transaction : this.transaction
    }

    this.restApi.saveTransaction(params).subscribe((res) => {
      this.notifService.showMessage("Transaksi Berhasil Disimpan");
      setTimeout(() => {
        this.router.navigateByUrl("transaction");
      },2000)
    })
  }

  remove(kodeBuku){
    this.bookList.splice(this.bookList.findIndex(book => book.kode_buku == kodeBuku),1);
  }

  cancel(){
    this.router.navigateByUrl("transaction");
  }

  addToCart(book){
    this.tempBookList.splice(this.tempBookList.findIndex(trx =>trx.kode_peminjaman == book.kode_peminjaman),1);
    this.bookList.push(book);
  }

  removePeminjaman(peminjaman){
    this.bookList.splice(this.bookList.findIndex(book => book.kode_peminjaman == peminjaman.kode_peminjaman),1);
    this.tempBookList.push(peminjaman);
  }
}
