import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../../models/dataResponseModel";
import {Rental} from "../../models/rental/rental";
import {RentalDetails} from "../../models/rental/rentalDetails";

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
}
