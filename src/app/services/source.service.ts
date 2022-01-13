import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Source} from "../models/models";
import {httpConstants} from "../constants/http-constants";

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  currentSource: string;
  sources$: Observable<Source>;

  constructor(private http: HttpClient) {
    this.currentSource = "The National Bank of Poland";
    this.sources$ = this.getSourcesFromServer();
  }

  getSourcesFromServer(): Observable<Source> {
    return this.http.get<Source>(httpConstants.serverUrl +"/sources", { 'headers': httpConstants.header });
  }

  getSources():  Observable<Source>{
    return this.sources$;
  }

  getCurrentSource():string {
    return this.currentSource;
  }

  setCurrentSource(source:string) {
    this.currentSource = source;
  }
}
