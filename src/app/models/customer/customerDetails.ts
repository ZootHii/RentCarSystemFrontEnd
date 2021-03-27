import {Customer} from "./customer";

export interface CustomerDetails extends Customer{
  firstName: string;
  lastName: string;
  eMail: string;
}
