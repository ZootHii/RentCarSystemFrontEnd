import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../models/login";
import {Observable} from "rxjs";
import {SingleDataResponseModel} from "../models/response/single-data-response.model";
import {LocalStorageService} from "./local-storage.service";
import {UserResponse} from "../models/user-response";
import {Register} from "../models/register";
import {AccessToken} from "../models/access-token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = "https://localhost:44355/Auths/";

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
  }

  login(login: Login): Observable<SingleDataResponseModel<UserResponse>>{
    return this.httpClient.post<SingleDataResponseModel<UserResponse>>(this.apiUrl + "login", login);
  }

  register(register: Register): Observable<SingleDataResponseModel<AccessToken>>{
    return this.httpClient.post<SingleDataResponseModel<AccessToken>>(this.apiUrl + "register", register);

  }

  isAuthenticated(){
    if (this.localStorageService.getItem("token")){
      return true;
    }
    else {
      return false;
    }
  }

}
