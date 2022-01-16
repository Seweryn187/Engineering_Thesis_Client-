import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";
import {Currency, User} from "../models/models";
import {CurrencyService} from "../services/currency.service";
import {SourceService} from "../services/source.service";
import {Dropdown} from "primeng/dropdown";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  private emptyUser: User = {
    name: '',
    surname: '',
    email: '',
    login: '',
    password: ''
  };
  selectedCurrency: Currency = {
    name: '',
    abbr: ''
  };
  currencies: Array<Currency> = [];
  isCollapsed:boolean = true;

  constructor(public tokenStorageService: TokenStorageService, private router: Router,
              private currencyService: CurrencyService, private sourceService: SourceService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.currencyService.getAllCurrencies().subscribe((data: any) => {
      this.currencies = data;
    });
  }

  handleSignOut() {
    this.tokenStorageService.signOut();
    this.userService.setCurrentUser(this.emptyUser);
    this.router.navigate(["/home"])
  }

  handleDropdownChange(dropdown: Dropdown, event: any) {
    if(event.value){
      this.currencyService.setSelectedCurrency(event.value.abbr);
    }
    this.router.navigate(['/home/archival-data', this.currencyService.getSelectedCurrency().abbr, this.sourceService.getCurrentSource().name]);
    if(event.value){
      dropdown.clear(event);
    }
  }

  handleDropdownBlur() {
  }
}
