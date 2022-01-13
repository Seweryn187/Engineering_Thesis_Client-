import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Alert} from "../models/models";
import {httpConstants} from "../constants/http-constants";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts$: Observable<Alert>;

  constructor(private http: HttpClient, private userService: UserService) {
    this.alerts$ = this.getUserAlertsFromServer(this.userService.currentUser.email);
  }

  getUserAlertsFromServer(email:string): Observable<Alert> {
    let link = encodeURI(httpConstants.serverUrl + "/alerts/" + email);
    return this.http.get<Alert>(link, { 'headers': httpConstants.header });
  }

  addNewAlert(alert:Alert) {
    let link = encodeURI(httpConstants.serverUrl + "/alerts/add");
    return this.http.post<Alert>(link, alert, { 'headers': httpConstants.header });
  }

  deleteAlert(alertId: number | undefined) {
    let link = encodeURI(httpConstants.serverUrl + "/alerts/delete/" + alertId);
    return this.http.delete<Alert>(link,{ 'headers': httpConstants.header });
  }
}
