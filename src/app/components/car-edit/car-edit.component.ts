import { Component, OnInit } from '@angular/core';
import {CarDetails} from "../../models/car-details";
import {CarImage} from "../../models/car-image";
import {CarService} from "../../services/car.service";
import {CarImageService} from "../../services/car-image.service";
import {ActivatedRoute} from "@angular/router";
import {ValueService} from "../../services/value.service";
import {Brand} from "../../models/brand";
import {BrandService} from "../../services/brand.service";
import {ColorService} from "../../services/color.service";
import {Color} from "../../models/color";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  brands: Brand[] = [];
  currentBrand: Brand;
  dataLoaded: boolean = false;

  carForm: FormGroup;

  colors: Color[] = [];
  currentColor: Color;

  today: Date = new Date();
  selectedColorId: number;
  selectedBrandId: number;
  selectedModelYear: number;
  selectedDailyPrice: number;
  selectedDescription: string;

  carDetails: CarDetails[];
  carImages: CarImage[] = [];
  carDetailsByCarId: CarDetails;
  carDetailsByCarIdLoaded: boolean = false;

  constructor(private carService: CarService,
              private carImageService: CarImageService,
              public activatedRoute: ActivatedRoute,
              private brandService: BrandService,
              private colorService: ColorService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private errorService: ErrorService,
              public valueService: ValueService,
              ) {

  }

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"] && params["carId"] != 0){
        this.getCarImagesByCarId(params["carId"]);
        this.getCarDetailsByCarId(params["carId"]);
      }
    });
  }

  createCarForm(){
    this.carForm = this.formBuilder.group({
      id: [""],
      brandId: [this.selectedBrandId, Validators.required],
      colorId: [this.selectedColorId, Validators.required],
      modelYear: [this.selectedModelYear, Validators.required],
      dailyPrice: [this.selectedDailyPrice, Validators.required],
      description: [this.selectedDescription],
    });
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
      this.selectedBrandId = this.carDetailsByCarId.brandId;
      this.selectedColorId = this.carDetailsByCarId.colorId;
      this.selectedModelYear = +this.carDetailsByCarId.modelYear.slice(0,4);
      this.selectedDailyPrice = this.carDetailsByCarId.dailyPrice;
      this.selectedDescription = this.carDetailsByCarId.description;
    });
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe((response) => {
      if (response.success) {
        this.brands = response.data;
        this.dataLoaded = true;
      }
    });
  }

  getAllColors() {
    this.colorService.getAllColors().subscribe((response) => {
      if (response.success) {
        this.colors = response.data;
        this.dataLoaded = true;
      }
    });
  }

  addCar(){
    this.createCarForm();
    if (this.carForm.valid){
      this.carForm.removeControl("id");
      let carModel = Object.assign({}, this.carForm.value);
      carModel.modelYear = carModel.modelYear + "-01" + "-01"

      console.log(carModel)

      this.carService.addCar(carModel).subscribe((response) => {
        console.log(response);
        this.toastrService.success(response.message);
        this.ngOnInit();
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    }
    else {
      this.toastrService.error("Fill all blanks properly");
    }
  }

  updateCar(carId: number){
    this.createCarForm();
    if (this.carForm.valid){
      let carModel = Object.assign({}, this.carForm.value);
      carModel.id = carId;
      carModel.modelYear = carModel.modelYear + "-01" + "-01"
      console.log(carModel)

      this.carService.updateCar(carModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.ngOnInit();
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    }
  }

  deleteCar(carId: number){
    this.createCarForm();
    let carModel = Object.assign({}, this.carForm.value);
    carModel.id = carId;
    carModel.modelYear = carModel.modelYear + "-01" + "-01"
    console.log(carModel)

    this.carService.deleteCar(carModel).subscribe((response) => {
      this.toastrService.success(response.message);
      this.ngOnInit();
    }, (errorResponse) => {
      this.errorService.errorHandler(errorResponse);
    });
  }
}
