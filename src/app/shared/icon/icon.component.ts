import { Component, Input } from '@angular/core';

@Component({
  selector: 'il-icon',
  template: '<i class="fa" [ngClass]="iconClass" aria-hidden="true"></i>',
})
export class IconComponent {

  iconClass = '';

  @Input() set for(reason: string) {
    this.iconClass += this.iconMap[reason] || reason;
  }

  @Input() set classes(classes: string) {
    this.iconClass += ' ' + classes;
  }

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
    unit: 'fa-calculator'
  };

}
