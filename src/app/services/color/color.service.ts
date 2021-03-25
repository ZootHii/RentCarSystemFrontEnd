import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ColorResponseModel} from "../../models/color/colorResponseModel";

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl: string = "https://localhost:44355/Colors/";

  constructor(private httpClient: HttpClient) {
  }

  getAllColors(): Observable<ColorResponseModel> {
    return this.httpClient.get<ColorResponseModel>(this.apiUrl + "get/all");
  }
}
