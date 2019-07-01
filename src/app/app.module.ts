import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { DataListModule }  from 'primeng/primeng';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatToolbarModule, MatDividerModule, MatDatepickerModule, MatDatepicker, MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AnggotaRegisterComponent } from './pages/anggota/anggota-register/anggota-register.component';
import { LoaderInterceptorService } from './service/loader-interceptor.service';
import { AuthService } from './service/auth.service';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { NgQrScannerModule } from 'angular2-qrscanner';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { TransactionAddComponent } from './pages/transaction-add/transaction-add.component';
import { QrCodeScannerDialogComponent } from './qr-code-scanner-dialog/qr-code-scanner-dialog.component';
import { AppDateAdapter } from './adapter/AppDateAdapter';
import { AuthGuard } from './auth.guard';

export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataListModule,
    HttpClientModule,
    ComponentsModule,
    MatIconModule,
    RouterModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDividerModule,
    NgQrScannerModule,
    BarecodeScannerLivestreamModule,
    ZXingScannerModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    // AnggotaRegisterComponent,
    TransactionComponent,
    TransactionAddComponent,
    QrCodeScannerDialogComponent
    // DashboardComponent,
  ],
  entryComponents: [
    QrCodeScannerDialogComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  },
  {provide: DateAdapter, useClass: AppDateAdapter},
  {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
  MatDatepickerModule,
  AuthService,
  AuthGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
