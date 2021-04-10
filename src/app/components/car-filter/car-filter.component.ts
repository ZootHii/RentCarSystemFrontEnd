import { Component, OnInit } from '@angular/core';
import {BrandService} from "../../services/brand.service";
import {ColorService} from "../../services/color.service";
import {Brand} from "../../models/brand";
import {Color} from "../../models/color";
import {ValueService} from "../../services/value.service";

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  brands: Brand[];
  colors: Color[];
  /*selectedColorId: number;
  selectedBrandId: number;*/

  constructor(public valueService: ValueService, private brandService: BrandService, private colorService: ColorService) { }

  ngOnInit(): void {
    this.getAllColors();
    this.getAllBrands();
  }



  getAllColors() {
    this.colorService.getAllColors().subscribe((response) => {
      if (response.success) {
        this.colors = response.data;
      }
    });
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe((response) => {
      if (response.success) {
        this.brands = response.data;
      }
    });
  }

  /*public getSelectedColorId(): number{
    return this.selectedColorId;
  }

  public getSelectedBrandId(): number{
    return this.selectedBrandId;
  }*/

}
