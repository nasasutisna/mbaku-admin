import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'app/service/loader.service';
import { LoaderState } from 'app/model/loader-state';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  show = false;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService) { }
  ngOnInit() {
    this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
