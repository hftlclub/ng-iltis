import { InfoService } from './info.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ConnectionLostModalComponent } from './connection-lost-modal/connection-lost-modal.component';

import { EventService } from './event/shared/event.service';
import { UnitsService } from './management/shared/units.service';
import { SizesService } from './management/shared/sizes.service';
import { CategoriesService } from './management/shared/categories.service';

import { EventModule } from './event/event.module';
import { ManagementModule } from './management/management.module';
import { SizesModule } from './management/sizes/sizes.module';
import { ProductsModule } from './management/products/products.module';
import { CategoriesModule } from './management/categories/categories.module';
import { InfoComponent } from './info/info.component';
const lazyModules = [EventModule, ManagementModule, SizesModule, ProductsModule, CategoriesModule];

@NgModule({
  declarations: [AppComponent, NavBarComponent, ConnectionLostModalComponent, InfoComponent],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ...lazyModules // lazy loaded modules are still imported because of https://github.com/angular/angular/issues/14324
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
  entryComponents: [ConnectionLostModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
