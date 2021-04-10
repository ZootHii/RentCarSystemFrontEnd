import {Component, OnInit} from '@angular/core';
import {Color} from "../../models/color";
import {ColorService} from "../../services/color.service";

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors: Color[] = [];
  dataLoaded: boolean = false;

  constructor(private colorService: ColorService) {
  }

  ngOnInit(): void {
    this.getAllColors();
  }

  getAllColors() {
    this.colorService.getAllColors().subscribe((response) => {
      if (response.success) {
        this.colors = response.data;
        this.dataLoaded = true;
      }
    });
  }
}
