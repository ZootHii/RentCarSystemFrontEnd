import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../../models/dataResponseModel";
import {Car} from "../../models/car/car";
import {CarDetails} from "../../models/car/carDetails";
import {Image} from "../../models/car/image";
import {ResponseModelT} from "../../models/responseModelT";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl: string = "https://localhost:44355/Cars/";

  constructor(private httpClient: HttpClient) { }

  getAllCars(): Observable<DataResponseModel<Car>>{
    return this.httpClient.get<DataResponseModel<Car>>(this.apiUrl + "get/all");
  }

  getCarsDetails(): Observable<DataResponseModel<CarDetails>>{
    return this.httpClient.get<DataResponseModel<CarDetails>>(this.apiUrl + "get/all/details");
  }

  getCarsByColor(colorId: number): Observable<DataResponseModel<Car>>{
    return this.httpClient.get<DataResponseModel<Car>>(this.apiUrl + "get/all/by/color/id?colorId=" + colorId);
  }

  getCarsByBrand(brandId: number): Observable<DataResponseModel<Car>>{
    return this.httpClient.get<DataResponseModel<Car>>(this.apiUrl + "get/all/by/brand/id?brandId=" + brandId);
  }

  getImage(): Observable<ResponseModelT<Image>>{
    let videoPath = "https://localhost:44355/CarImages/get/by/id?id=4";
    let imagePath2 = "https://localhost:44355/CarImages/get/by/id?id=2"
    let imagePath1 = "https://localhost:44355/CarImages/get/by/id?id=1"
    return this.httpClient.get<ResponseModelT<Image>>(videoPath);
  }
}
