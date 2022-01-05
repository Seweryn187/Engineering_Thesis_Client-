import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { Source} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  header: HttpHeaders;
  serverUrl: string;
  sources$: Observable<Source>;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    this.serverUrl = "http://localhost:8080";
    this.sources$ = this.getSourcesFromServer();
  }

  getSourcesFromServer(): Observable<Source> {
    return this.http.get<Source>(this.serverUrl+"/sources", { 'headers': this.header });
  }

  getSources():  Observable<Source>{
    return this.sources$;
  }
}
