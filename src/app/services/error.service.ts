import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService: ToastrService) { }

  errorHandler(errorResponse: any){
    if (errorResponse.error.ValidationErrors){
      if (errorResponse.error.ValidationErrors.length > 0){
        for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++){
          this.toastrService.error(errorResponse.error.ValidationErrors[i].ErrorMessage);
        }
      }
    }
    else {
      this.toastrService.error(errorResponse.error.message);
    }
  }

}
