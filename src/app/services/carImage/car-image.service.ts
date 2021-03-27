import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../../models/dataResponseModel";
import {CarImage} from "../../models/carImage/carImage";

@Injectable({
  providedIn: 'root'
})
export class CarImageService {


  apiUrl: string = "https://localhost:44355/CarImages/";

  constructor(private httpClient: HttpClient) { }

  getCarImagesByCarId(carId: number): Observable<DataResponseModel<CarImage>>{
    return this.httpClient.get<DataResponseModel<CarImage>>(this.apiUrl + "get/all/by/car/id?carId=" + carId);
  }
}
