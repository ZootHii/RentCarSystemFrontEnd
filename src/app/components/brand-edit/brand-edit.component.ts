import { Component, OnInit } from '@angular/core';
import {Brand} from "../../models/brand";
import {BrandService} from "../../services/brand.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {

  brands: Brand[] = [];
  currentBrand: Brand;
  brandForm: FormGroup;
  dataLoaded: boolean = false;


  constructor(private brandService: BrandService, private formBuilder: FormBuilder, private toastrService: ToastrService, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.getAllBrands();
    this.createBrandForm();
  }

  createBrandForm(){
    this.brandForm = this.formBuilder.group({
      id: [""],
      brandName: [""],
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

  addBrand(){
    if (this.brandForm.valid){
      this.brandForm.removeControl("id");
      let brandModel = Object.assign({}, this.brandForm.value);
      this.brandService.addBrand(brandModel).subscribe((response) => {
        console.log(response);
        this.toastrService.success(response.message);
        this.ngOnInit();
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    }
  }

  updateBrand(brandId: number){
    if (this.brandForm.valid){
      let brandModel = Object.assign({}, this.brandForm.value);
      brandModel.id = brandId;
      this.brandService.updateBrand(brandModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.ngOnInit();
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    }
  }

  deleteBrand(brandId: number){
    if (this.brandForm.valid){
      this.brandForm.removeControl("brandName");
      let brandModel = Object.assign({}, this.brandForm.value);
      brandModel.id = brandId;
      this.brandService.deleteBrand(brandModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.ngOnInit();
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    }
  }
}
