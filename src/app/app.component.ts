import { Component } from '@angular/core';
import {AppService} from "./app.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Investing Pal';

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined, undefined);
  }

  logout() {
    this.http.post('logout', {})
      .pipe(first())
      .subscribe(() => {
      this.app.authenticated = false;
      this.router.navigate(['home/sign-in']);
    });
  }
}
