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
    transferOut: 'fa-sign-out',
    transferIn: 'fa-sign-in fa-flip-horizontal',
    edit: 'fa-pencil',
    ok: 'fa-check',
    cancel: 'fa-times',
    spinner: 'fa-circle-o-notch fa-spin fa-fw',
    counter: 'fa-snowflake-o',
    storage: 'fa-database',
    evActive: 'fa-unlock',
    evInactive: 'fa-lock',
    evClose: 'fa-power-off',
    cash: 'fa-money',
    clock: 'fa-clock-o',
    calendar: 'fa-calendar',
    plus: 'fa-plus',
    delete: 'fa-trash',
    unit: 'fa-calculator',
    warning: 'fa-exclamation-triangle',
    activate: 'fa-eye',
    deactivate: 'fa-eye-slash'
  };

}
