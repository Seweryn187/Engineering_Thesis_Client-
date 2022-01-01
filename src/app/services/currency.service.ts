import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Currency} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  header: HttpHeaders;
  serverUrl: string;
  currencies$: Observable<Currency>;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    this.serverUrl = "http://localhost:8080";
    this.currencies$ = this.getCurrenciesFromServer();
  }

  getCurrenciesFromServer(): Observable<Currency> {
    return this.http.get<Currency>(this.serverUrl+"/currencies", { 'headers': this.header });
  }

  getCurrentValue():  Observable<Currency>{
    return this.currencies$;
  }
}
