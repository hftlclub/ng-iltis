import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSeconds'
})
export class TimeSecondsPipe implements PipeTransform {

  transform(secs: number): any {
    secs = Math.round(secs);
    const hours = Math.floor(secs / (60 * 60));

    const divMin = secs % (60 * 60);
    const minutes = Math.floor(divMin / 60);

    const divSec = divMin % 60;
    const seconds = Math.ceil(divSec);

    return `${hours} h ${minutes} m ${seconds} s`;
  }

}
