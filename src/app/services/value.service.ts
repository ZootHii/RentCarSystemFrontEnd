import { Injectable } from '@angular/core';
import {UserResponse} from "../models/user-response";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  selectedColorId: number = 0;
  selectedBrandId: number = 0;
  isRentCarComponentActive: boolean = false;

 /* customerId: number;
  private message = new BehaviorSubject<number>(9999);
  sharedMessage = this.message.asObservable();*/

  constructor() { }
/*
  nextMessage(message: number) {
    this.message.next(message)
  }*/
}
