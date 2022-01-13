import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  isLoggedIn:boolean = false;
  isLoginFailed:boolean = false;

  constructor( private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
               private tokenStorage: TokenStorageService, private router : Router) {
    this.signInForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['home/user/profile']);
    }
  }

  get form(): { [key: string]: AbstractControl; }
  {
    return this.signInForm.controls;
  }

  onSubmit() {
    const {login, password} = this.signInForm.value;
    console.log(this.signInForm.value);
    this.authenticationService.login(login, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        if(this.isLoggedIn){
          this.router.navigate(['home/user/profile']);
        }
      },
      err => {
        console.log(err);
        this.isLoginFailed = true;
      }
    );
  }

}
