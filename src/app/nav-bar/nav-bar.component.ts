import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  aclass = 'active';

  constructor() { }

  ngOnInit() {
  }

}
