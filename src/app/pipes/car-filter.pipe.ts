import { Pipe, PipeTransform } from '@angular/core';
import {CarDetails} from "../models/car-details";

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetails[], brandId: number, colorId: number): CarDetails[] {
    if (brandId == 0 && colorId != 0){
      return value.filter(item => item.colorId == colorId);
    } else if (colorId == 0 && brandId != 0){
      return value.filter(item => item.brandId == brandId);
    } else if (brandId == 0 && colorId == 0){
      return value;
    } else {
      return value.filter(item => item.brandId == brandId && item.colorId == colorId);
    }
  }
}
