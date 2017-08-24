import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { IconComponent } from './icon/icon.component';
import { UploadBoxComponent } from './upload-box/upload-box.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IconComponent,
    UploadBoxComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DateValueAccessorModule,
    ModalModule,
    DatepickerModule,
    TimepickerModule,
    Ng2PageScrollModule,
    IconComponent,
    UploadBoxComponent
  ]
})
export class SharedModule { }
