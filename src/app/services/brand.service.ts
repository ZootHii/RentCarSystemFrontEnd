import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../models/response/data-response.model";
import {Brand} from "../models/brand";
import {ResponseModel} from "../models/response/response.model";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl: string = "https://localhost:44355/Brands/";

  constructor(private httpClient: HttpClient) {
  }

  getAllBrands(): Observable<DataResponseModel<Brand>> {
    return this.httpClient.get<DataResponseModel<Brand>>(this.apiUrl + "get/all");
  }

  addBrand(brand: Brand): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", brand);
  }

  updateBrand(brand: Brand): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update", brand);
  }

  deleteBrand(brand: Brand): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "delete", brand);
  }

}
