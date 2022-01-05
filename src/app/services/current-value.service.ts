import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, retry, share, Subject, switchMap, takeUntil, timer} from "rxjs";
import {CurrentValue} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class CurrentValueService {

  header: HttpHeaders;
  serverUrl: string;
  currentValues$: Observable<CurrentValue>;
  currentSource: string;
  private stopPolling = new Subject();

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    this.serverUrl = "http://localhost:8080";
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
    let link = encodeURI(this.serverUrl + "/current-values/" + name);
    return this.http.get<CurrentValue>(link, { 'headers': this.header });
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
