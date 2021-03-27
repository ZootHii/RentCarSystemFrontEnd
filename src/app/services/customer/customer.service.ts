import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../../models/dataResponseModel";
import {CustomerDetails} from "../../models/customer/customerDetails";
import {Customer} from "../../models/customer/customer";

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
}
