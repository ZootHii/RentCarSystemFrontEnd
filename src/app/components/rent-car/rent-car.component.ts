import {Component, Input, OnInit} from '@angular/core';
import {ValueService} from "../../services/value.service";
import {CarDetails} from "../../models/car-details";
import {RentalService} from "../../services/rental.service";
import {ToastrService} from "ngx-toastr";
import {FormGroup, FormBuilder, Validators} from "@angular/forms"
import {CreditCardService} from "../../services/credit-card.service";
import {PaymentService} from "../../services/payment.service";
import {ErrorService} from "../../services/error.service";
import {LoginGuard} from "../../guards/login.guard";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../models/customer";
import {UserService} from "../../services/user.service";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})
export class RentCarComponent implements OnInit {
  @Input() carDetails: CarDetails;

  customer: Customer;

  rentalForm: FormGroup;
  /*  paymentForm: FormGroup;*/
  creditCardForm: FormGroup;
  expirationDateForm: FormGroup;

  isCarRented: boolean;
  today: Date = new Date();
  todayAsString: string;


  // todo ödemeyi ve kiralamayı buraan gönder serviceleri burada tut


  constructor(private creditCardService: CreditCardService,
              private paymentService: PaymentService,
              private rentalService: RentalService,
              private toastrService: ToastrService,
              private errorService: ErrorService,
              private loginGuard: LoginGuard,
              private customerService: CustomerService,
              public valueService: ValueService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private localStorageService: LocalStorageService,
              private formBuilder: FormBuilder) {
    this.todayAsString = this.today.getFullYear() + "-" + ("0" + (this.today.getMonth() + 1)).slice(-2) + "-" + ("0" + this.today.getDate()).slice(-2) + "T" + ("0" + (this.today.getHours())).slice(-2) + ":" + ("0" + (this.today.getMinutes())).slice(-2);
  }

  ngOnInit(): void {
    this.createRentalForm();
    /*this.createExpirationDateForm();*/
    this.createCreditCardForm();

  }

  getTotalPrice(): number {
    let totalPrice = this.getDayDifference() * this.carDetails.dailyPrice;
    return totalPrice;
  }

  /*getCustomerByUserId(userId: number){
    this.customerService.getCustomerByUserId(userId).subscribe((response) => {
      this.customer = response.data;
    });
  }*/

  getDayDifference(): number {
    let rentAsDate = new Date(this.rentalForm.get("rentDate")?.value);
    let returnAsDate = new Date(this.rentalForm.get("returnDate")?.value);
    if (rentAsDate >= this.today && returnAsDate >= rentAsDate) { // CHECK VALID
      let timeDiff = Math.abs(rentAsDate.getTime() - returnAsDate.getTime());
      if (timeDiff < (1000 * 3600 * 2)) { // CHECK AT LEAST 2 HOURS
        return 0;
      } else {
        let dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dayDifference;
      }
    }
    return 0;
  }

  createRentalForm() {
    this.rentalForm = this.formBuilder.group({
      carId: this.carDetails.id,
      customerId: "",
      rentDate: [this.todayAsString, Validators.required],
      returnDate: [this.todayAsString, Validators.required]
    })
  }

  /*  createExpirationDateForm() {
      this.expirationDateForm = this.formBuilder.group({
        expirationMonth: ["", Validators.required],
        expirationYear: ["", Validators.required]
      })
    }*/

  createCreditCardForm() {
    //id:
    //userId:
    //nameOnCard:
    //cardNumber:
    //expirationDate:
    //cvvNumber:
    this.creditCardForm = this.formBuilder.group({
      customerId: "", // customer id ye göre ver
      nameOnCard: ["", Validators.required],
      cardNumber: ["", Validators.required],
      expirationDate: this.formBuilder.group({
        expirationMonth: ["", Validators.required],
        expirationYear: ["", Validators.required]
      }),
      cvvNumber: ["", Validators.required]
    })
  }

  setSavedCreditCard() {

    if (this.loginGuard.canActivate(this.activatedRoute.snapshot, this.router.routerState.snapshot)) {
      this.userService.getUserResponseByEMail(this.localStorageService.getItem("eMail")!).subscribe((userResponse) => {
        this.customerService.getCustomerByUserId(userResponse.data.id).subscribe((response) => {
          this.customer = response.data;
          this.creditCardService.getCreditCardByCustomerId(this.customer.id).subscribe((getCreditCardResponse) => {

            let creditCardFormModel = getCreditCardResponse.data;

            this.creditCardForm.patchValue({
              customerId: creditCardFormModel.customerId,
              nameOnCard: creditCardFormModel.nameOnCard,
              cardNumber: creditCardFormModel.cardNumber,
              expirationDate: {
                expirationMonth: creditCardFormModel.expirationDate.slice(0,4),
                expirationYear: creditCardFormModel.expirationDate.slice(5,7)
              },
              cvvNumber: creditCardFormModel.cvvNumber,
            });

            console.log(this.creditCardForm.value)
          });
        }, (errorCustomer) => {
          this.errorService.errorHandler(errorCustomer);
        });
      }, (errorUserResponse) => {
        this.errorService.errorHandler(errorUserResponse);
      });
    } else {
      console.log("bbb");
    }
  }

  setRental(totalPrice: number) {

    //console.log("işe yaradı " + this.loginGuard.canActivate(this.activatedRoute.snapshot, this.router.routerState.snapshot));

    //this.getCustomerByUserId(this.valueService.user.userId);


    if (this.loginGuard.canActivate(this.activatedRoute.snapshot, this.router.routerState.snapshot)) {
      this.userService.getUserResponseByEMail(this.localStorageService.getItem("eMail")!).subscribe((userResponse) => {
        this.customerService.getCustomerByUserId(userResponse.data.id).subscribe((response) => {
          this.customer = response.data;


          console.log(totalPrice);
          if (this.rentalForm.valid) {
            let rentalModel = Object.assign({}, this.rentalForm.value);

            rentalModel.customerId = this.customer.id;

            console.log(rentalModel);
            if (this.creditCardForm.valid) {
              let creditCardModel = Object.assign({}, this.creditCardForm.value);
              creditCardModel.expirationDate = creditCardModel.expirationDate.expirationYear + "-" + ("0" + (creditCardModel.expirationDate.expirationMonth)).slice(-2) + "-01";
              creditCardModel.customerId = this.customer.id;
              console.log(creditCardModel);


              this.paymentService.addPayment(totalPrice).subscribe((responsePayment) => {
                this.toastrService.success(responsePayment.message);


                this.rentalService.addRental(rentalModel).subscribe((responseRental) => {
                  this.toastrService.success(responseRental.message);
                  console.log(responsePayment.message);

                  if (confirm("Do you want to save your credit card ? " + userResponse.data.firstName + " " + userResponse.data.lastName)) {
                    this.creditCardService.addCreditCard(creditCardModel).subscribe((responseCreditCard) => { // TODO ASK FOR ADDING CARD
                      this.toastrService.success(responseCreditCard.message);
                      this.isCarRented = true;
                    }, (errorCreditCard) => {
                      this.errorService.errorHandler(errorCreditCard);
                    });
                  }


                }, (errorPayment) => {
                  this.errorService.errorHandler(errorPayment);
                });
              }, (errorRental) => {
                this.errorService.errorHandler(errorRental);
              });
            } else {
              this.toastrService.error("fill all blanks");
            }
          }
        }, (errorCustomer) => {
          this.errorService.errorHandler(errorCustomer);
        });
      }, (errorUserResponse) => {
        this.errorService.errorHandler(errorUserResponse);
      });
    }
  }

  // todo use this when you make payment real
  /*  createPaymentForm() {
      //id:
      //customerId:
      //userId:
      //carId:
      //creditCardNumber:
      //totalPrice:
      this.paymentForm = this.formBuilder.group({})
    }*/


}
