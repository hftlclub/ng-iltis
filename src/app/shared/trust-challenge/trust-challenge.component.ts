import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'il-trust-challenge',
  templateUrl: './trust-challenge.component.html',
  styleUrls: ['./trust-challenge.component.css'],
  exportAs: 'chlg, challenge'
})
export class TrustChallengeComponent implements OnInit {

  valid: boolean;
  statusChange = new EventEmitter<boolean>();

  control: FormControl;
  challenge: string;

  private challenges = [
    'Egal bei welchem Wetter!',
    'Eichendorffstraße',
    'Mehr Nebel',
    'Afterwork',
    'Stecker',
    'Ice Cubes',
    'Strafrunde',
    'DJ Hasi',
    'Schnaps',
    'Stecker'
  ];

  ngOnInit() {
    this.challenge = this.randomChallenge();
    this.control = new FormControl('', this.exactValueValidator(this.challenge));

    this.control.statusChanges
      .map(s => s === 'VALID' ? true : false)
      .startWith(false)
      .distinctUntilChanged()
      .subscribe(valid => {
        this.valid = valid;
        this.statusChange.emit(valid);
      });
  }

  private randomChallenge() {
    return this.challenges[Math.floor(Math.random() * this.challenges.length)];
  }

  private exactValueValidator(value: any) {
    return function(fc: FormControl): { [error: string]: any } {
      return (fc.value === value) ? null : { exactValue: false };
    };
  }
}
