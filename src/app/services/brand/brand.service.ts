import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BrandResponseModel} from "../../models/brand/brandResponseModel";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl: string = "https://localhost:44355/Brands/";

  constructor(private httpClient: HttpClient) {
  }

  getAllBrands(): Observable<BrandResponseModel> {
    return this.httpClient.get<BrandResponseModel>(this.apiUrl + "get/all");
  }
}
