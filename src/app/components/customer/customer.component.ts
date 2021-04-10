import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../models/customer";
import {CustomerDetails} from "../../models/customer-details";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[] = [];
  customersDetails: CustomerDetails[] = [];

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCustomersDetails();
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe((response) => {
      if (response.success) {
        this.customers = response.data;
      }
    });
  }

  getCustomersDetails() {
    this.customerService.getCustomersDetails().subscribe((response) => {
      if (response.success) {
        this.customersDetails = response.data;
      }
    });
  }

}
