import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'app/service/rest-api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss']
})
export class TransactionViewComponent implements OnInit {
  keyword = new FormControl();
  formData: any = {
    pageIndex: 0,
    pageSize: 5,
    category: [],
    keyword: '',
    sortBy: '',
    status: '',
  }

  transactionList: any = [];
  totalSize: any = 0;
  constructor(public restApi: RestApiService, public router: Router) { }

  ngOnInit() {
    this.getTransactionList();
    this.search();
  }

  getTransactionList() {
    this.restApi.getDataTransaction(this.formData).subscribe((results: any) => {
      this.transactionList = results.data;
      this.totalSize = results.totalPage;
    })
  }

  public handlePage(e: any) {
    this.formData.pageIndex = e.pageIndex;
    this.formData.pageSize = e.pageSize;
    this.getTransactionList();
  }


  search() {
    this.keyword.valueChanges.pipe(debounceTime(500)).subscribe((keyword) => {
      this.formData.keyword = keyword;

      this.restApi.getDataTransaction(this.formData).subscribe((results: any) => {
        this.transactionList = results.data;
        this.totalSize = results.totalPage;
      },
        err => {
          console.log('error', err);
        });
    })
  }

  gotoDetail(code){
    this.router.navigate(['/anggota/',code]);
  }

  gotoAddPage(code){
    this.router.navigate(['/anggota-add']);
  }
}
