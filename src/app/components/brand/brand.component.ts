import {Component, OnInit} from '@angular/core';
import {Brand} from "../../models/brand/brand";
import {BrandService} from "../../services/brand/brand.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];
  currentBrand: Brand;
  dataLoaded: boolean = false;


  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe((response) => {
      if (response.success) {
        this.brands = response.data;
        this.dataLoaded = true;
      }
    });
  }

  /*setCurrentBrand(brand: Brand){
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand: Brand){
    if (brand == this.currentBrand){
      return "list-group-item active"
    }
    return "list-group-item"
  }*/

}
