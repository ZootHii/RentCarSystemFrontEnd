import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../models/response/data-response.model";
import {Rental} from "../models/rental";
import {RentalDetails} from "../models/rental-details";
import {ResponseModel} from "../models/response/response.model";

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl: string = "https://localhost:44355/Rentals/";

  constructor(private httpClient: HttpClient) { }

  getAllRentals(): Observable<DataResponseModel<Rental>>{
    return this.httpClient.get<DataResponseModel<Rental>>(this.apiUrl + "get/all");
  }

  getRentalsDetails(): Observable<DataResponseModel<RentalDetails>>{
    return this.httpClient.get<DataResponseModel<RentalDetails>>(this.apiUrl + "get/all/details");
  }

  addRental(rental : Rental): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", rental);
  }

}
