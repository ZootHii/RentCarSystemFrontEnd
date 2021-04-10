import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../models/response/data-response.model";
import {Color} from "../models/color";
import {Brand} from "../models/brand";
import {ResponseModel} from "../models/response/response.model";

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl: string = "https://localhost:44355/Colors/";

  constructor(private httpClient: HttpClient) {
  }

  getAllColors(): Observable<DataResponseModel<Color>> {
    return this.httpClient.get<DataResponseModel<Color>>(this.apiUrl + "get/all");
  }

  addColor(color: Color): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", color);
  }

  updateColor(color: Color): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update", color);
  }

  deleteColor(color: Color): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "delete", color);
  }

}
