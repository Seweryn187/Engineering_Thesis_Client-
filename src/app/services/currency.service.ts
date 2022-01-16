import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Currency} from "../models/models";
import {HttpClient} from "@angular/common/http";
import {httpConstants} from "../constants/http-constants";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currencies$: Observable<Currency>;
  selectedCurrency: Currency;

  constructor(private http: HttpClient) {
    this.currencies$ = this.getAllCurrenciesFromServer();
    this.selectedCurrency = {
      name: '',
      abbr: 'EUR'
    }
  }

  getAllCurrenciesFromServer(): Observable<Currency> {
    let link = encodeURI(httpConstants.serverUrl + "/currencies");
    return this.http.get<Currency>(link, { 'headers': httpConstants.header });
  }

  getAllCurrencies(): Observable<Currency> {
    return this.currencies$;
  }

  getSelectedCurrency(): Currency {
    return this.selectedCurrency;
  }

  setSelectedCurrency(abbr:string) {
    this.selectedCurrency.abbr = abbr;
  }
}
