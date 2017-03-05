import { Component } from '@angular/core';

@Component({
  selector: 'il-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  aclass = 'active';
  collapsed = true;

}
