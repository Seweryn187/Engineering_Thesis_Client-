import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/models";
import {httpConstants} from "../constants/http-constants";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User;

  constructor(private router: Router, private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.currentUser = {
      name: '',
      surname: '',
      email: '',
      login: '',
      password: '',
    };
  }

  getUserDataFromServer(email:string) {
    return this.http.get(httpConstants.serverUrl + "/user/" + email);
  }

  register(user: User) {
    return this.http.post(httpConstants.serverUrl +`/user/register`, user, { 'headers': httpConstants.header });
  }

  updateProfileChanges(user: User) {
    return this.http.patch(httpConstants.serverUrl +`/user/update/` + this.currentUser.email, user, { 'headers': httpConstants.header })
  }

  deleteUserProfile() {
    console.log(this.currentUser.email);
    this.http.delete(httpConstants.serverUrl + "/user/delete/" + this.currentUser.email).subscribe((data:any) =>{
      console.log(data);
    });

    this.tokenStorageService.signOut();
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUserParams(name:string, surname:string, email:string, login:string, password:string) {
   this.currentUser.name = name;
   this.currentUser.surname = surname;
   this.currentUser.email = email;
   this.currentUser.login = login;
   this.currentUser.password = password;
  }

  setCurrentUser(user:User) {
    this.currentUser = user;
  }
}
