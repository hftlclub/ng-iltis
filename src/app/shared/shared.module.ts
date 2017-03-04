import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { ModalModule } from 'ng2-bootstrap/modal';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IconComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DateValueAccessorModule,
    ModalModule,
    DatepickerModule,
    TimepickerModule,
    Ng2PageScrollModule,
    IconComponent
  ]
})
export class SharedModule { }
