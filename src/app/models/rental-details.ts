import {Rental} from "./rental";

export interface RentalDetails extends Rental{
  brandName: string;
  modelYear: string;
  colorName: string;
  dailyPrice: number;
  description: string;
  firstName: string;
  lastName: string;
  eMail: string;
  companyName: string;
}
