import {Component, OnInit} from '@angular/core';
import {Rental} from "../../models/rental/rental";
import {RentalDetails} from "../../models/rental/rentalDetails";
import {RentalService} from "../../services/rental/rental.service";

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals: Rental[] = [];
  rentalsDetails: RentalDetails[] = [];

  constructor(private rentalService: RentalService) {
  }

  ngOnInit(): void {
    this.getAllRentals();
    this.getRentalsDetails();
  }

  getAllRentals() {
    this.rentalService.getAllRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }

  getRentalsDetails() {
    this.rentalService.getRentalsDetails().subscribe((response) => {
      this.rentalsDetails = response.data;
    });
  }
}
