import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-qr-code-scanner-dialog',
  templateUrl: './qr-code-scanner-dialog.component.html',
  styleUrls: ['./qr-code-scanner-dialog.component.scss']
})
export class QrCodeScannerDialogComponent implements OnInit {

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
  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any,
    private readonly _dialogRef: MatDialogRef<QrCodeScannerDialogComponent>,
    public router: Router
    ) { }

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
    this._dialogRef.close(this.qrResultString);
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
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


}
