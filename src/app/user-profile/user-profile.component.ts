import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ConfirmationService} from "primeng/api";
import {first} from "rxjs";
import {Alert, Currency, GenericResponse, User} from "../models/models";
import {AlertService} from "../services/alert.service";
import {CurrencyService} from "../services/currency.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass'],
  providers: [ConfirmationService]
})
export class UserProfileComponent implements OnInit {

  userDetailsForm: FormGroup;
  userChangedData: User = {
    name: '',
    surname: '',
    login: '',
    password: '',
    email: ''
  };
  submitted:boolean = false;
  wrongEmail:boolean = false;
  editing:boolean = false;
  userAlerts: Array<Alert> = [];
  newAlert: Alert;
  alertDialog:boolean = false;
  submittedAlert:boolean = false;
  alertOptions: Array<Object> = [{ name: "Yes", value: true}, { name: "No", value: false}];
  currencies: Array<Currency> = [];

  constructor(private formBuilder: FormBuilder, public tokenStorageService: TokenStorageService, private router: Router,
              public userService: UserService, private http: HttpClient, private confirmationService: ConfirmationService,
              private alertService: AlertService, private currencyService: CurrencyService) {
    this.userDetailsForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      email: ['', Validators.email],
      login: [''],
    });
    this.newAlert = {
      currency: {
        name: '',
        abbr: ''
      },
      alertValue: 0,
      increase: false,
      repeatable: false
    };
  }

  ngOnInit(): void {
    if(!this.tokenStorageService.getToken()){
      this.router.navigate(["/home/sign-in"]);
    }
    this.userService.getUserDataFromServer(this.tokenStorageService.getUser().email).subscribe((data: any) => {
      this.userService.setCurrentUserParams(data.name, data.surname, data.email, data.login, data.password);
    });
    this.alertService.getUserAlertsFromServer(this.tokenStorageService.getUser().email).subscribe((data:any) => {
      this.userAlerts = data;
    });
    this.currencyService.getAllCurrencies().subscribe((data: any) => {
      this.currencies = data;
    });
  }

  get form(): { [key: string]: AbstractControl; }
  {
    return this.userDetailsForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    this.userChangedData = this.userDetailsForm.value;
    if(this.userChangedData.name == ''){
      this.userChangedData.name = this.userService.getCurrentUser().name;
    }
    if(this.userChangedData.surname == '') {
      this.userChangedData.surname = this.userService.getCurrentUser().surname;
    }
    if(this.userChangedData.email == ''){
      this.userChangedData.email = this.userService.getCurrentUser().email;
    }
    if(this.userChangedData.login == ''){
      this.userChangedData.login = this.userService.getCurrentUser().login;
    }
    this.userChangedData.password = this.userService.getCurrentUser().password;

    this.userService.updateProfileChanges(this.userChangedData)
      .pipe(first())
      .subscribe({
        next: (value) => {
          let text: GenericResponse = value;
          if(text.response == "updated"){
            this.editing = false;
            this.wrongEmail = false;
          } else {
            this.wrongEmail = true;
          }
        },
        error: err => {
          console.log(err);
        }
      });
  }

  deleteUser() {
    this.userService.deleteUserProfile();
    this.router.navigate(["/home/sign-in"]);
  }

  edit() {
    this.editing = true;
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      // @ts-ignore
      target: event.target,
      message: 'Are you sure you want to delete your account?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser();
      },
      reject: () => {
      }
    });
  }

  openNewAlert() {
    this.newAlert = {
      currency: {
        name: '',
        abbr: ''
      },
      alertValue: 0,
      increase: false,
      repeatable: false
    };
    this.submittedAlert = false;
    this.alertDialog = true;
  }

  hideDialog() {
    this.alertDialog = false;
    this.submittedAlert = false;
  }

  saveAlert() {
    let integerValue = this.newAlert.alertValue * 1000;
    this.newAlert.alertValue = Math.trunc(integerValue);
    this.newAlert.user = this.userService.getCurrentUser();
    this.alertService.addNewAlert(this.newAlert)
      .pipe(first())
      .subscribe({
        next: () => {
          this.userAlerts.push(this.newAlert);
          this.alertDialog = false;
          this.submittedAlert = false;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  deleteAlert(alert:Alert) {
    this.alertService.deleteAlert(alert.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.userAlerts.splice(this.userAlerts.indexOf(alert), 1);
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
