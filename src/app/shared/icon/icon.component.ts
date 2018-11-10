import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'il-icon',
  template: '<i class="fa" [ngClass]="iconClass" aria-hidden="true"></i>',
})
export class IconComponent implements OnChanges {

  iconClass = '';

  @Input() for: string;
  @Input() classes: string;

  private iconMap: { [k: string]: string } = {
    spinner: 'fa-circle-o-notch fa-spin fa-fw',
    plus: 'fa-plus',
    delete: 'fa-trash',
    edit: 'fa-pencil',
    ok: 'fa-check',
    cancel: 'fa-times',
    warning: 'fa-exclamation-triangle',
    activate: 'fa-eye',
    deactivate: 'fa-eye-slash',
    transferOut: 'fa-sign-out',
    transferIn: 'fa-sign-in fa-flip-horizontal',
    counter: 'fa-snowflake-o',
    storage: 'fa-database',
    stock: 'fa-database',
    evActive: 'fa-unlock',
    evInactive: 'fa-lock',
    evClose: 'fa-power-off',
    evEvent: 'fa-glass',
    evPrivate: 'fa-hand-paper-o',
    evPurchase: 'fa-shopping-cart',
    evStocktake: 'fa-database',
    cash: 'fa-money',
    clock: 'fa-clock-o',
    calendar: 'fa-calendar',
    dashboard: 'fa-tachometer',
    sizeType: 'fa-glass',
    crateType: 'fa-archive',
    unit: 'fa-calculator',
    print: 'fa-print'
  };

  ngOnChanges(c: SimpleChanges) {
    this.updateIcon();
  }

  updateIcon() {
    this.iconClass = this.iconMap[this.for] || this.for;
    this.iconClass += ' ' + this.classes;
  }

}
