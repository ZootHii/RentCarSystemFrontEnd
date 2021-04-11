import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "../../services/local-storage.service";
import {ErrorService} from "../../services/error.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastrService: ToastrService,
              private localStorageService: LocalStorageService,
              private errorService: ErrorService,
              private router: Router,

  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      eMail: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({}, this.registerForm.value);
      console.log(this.registerForm.value);
      this.authService.register(registerModel).subscribe((response) => {
        console.log(response);
        this.toastrService.success(response.message);
        this.router.navigate(['']);
        //this.localStorageService.setItem("token", response.data.accessToken.token); // todo later after register log in too
      }, (errorResponse) => {
        this.errorService.errorHandler(errorResponse);
      });
    }
  }

}
