import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'il-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css']
})
export class SizesComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  get subHeadline(): string {
    switch (this.route.snapshot.children[0].url[0].path) {
      case 'size-types': return 'Gebindegrößen';
      case 'crate-types': return 'Kastengrößen';
      default: return '';
    }
  }

  ngOnInit() {
  }

}
