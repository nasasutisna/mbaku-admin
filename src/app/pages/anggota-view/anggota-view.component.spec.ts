import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnggotaViewComponent } from './anggota-view.component';

describe('AnggotaViewComponent', () => {
  let component: AnggotaViewComponent;
  let fixture: ComponentFixture<AnggotaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnggotaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnggotaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
