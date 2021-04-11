import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CarComponent} from './components/car/car.component';
import {BrandComponent} from './components/brand/brand.component';
import {ColorComponent} from './components/color/color.component';
import {CustomerComponent} from './components/customer/customer.component';
import {RentalComponent} from './components/rental/rental.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {FooterComponent} from "./components/footer/footer.component";
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { RentCarComponent } from './components/rent-car/rent-car.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { CarAdminComponent } from './components/car-admin/car-admin.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { UserEditComponent } from './components/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    NavbarComponent,
    FooterComponent,
    CarFilterComponent,
    CarFilterPipe,
    RentCarComponent,
    CarAdminComponent,
    BrandEditComponent,
    ColorEditComponent,
    CarEditComponent,
    LoginComponent,
    RegisterComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right" // https://www.npmjs.com/package/ngx-toastr
    })


  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
