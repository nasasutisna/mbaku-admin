import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ImageComponentComponent } from './image-component/image-component.component';
import { LoaderComponent } from './loader/loader.component';
import { MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatFormFieldControl, MatMenuModule, MatInputModule, MatSpinner, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DocumentReaderComponent } from './document-reader/document-reader.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { QrCodeScannerComponent } from './qr-code-scanner/qr-code-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatMenuModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    PdfViewerModule,
    ZXingScannerModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ImageComponentComponent,
    LoaderComponent,
    DocumentReaderComponent,
    QrCodeScannerComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoaderComponent,
    ImageComponentComponent,
    DocumentReaderComponent,
    QrCodeScannerComponent
  ]
})
export class ComponentsModule { }
