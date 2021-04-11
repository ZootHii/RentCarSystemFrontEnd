import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../models/response/data-response.model";
import {Rental} from "../models/rental";
import {SingleDataResponseModel} from "../models/response/single-data-response.model";
import {User} from "../models/user";
import {UserResponse} from "../models/user-response";
import {UserEdit} from "../models/user-edit";
import {ResponseModel} from "../models/response/response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "https://localhost:44355/Users/";

  constructor(private httpClient: HttpClient) { }

  getUserResponseByEMail(eMail: string): Observable<SingleDataResponseModel<UserResponse>>{
    eMail.replace("@", "%40");
    return this.httpClient.get<SingleDataResponseModel<UserResponse>>(this.apiUrl + "get/response/by/email?eMail=" + eMail);
  }

  updateUser(userEdit: UserEdit): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update", userEdit);
  }

  deleteUser(userEdit: UserEdit): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "delete", userEdit);
  }

}
