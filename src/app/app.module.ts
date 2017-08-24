import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { EventService } from './event/shared/event.service';
import { UnitsService } from './management/sizes/shared/units.service';
import { SizesService } from './management/sizes/shared/sizes.service';


import { EventModule } from './event/event.module';
import { ManagementModule } from './management/management.module';
import { SizesModule } from './management/sizes/sizes.module';
import { ProductsModule } from './management/products/products.module';
const lazyModules = [EventModule, ManagementModule, SizesModule, ProductsModule];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ...lazyModules // lazy loaded modules are still imported because of https://github.com/angular/angular/issues/14324
  ],
  providers: [
    EventService,
    UnitsService,
    SizesService,
    { provide: LOCALE_ID, useValue: 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
