import {Component, OnInit} from '@angular/core';
import {Brand} from "../../models/brand/brand";
import {BrandService} from "../../services/brand/brand.service";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];
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

}
