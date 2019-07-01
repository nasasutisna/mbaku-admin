import { Component, OnInit, ViewChild } from '@angular/core';
import { BarecodeScannerLivestreamComponent, BarecodeScannerLivestreamOverlayModule } from 'ngx-barcode-scanner';
import { QrScannerComponent } from 'angular2-qrscanner';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { QrCodeScannerDialogComponent } from 'app/qr-code-scanner-dialog/qr-code-scanner-dialog.component';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  availableDevices: MediaDeviceInfo[];
  isTransaction: any;
  currentDevice: MediaDeviceInfo = null;
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];
  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;
  isResultQRCode:boolean; 

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  toggleCount = 0;

  constructor(public router: Router,    private readonly _dialog: MatDialog) { }

  ngOnInit() {}
    
  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.isResultQRCode = true;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    // this._dialog
    //   .open(FormatsDialogComponent, { data })
    //   .afterClosed()
    //   .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    // this._dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
  
  transaction(type) {
    if (type == 'peminjaman') {
      this.isTransaction = 'peminjaman';
    }
    else {
      this.isTransaction = 'pengembalian';
    }
  }

  openDialog(type?:any) {
    console.log(type);
    this._dialog.open(QrCodeScannerDialogComponent, {}).afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate(['/transaction/',result],{ queryParams: {transaction: type}});
        }
    });
  }
  
  getAnggota(e){
    console.log(e);
  }

  toggleOpen(){
    this.toggleCount++;
    if(this.toggleCount == 10){
      this.router.navigateByUrl("/dashboard");
      this.toggleCount = 0;
    }
    console.log(this.toggleCount);
  }
}
