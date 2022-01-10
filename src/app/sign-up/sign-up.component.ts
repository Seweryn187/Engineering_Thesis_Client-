import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {first} from "rxjs";
import {GenericResponse} from "../models/models";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  submitted:boolean = false;
  wrongEmail:boolean = false;


  constructor( private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {

  }

  get form(): { [key: string]: AbstractControl; }
  {
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return;
    }

    this.userService.register(this.signUpForm.value)
      .pipe(first())
      .subscribe({
        next: (value) => {
          let text: GenericResponse = value;
          if(text.response == "sign-up"){
            this.wrongEmail = true;
          } else{
            this.wrongEmail = false;
            this.router.navigate(['home/sign-in']);
          }
        }
      });
  }

}
