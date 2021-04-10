import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreditCard} from "../models/credit-card";
import {Observable} from "rxjs";
import {ResponseModel} from "../models/response/response.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl: string = "https://localhost:44355/Payments/";

  constructor(private httpClient: HttpClient) {
  }

  addPayment(totalPrice: number): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", totalPrice);
  }
}
