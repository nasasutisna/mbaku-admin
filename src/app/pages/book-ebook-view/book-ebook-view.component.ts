import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'app/service/rest-api.service';
import { GlobalService } from 'app/global.service';

@Component({
  selector: 'app-book-ebook-view',
  templateUrl: './book-ebook-view.component.html',
  styleUrls: ['./book-ebook-view.component.scss']
})
export class BookEbookViewComponent implements OnInit {

  book:any;
  bookId:any;
  totalPage:any;
  constructor(public router: Router, public globalService: GlobalService, public activatedRoute: ActivatedRoute, public restApi: RestApiService) { 
    let auth = JSON.parse(localStorage.getItem('authentication'));
    if(!auth){
      this.router.navigateByUrl('/login');
    }

    this.bookId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getDetail();
  }

  handlePageEbook(e){
    this.totalPage = e;
  }

  getDetail(){
    this.restApi.getDetailBook(this.bookId).subscribe((results) => {
      console.log(results);
      this.book = results;
    })
  }

  goto(page:string){
    if(page == 'dashboard'){
      this.router.navigate(['/'+page]);
    }
    else if(page == 'detail'){
      this.router.navigate(['/book/',this.bookId]);
    }
  }

  download(ebook, fileName){
    this.globalService.download(ebook,fileName);
  }

}
