import {Component, OnInit} from '@angular/core';
import {CarService} from "../../services/car/car.service";
import {Car} from "../../models/car/car";
import {CarDetails} from "../../models/car/carDetails";
import {Image} from "../../models/car/image";
import {Observable} from "rxjs";
import {DataResponseModel} from "../../models/dataResponseModel";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  image: Image;
  x: number = 0;
  carsDetails: CarDetails[] = [];

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    //this.getImage();
    //this.getAllCars();
    //this.getCarsDetails();
    this.activatedRoute.params.subscribe((params) => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
      } else if (params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      else {
        this.getAllCars();
      }
    });
  }

  getImage() {
    this.carService.getImage().subscribe((response) => {
      this.image = response.data;
    });
  }

  getAllCars() {
    this.carService.getAllCars().subscribe((response) => {
      if (response.success) {
        this.cars = response.data;
      }
    });
  }

  getCarsDetails() {
    this.carService.getCarsDetails().subscribe((response) => {
      if (response.success) {
        this.carsDetails = response.data;
      }
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }

}
