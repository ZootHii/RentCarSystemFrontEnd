import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../models/response/data-response.model";
import {CustomerDetails} from "../models/customer-details";
import {Customer} from "../models/customer";
import {SingleDataResponseModel} from "../models/response/single-data-response.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl: string = "https://localhost:44355/Customers/";

  constructor(private httpClient: HttpClient) { }

  getAllCustomers(): Observable<DataResponseModel<Customer>>{
    return this.httpClient.get<DataResponseModel<Customer>>(this.apiUrl + "get/all");
  }

  getCustomersDetails(): Observable<DataResponseModel<CustomerDetails>> {
    return this.httpClient.get<DataResponseModel<CustomerDetails>>(this.apiUrl + "get/all/details");
  }

  getCustomerByUserId(userId: number): Observable<SingleDataResponseModel<Customer>>{
    return this.httpClient.get<SingleDataResponseModel<Customer>>(this.apiUrl + "get/by/user/id?userId=" + userId);
  }

}
