import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlobalService {

  mobileMode: Observable<boolean>;

  challenges = ['Egal bei welchem Wetter!', 'Eichendorffstraße', 'Mehr Nebel', 'Afterwork', 'Stecker', 'Ice Cubes', 'Strafrunde'];

  getTrustChallenge() {
    return this.challenges[Math.floor(Math.random() * this.challenges.length)];
  }

}
