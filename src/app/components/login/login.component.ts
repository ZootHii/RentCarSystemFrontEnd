import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "../../services/local-storage.service";
import {ErrorService} from "../../services/error.service";
import {UserResponse} from "../../models/user-response";
import {ValueService} from "../../services/value.service";
import {Customer} from "../../models/customer";
import {Observable} from "rxjs";
import {SingleDataResponseModel} from "../../models/response/single-data-response.model";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoggedIn: boolean;
  user: UserResponse;
  customer: Customer;
  userName: string;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastrService: ToastrService,
              public localStorageService: LocalStorageService,
              private errorService: ErrorService,
              private customerService: CustomerService,
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.localStorageService.getItem("isLoggedIn") == "true";
    if (this.isLoggedIn) {
      this.userName = this.localStorageService.getItem("userName")!;
    }
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      eMail: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      console.log(this.loginForm.value);
      this.authService.login(loginModel).subscribe((response) => {
        console.log(response);
        this.toastrService.success(response.message);
        this.localStorageService.setItem("isLoggedIn", "true");
        this.localStorageService.setItem("eMail", response.data.eMail);
        this.user = response.data;
        console.log(this.user)
        this.localStorageService.setItem("token", response.data.accessToken.token);
        this.localStorageService.setItem("userName", response.data.firstName + " " + response.data.lastName);
        this.userName = this.localStorageService.getItem("userName")!;
        //this.ngOnInit();
        this.customerService.getCustomerByUserId(response.data.id).subscribe((customerResponse) => {
          this.customer = customerResponse.data;
          this.isLoggedIn = this.localStorageService.getItem('isLoggedIn') == "true";
          this.createLoginForm();
          //this.ngOnInit();
        });
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    }
  }

  logout() {
    this.localStorageService.setItem("isLoggedIn", "false");
    this.isLoggedIn = this.localStorageService.getItem('isLoggedIn') == "true";
    this.localStorageService.removeItem("isLoggedIn");
    this.localStorageService.removeItem("token");
    this.localStorageService.removeItem("eMail");
    this.localStorageService.removeItem("userName");
    this.toastrService.success("logged out");
    console.log(this.localStorageService.getItem("isLoggedIn"))
    this.ngOnInit();
  }

}
