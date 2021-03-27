import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CarService} from "../../services/car/car.service";
import {CarDetails} from "../../models/car/carDetails";
import {CarImage} from "../../models/carImage/carImage";
import {CarImageService} from "../../services/carImage/car-image.service";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails: CarDetails[] = [];
  carImages: CarImage[] = [];
  constructor(private carService: CarService,private carImageService: CarImageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]){
        this.getCarImagesByCarId(params["carId"]);
      }
    })
  }

  getCarDetails(){
    this.carService.getCarsDetails().subscribe((response) => {
      this.carDetails = response.data;
    })
  }

  getCarImagesByCarId(carId: number){
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    })
  }

}
