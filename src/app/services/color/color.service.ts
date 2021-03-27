import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../../models/dataResponseModel";
import {Color} from "../../models/color/color";

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
}
