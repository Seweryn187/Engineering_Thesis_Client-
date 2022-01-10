import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Source} from "../models/models";
import {httpConstants} from "../constants/http-constants";

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  sources$: Observable<Source>;

  constructor(private http: HttpClient) {
    this.sources$ = this.getSourcesFromServer();
  }

  getSourcesFromServer(): Observable<Source> {
    return this.http.get<Source>(httpConstants.serverUrl +"/sources", { 'headers': httpConstants.header });
  }

  getSources():  Observable<Source>{
    return this.sources$;
  }
}
