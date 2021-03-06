import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CarComponent} from "./components/car/car.component";
import {CarDetailComponent} from "./components/car-detail/car-detail.component";
import {CarAdminComponent} from "./components/car-admin/car-admin.component";
import {BrandEditComponent} from "./components/brand-edit/brand-edit.component";
import {ColorEditComponent} from "./components/color-edit/color-edit.component";
import {CarEditComponent} from "./components/car-edit/car-edit.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginGuard} from "./guards/login.guard";
import {UserEditComponent} from "./components/user-edit/user-edit.component";

const routes: Routes = [
  {path:"", pathMatch: "full", component: CarComponent},
  {path:"cars", component: CarComponent},
  {path:"cars/brand/:brandId", component: CarComponent},
  {path:"cars/color/:colorId", component: CarComponent},
  {path:"cars/details/:carId", component: CarDetailComponent},
  {path:"admin/panel", component: CarAdminComponent, canActivate: [LoginGuard]},
  {path:"admin/brand/edit", component: BrandEditComponent, canActivate: [LoginGuard]},
  {path:"admin/color/edit", component: ColorEditComponent, canActivate: [LoginGuard]},
  {path:"admin/car/edit/:carId", component: CarEditComponent, canActivate: [LoginGuard]},
  {path:"user/edit", component: UserEditComponent, canActivate: [LoginGuard]},
  {path:"register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
