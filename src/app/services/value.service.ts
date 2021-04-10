import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  selectedColorId: number = 0;
  selectedBrandId: number = 0;
  isRentCarComponentActive: boolean = false;

  constructor() {
  }
}
