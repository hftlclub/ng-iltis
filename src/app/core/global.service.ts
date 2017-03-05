import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

  challenges = ['Egal bei welchem Wetter!', 'Eichendorffstraße', 'Mehr Nebel', 'Afterwork', 'Stecker', 'Ice Cubes', 'Strafrunde'];

  getTrustChallenge() {
    return this.challenges[Math.floor(Math.random() * this.challenges.length)];
  }

}
