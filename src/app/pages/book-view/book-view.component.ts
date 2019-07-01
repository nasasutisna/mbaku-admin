import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from 'app/service/rest-api.service';
import { MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;


  keyword = new FormControl();
  formData: any = {
    pageIndex: 0,
    pageSize: 5,
    category: [],
    keyword: '',
    sortBy: '',
  }
  bookList: any = [];
  totalSize: any = 0;

  constructor(public restApi: RestApiService, public router: Router) { }

  ngOnInit() {
    this.getBookList();
    this.search();
  }

  getBookList() {
    this.restApi.getDataBuku(this.formData).subscribe((results: any) => {
      this.bookList = results.data;
      this.totalSize = results.totalPage;
    })
  }

  public handlePage(e: any) {
    this.formData.pageIndex = e.pageIndex;
    this.formData.pageSize = e.pageSize;
    this.getBookList();
  }


  search() {
    this.keyword.valueChanges.pipe(debounceTime(500)).subscribe((keyword) => {
      this.formData.keyword = keyword;

      this.restApi.getDataBuku(this.formData).subscribe((results: any) => {
        this.bookList = results.data;
        this.totalSize = results.totalPage;
      },
        err => {
          console.log('error', err);
        });
    })
  }

  gotoDetail(code){
    this.router.navigate(['/book/',code]);
  }

  gotoAddPage(code){
    this.router.navigate(['/book-add']);
  }
}
