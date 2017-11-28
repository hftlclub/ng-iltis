import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  aclass = 'active';
  collapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(ev => ev instanceof NavigationEnd)
    ).subscribe(ev => this.collapsed = true);
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
