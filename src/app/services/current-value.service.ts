import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, retry, share, Subject, switchMap, takeUntil, timer} from "rxjs";
import {CurrentValue} from "../models/models";
import {httpConstants} from "../constants/http-constants";

@Injectable({
  providedIn: 'root'
})
export class CurrentValueService {
  currentValues$: Observable<CurrentValue>;
  currentSource: string;
  private stopPolling = new Subject();

  constructor(private http: HttpClient) {
    this.currentSource = "The National Bank of Poland";
    this.currentValues$ =this.getCurrentValuesBySourceNameFromServer(this.currentSource);

    /*
    let link = encodeURI(this.serverUrl + "/current-values/" + this.currentSource);
    // polling for new values
    this.currentValues$ = timer(1,3000).pipe(
      switchMap(() => this.getCurrentValuesBySourceNameFromServer(this.getCurrentSource())),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    ); */
  }


  ngOnDestroy() {
    // @ts-ignore
    this.stopPolling.next();
  }

  getCurrentValuesBySourceNameFromServer(name:string): Observable<CurrentValue> {
    let link = encodeURI(httpConstants.serverUrl + "/current-values/" + name);
    return this.http.get<CurrentValue>(link, { 'headers': httpConstants.header });
  }

  setCurrentValue(currentValues:Observable<CurrentValue>) {
    this.currentValues$ = currentValues;
  }

  getCurrentValue(): Observable<CurrentValue>{
    return this.currentValues$;
  }

  getCurrentSource() {
    return this.currentSource;
  }

  setCurrentSource(newSource:string) {
    this.currentSource = newSource;
  }
}
