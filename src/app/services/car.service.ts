import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../models/response/data-response.model";
import {Car} from "../models/car";
import {CarDetails} from "../models/car-details";
import {SingleDataResponseModel} from "../models/response/single-data-response.model";
import {ResponseModel} from "../models/response/response.model";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl: string = "https://localhost:44355/Cars/";

  constructor(private httpClient: HttpClient) { }

  getAllCars(): Observable<DataResponseModel<Car>>{
    return this.httpClient.get<DataResponseModel<Car>>(this.apiUrl + "get/all");
  }

  getAllCarsDetails(): Observable<DataResponseModel<CarDetails>>{
    return this.httpClient.get<DataResponseModel<CarDetails>>(this.apiUrl + "get/all/details");
  }

  getCarsByColor(colorId: number): Observable<DataResponseModel<Car>>{
    return this.httpClient.get<DataResponseModel<Car>>(this.apiUrl + "get/all/by/color/id?colorId=" + colorId);
  }

  getCarsByBrand(brandId: number): Observable<DataResponseModel<Car>>{
    return this.httpClient.get<DataResponseModel<Car>>(this.apiUrl + "get/all/by/brand/id?brandId=" + brandId);
  }

  getCarsDetailsByColor(colorId: number): Observable<DataResponseModel<CarDetails>>{
    return this.httpClient.get<DataResponseModel<CarDetails>>(this.apiUrl + "get/all/details/by/color/id?colorId=" + colorId);
  }

  getCarsDetailsByBrand(brandId: number): Observable<DataResponseModel<CarDetails>>{
    return this.httpClient.get<DataResponseModel<CarDetails>>(this.apiUrl + "get/all/details/by/brand/id?brandId=" + brandId);
  }

  getCarDetailsByCarId(carId: number): Observable<SingleDataResponseModel<CarDetails>>{
    return this.httpClient.get<SingleDataResponseModel<CarDetails>>(this.apiUrl + "get/details/by/car/id?carId=" + carId);
  }

  addCar(car: Car): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", car);
  }

  updateCar(car: Car): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update", car);
  }

  deleteCar(car: Car): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "delete", car);
  }

}
