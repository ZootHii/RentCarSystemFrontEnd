import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "../../services/local-storage.service";
import {ErrorService} from "../../services/error.service";
import {CustomerService} from "../../services/customer.service";
import {UserService} from "../../services/user.service";
import {UserResponse} from "../../models/user-response";
import {Customer} from "../../models/customer";
import {UserEdit} from "../../models/user-edit";
import {Router, RouterLink} from "@angular/router";
import set = Reflect.set;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userResponse: UserResponse;
  customer: Customer;
  dataLoaded: boolean = false;

  isUpdated: boolean = false;
  isDeleted: boolean = false;

  userEditForm: FormGroup

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastrService: ToastrService,
              public localStorageService: LocalStorageService,
              private errorService: ErrorService,
              private customerService: CustomerService,
              private userService: UserService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(){
    this.userService.getUserResponseByEMail(this.localStorageService.getItem("eMail")!).subscribe((response) => {
      this.userResponse = response.data;
      this.customerService.getCustomerByUserId(this.userResponse.id).subscribe((customerResponse) => {
        this.customer = customerResponse.data;
        this.dataLoaded = true;
        this.createUserEditForm();
        console.log(this.customer);
      });
    });
  }

  createUserEditForm(){
    if (this.dataLoaded){
      this.userEditForm = this.formBuilder.group({
        id: [this.userResponse.id, Validators.required],
        firstName: [this.userResponse.firstName, Validators.required],
        lastName: [this.userResponse.lastName, Validators.required],
        eMail: [this.userResponse.eMail, Validators.required],
        companyName: [this.customer.companyName],
        currentPassword: ["", Validators.required],
        newPassword: [""],
      });
    }
  }

  updateUser(){
    if (this.userEditForm.valid){
      let userEditModel = Object.assign({}, this.userEditForm.value);
      this.userService.updateUser(userEditModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.isUpdated = true;
        this.getUserInfo();
        this.localStorageService.setItem("userName", this.userResponse.firstName+" "+this.userResponse.lastName);
        this.router.navigate(['/user/edit']);
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    } else {
      this.toastrService.error("Enter your password");
    }
  }

  deleteUser(){
    if (this.userEditForm.valid){
      let userEditModel = Object.assign({}, this.userEditForm.value);
      this.userService.deleteUser(userEditModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.isDeleted = true;
        this.router.navigate(['/#']);
        this.logout();
        //window.location.reload();
        //this.router.navigate("/app.component");
        //this.ngOnInit()
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    }
  }

  logout() {
    this.localStorageService.setItem("isLoggedIn", "false");
    this.localStorageService.removeItem("isLoggedIn");
    this.localStorageService.removeItem("token");
    this.localStorageService.removeItem("eMail");
    this.localStorageService.removeItem("userName");
  }

  updated(){
    if (this.isUpdated){
      this.ngOnInit();
    }
  }

  deleted(){
    if(this.isDeleted){
      this.router.navigate(['']);
    }
  }


}
