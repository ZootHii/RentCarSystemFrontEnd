import { Component, OnInit } from '@angular/core';
import {Color} from "../../models/color";
import {ColorService} from "../../services/color.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ResponseModel} from "../../models/response/response.model";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {

  colors: Color[] = [];
  colorForm: FormGroup;
  dataLoaded: boolean = false;

  constructor(private colorService: ColorService, private formBuilder: FormBuilder, private toastrService: ToastrService, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.getAllColors();
    this.createColorForm();
  }

  createColorForm(){
    this.colorForm = this.formBuilder.group({
      id: [""],
      colorName: [""],
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

  addColor(){
    if (this.colorForm.valid){
      this.colorForm.removeControl("id");
      let colorModel = Object.assign({}, this.colorForm.value);
      this.colorService.addColor(colorModel).subscribe((response) => {
        console.log(response);
        this.toastrService.success(response.message);
        this.ngOnInit();
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    }
  }

  updateColor(colorId: number){
    if (this.colorForm.valid){
      let colorModel = Object.assign({}, this.colorForm.value);
      colorModel.id = colorId;
      this.colorService.updateColor(colorModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.ngOnInit();
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    }
  }

  deleteColor(colorId: number){
    if (this.colorForm.valid){
      this.colorForm.removeControl("colorName");
      let colorModel = Object.assign({}, this.colorForm.value);
      colorModel.id = colorId;
      this.colorService.deleteColor(colorModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.ngOnInit();
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    }
  }

  /*errorHandler(errorResponse: any){
    if (errorResponse.error.ValidationErrors){
      if (errorResponse.error.ValidationErrors.length > 0){
        for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++){
          this.toastrService.error(errorResponse.error.ValidationErrors[i].ErrorMessage);
        }
      }
    }
    else {
      this.toastrService.error(errorResponse.error.message);
    }
  }*/
}
