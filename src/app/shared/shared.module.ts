import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { IconComponent } from './icon/icon.component';
import { UploadBoxComponent } from './upload-box/upload-box.component';
import { MathEvalInputDirective } from './math-eval-input/math-eval-input.directive';
import { CheckboxControlComponent } from './checkbox-control/checkbox-control.component';
import { TimeSecondsPipe } from './time-seconds.pipe';
import { TrustChallengeComponent } from './trust-challenge/trust-challenge.component';
import { InventoryTableComponent } from './inventory-table/inventory-table.component';
import { ModalButtonFooterComponent } from './modal-button-footer/modal-button-footer.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    IconComponent,
    UploadBoxComponent,
    MathEvalInputDirective,
    CheckboxControlComponent,
    TimeSecondsPipe,
    TrustChallengeComponent,
    InventoryTableComponent,
    ModalButtonFooterComponent
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
    NgxPageScrollModule,
    IconComponent,
    UploadBoxComponent,
    MathEvalInputDirective,
    CheckboxControlComponent,
    TimeSecondsPipe,
    TrustChallengeComponent,
    InventoryTableComponent,
    ModalButtonFooterComponent
  ]
})
export class SharedModule { }
