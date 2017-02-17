import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ModalModule } from 'ng2-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelperComponent } from './helper/helper.component';
import { EventModule } from './event/event.module';


@NgModule({
  declarations: [
    AppComponent,
    HelperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    AppRoutingModule,
    EventModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
