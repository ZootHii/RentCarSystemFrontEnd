import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CarService} from "../../services/car.service";
import {CarDetails} from "../../models/car-details";
import {CarImage} from "../../models/car-image";
import {CarImageService} from "../../services/car-image.service";
import {ValueService} from "../../services/value.service";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails: CarDetails[];
  carImages: CarImage[] = [];
  carDetailsByCarId: CarDetails;
  carDetailsByCarIdLoaded: boolean = false;

  constructor(private carService: CarService,
              private carImageService: CarImageService,
              private activatedRoute: ActivatedRoute,
              public valueService: ValueService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]){
        this.getCarImagesByCarId(params["carId"]);
        this.getCarDetailsByCarId(params["carId"]);
      }
    })
  }

  getAllCarsDetails(){
    this.carService.getAllCarsDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarImagesByCarId(carId: number){
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  getCarDetailsByCarId(carId: number){
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetailsByCarId = response.data;
      this.carDetailsByCarIdLoaded = true;
    });
  }

}
