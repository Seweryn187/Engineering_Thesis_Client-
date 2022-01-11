import {HttpHeaders} from "@angular/common/http";

export class httpConstants {
  public static serverUrl:string = "http://localhost:8080";
  public static header:HttpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('responseType', 'text');
}
