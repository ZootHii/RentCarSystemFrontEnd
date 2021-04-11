import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../models/response/response.model";
import {CreditCard} from "../models/credit-card";
import {SingleDataResponseModel} from "../models/response/single-data-response.model";

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl: string = "https://localhost:44355/CreditCards/";

  constructor(private httpClient: HttpClient) { }

  addCreditCard(creditCard : CreditCard): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", creditCard);
  }

  getCreditCardByCustomerId(customerId : number): Observable<SingleDataResponseModel<CreditCard>>{
    return this.httpClient.get<SingleDataResponseModel<CreditCard>>(this.apiUrl + "get/by/customer/id?customerId=" + customerId);
  }

}
