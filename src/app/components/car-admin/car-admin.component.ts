import { Component, OnInit } from '@angular/core';
import {Car} from "../../models/car";
import {CarDetails} from "../../models/car-details";
import {ValueService} from "../../services/value.service";
import {CarService} from "../../services/car.service";
import {CarImageService} from "../../services/car-image.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-admin.component.html',
  styleUrls: ['./car-admin.component.css']
})
export class CarAdminComponent implements OnInit {

  cars: Car[];
  carsDetails: CarDetails[];
  dataLoaded: boolean = false;

  constructor(public valueService: ValueService, private carService: CarService, private carImageService: CarImageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["brandId"]) {
        this.getCarsDetailsByBrand(params["brandId"]);
      } else if (params["colorId"]){
        this.getCarsDetailsByColor(params["colorId"]);
      }
      else {
        this.getAllCarsDetails();
      }
    });
  }

  getAllCars() {
    this.carService.getAllCars().subscribe((response) => {
      if (response.success) {
        this.cars = response.data;
      }
    });
  }

  getAllCarsDetails() {
    this.carService.getAllCarsDetails().subscribe((response) => {
      if (response.success) {
        this.carsDetails = response.data;
        this.setPreviewImages(this.carsDetails);
        this.dataLoaded = true;
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

  getCarsDetailsByColor(colorId: number) {
    this.carService.getCarsDetailsByColor(colorId).subscribe((response) => {
      this.carsDetails = response.data;
      this.setPreviewImages(this.carsDetails);
    });
  }

  getCarsDetailsByBrand(brandId: number) {
    this.carService.getCarsDetailsByBrand(brandId).subscribe((response) => {
      this.carsDetails = response.data;
      this.setPreviewImages(this.carsDetails);
    });
  }

  setPreviewImages(carDetailsForCardImagePreview: CarDetails[]){
    carDetailsForCardImagePreview.forEach(carDetail => {
      this.carImageService.getCarImagesByCarId(carDetail.id).subscribe((response) => {
        carDetail.carImagePathForCard = response.data[0].imagePath;
      });
    });
  }


}
