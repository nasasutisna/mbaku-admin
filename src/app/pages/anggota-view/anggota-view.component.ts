import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RestApiService } from 'app/service/rest-api.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-anggota-view',
  templateUrl: './anggota-view.component.html',
  styleUrls: ['./anggota-view.component.scss']
})
export class AnggotaViewComponent implements OnInit {
  keyword = new FormControl();
  formData: any = {
    pageIndex: 0,
    pageSize: 5,
    category: [],
    keyword: '',
    sortBy: '',
  }

  anggotaList: any = [];
  totalSize: any = 0;
  constructor(public restApi: RestApiService, public router: Router) { }

  ngOnInit() {
    this.getAnggotaList();
    this.search();
  }

  getAnggotaList() {
    this.restApi.getDataAnggota(this.formData).subscribe((results: any) => {
      this.anggotaList = results.data;
      this.totalSize = results.totalPage;
    })
  }

  public handlePage(e: any) {
    this.formData.pageIndex = e.pageIndex;
    this.formData.pageSize = e.pageSize;
    this.getAnggotaList();
  }


  search() {
    this.keyword.valueChanges.pipe(debounceTime(500)).subscribe((keyword) => {
      this.formData.keyword = keyword;

      this.restApi.getDataAnggota(this.formData).subscribe((results: any) => {
        this.anggotaList = results.data;
        this.totalSize = results.totalPage;
      },
        err => {
          console.log('error', err);
        });
    })
  }

  gotoDetail(code){
    this.router.navigate(['/anggota-view/detail',code]);
  }

  gotoAddPage(code){
    this.router.navigate(['/anggota-view/detail',0]);
  }

}
