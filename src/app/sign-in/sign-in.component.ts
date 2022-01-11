import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../app.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private app: AppService, private http: HttpClient, private router: Router) {
    this.signInForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  get form(): { [key: string]: AbstractControl; }
  {
    return this.signInForm.controls;
  }

  login() {
    this.app.authenticate(this.signInForm.value, () => {
      this.router.navigate(['/']);
    });
    return false;
  }
}
