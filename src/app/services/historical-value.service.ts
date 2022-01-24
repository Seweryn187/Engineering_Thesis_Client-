import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HistoricalValue} from "../models/models";
import {HttpClient} from "@angular/common/http";
import {httpConstants} from "../constants/http-constants";

@Injectable({
  providedIn: 'root'
})
export class HistoricalValueService {

  historicalValues$: Observable<HistoricalValue> | undefined;

  constructor(private http: HttpClient) {
    this.historicalValues$ =this.getHistoricalValuesByCurrencyAbbrAndSourceNameBeforeMonthFromServer("EUR", "The National Bank of Poland");
  }

  getHistoricalValuesByCurrencyAbbrAndSourceNameBeforeMonthFromServer(abbr:string, name:string): Observable<HistoricalValue> {
    let link = encodeURI(httpConstants.serverUrl + "/historical-value/" + abbr + "/" + name + "/month" );
    return this.http.get<HistoricalValue>(link, { 'headers': httpConstants.header });
  }

  getHistoricalValuesByCurrencyAbbrAndSourceNameBeforeYearFromServer(abbr:string, name:string): Observable<HistoricalValue> {
    let link = encodeURI(httpConstants.serverUrl + "/historical-value/" + abbr + "/" + name + "/year" );
    return this.http.get<HistoricalValue>(link, { 'headers': httpConstants.header });
  }
}
