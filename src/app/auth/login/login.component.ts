import { AuthService } from '../auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private as: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });

    this.as.token$
      .subscribe(e => console.log(e));

    this.as.authenticated$
      .subscribe(e => console.log(e));
  }

  submitForm() {
    const { username, password } = this.form.value;
    this.as.login(username, password);
  }

}
