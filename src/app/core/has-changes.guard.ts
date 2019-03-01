import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HasChangesGuard implements CanDeactivate<any> {
  canDeactivate(comp: any) {
    if (comp.hasChanges) {
      return window.confirm('Eingaben wirklich verwerfen?');
    }
    return true;
  }
}
