import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string){
    return localStorage.getItem(key);
  }
  setItem(key: string, item: string){
    localStorage.setItem(key, item);
  }
  removeItem(key: string){
    localStorage.removeItem(key);
  }
}
