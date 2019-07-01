import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { GlobalService } from 'app/global.service';
import { RestApiService } from 'app/service/rest-api.service';
import { PDFDocumentProxy } from 'pdfjs-dist';

@Component({
  selector: 'app-document-reader',
  templateUrl: './document-reader.component.html',
  styleUrls: ['./document-reader.component.scss']
})
export class DocumentReaderComponent implements OnInit {

  isLoading:any = false;
  page:any = 1;
  // totalPage:any = 0;
  urlBlob:any;
  thumbsBlob:any;
  @Input() urlFile:any;
  @Input() fileName:any;
  @Output() totalPage: EventEmitter<any> = new EventEmitter<any>();
  constructor(public globalService:GlobalService, public restApi: RestApiService) { }

  ngOnInit() {
    this.isLoading = true;
    this.restApi.getFile(this.fileName).subscribe((result) => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urlBlob = e.target.result;
        this.thumbsBlob = e.target.result;
      };
       reader.readAsArrayBuffer(result);
    }, err =>{
      console.log(err)
    })
  }

  setPage(event){
   this.page = event;
  }

  onProgress(e){
    if(e.loaded == e.total){
      this.isLoading = false
    }
  }

  complete(pdf: PDFDocumentProxy){
    this.totalPage.emit(pdf.numPages);
    this.isLoading = false
  }

}
