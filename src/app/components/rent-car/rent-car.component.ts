import {Component, Input, OnInit} from '@angular/core';
import {ValueService} from "../../services/value.service";
import {CarDetails} from "../../models/car-details";
import {RentalService} from "../../services/rental.service";
import {ToastrService} from "ngx-toastr";
import {FormGroup, FormBuilder, Validators} from "@angular/forms"
import {CreditCardService} from "../../services/credit-card.service";
import {PaymentService} from "../../services/payment.service";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})
export class RentCarComponent implements OnInit {
  @Input() carDetails: CarDetails;
  //@Input ile user ı da al
  rentalForm: FormGroup;
  paymentForm: FormGroup;
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
              public valueService: ValueService,
              private formBuilder: FormBuilder) {
    this.todayAsString = this.today.getFullYear() +"-"+("0" + (this.today.getMonth() + 1)).slice(-2)+"-"+("0" + this.today.getDate()).slice(-2)+"T"+("0" + (this.today.getHours())).slice(-2)+":"+("0" + (this.today.getMinutes())).slice(-2);
  }

  ngOnInit(): void {
    this.createRentalForm();
    this.createExpirationDateForm();
    this.createCreditCardForm();
  }

  getTotalPrice(): number{
    let totalPrice = this.getDayDifference() * this.carDetails.dailyPrice;
    return totalPrice;
  }

  getDayDifference(): number{
    let rentAsDate = new Date(this.rentalForm.get("rentDate")?.value);
    let returnAsDate = new Date(this.rentalForm.get("returnDate")?.value);
    if (rentAsDate >= this.today && returnAsDate >= rentAsDate){ // CHECK VALID
      let timeDiff = Math.abs(rentAsDate.getTime() - returnAsDate.getTime());
      if (timeDiff < (1000 * 3600 * 2)){ // CHECK AT LEAST 2 HOURS
        return 0;
      } else {
        let dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dayDifference;
      }
    }
    return 0;
  }

  createRentalForm(){
    this.rentalForm = this.formBuilder.group({
      carId: this.carDetails.id,
      customerId: 3, // user daha eklenmedi eklenecek
      rentDate: [this.todayAsString, Validators.required],
      returnDate: [this.todayAsString, Validators.required]
    })
  }

  createExpirationDateForm(){
    this.expirationDateForm = this.formBuilder.group({
      expirationMonth: ["", Validators.required],
      expirationYear: ["", Validators.required]
    })
  }

  createCreditCardForm(){
    //id:
    //userId:
    //nameOnCard:
    //cardNumber:
    //expirationDate:
    //cvvNumber:
    this.creditCardForm = this.formBuilder.group({
      userId: 1,
      nameOnCard: ["", Validators.required],
      cardNumber: ["", Validators.required],
      expirationDate: this.formBuilder.group({
        expirationMonth: ["", Validators.required],
        expirationYear: ["", Validators.required]
      }),
      cvvNumber: ["", Validators.required]
    })
  }



  setRental(totalPrice: number){

    console.log(totalPrice);

    if (this.rentalForm.valid) {
      let rentalModel = Object.assign({}, this.rentalForm.value);
      console.log(rentalModel);
      if (this.creditCardForm.valid){
        let creditCardModel = Object.assign({}, this.creditCardForm.value);
        creditCardModel.expirationDate = creditCardModel.expirationDate.expirationYear + "-" + ("0" + (creditCardModel.expirationDate.expirationMonth)).slice(-2) + "-01" ;
        console.log(creditCardModel);
        this.paymentService.addPayment(totalPrice).subscribe((responsePayment) => {
          this.toastrService.success(responsePayment.message);
            this.rentalService.addRental(rentalModel).subscribe((responseRental)=> {
                this.toastrService.success(responseRental.message);
                console.log(responsePayment.message);
                this.creditCardService.addCreditCard(creditCardModel).subscribe((responseCreditCard) => { // TODO ASK FOR ADDING CARD
                    this.toastrService.success(responseCreditCard.message);
                    this.isCarRented = true;
                }, (errorCreditCard) => {
                  this.errorService.errorHandler(errorCreditCard);
                });
            }, (errorPayment) => {
              this.errorService.errorHandler(errorPayment);
            });
        }, (errorRental) => {
          this.errorService.errorHandler(errorRental);
        });
      }
    }
  }

  // todo use this when you make payment real
  createPaymentForm(){
    //id:
    //customerId:
    //userId:
    //carId:
    //creditCardNumber:
    //totalPrice:
    this.paymentForm = this.formBuilder.group({

    })
  }


}
