import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../../models/dataResponseModel";
import {Brand} from "../../models/brand/brand";

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
}
