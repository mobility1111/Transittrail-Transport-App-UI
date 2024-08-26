import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  bookingInProgress: boolean = false;
  bookingError: string = '';
  routeDescription: string = '';

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const amount = params['amount'];
      const paymentType = params['paymentType'];
      const originTerminalName = params['originTerminalName'];
      const destinationTerminalName = params['destinationTerminalName'];
      this.routeDescription = `${originTerminalName} to ${destinationTerminalName}`;

      const baseForm = {
        amount: [amount || '', [Validators.required, Validators.min(1)]],
        email: ['', [Validators.required, Validators.email]],
        paymentType: [paymentType || '', [Validators.required]],
        userId: [this.authService.getUserIdFromToken(), Validators.required],
      };

      if (paymentType === 'booking') {
        this.bookingForm = this.fb.group({
          ...baseForm,
          fullName: ['', Validators.required],
          phoneNumber:  ['', []],
          transportLineName: [params['transportLineName'],],
          vehicleType: [params['vehicleType'],],
          originTerminalName: [originTerminalName || '',],
          destinationTerminalName: [destinationTerminalName || '', ],
          route: [this.routeDescription,],
          departureDate: [params['departureDate'], Validators.required],
          seatQuantity: [params['seatQuantity'], [Validators.required, Validators.min(1)]]
        });
      } 
      
      if (paymentType === 'subscription') {
        this.bookingForm = this.fb.group(baseForm);
      }
  
      console.log("Initialized booking form with values: ", this.bookingForm.value);
    });

    this.bookingForm.statusChanges.subscribe(status => {
      console.log('Form status:', status);
    });
  }

  initiatePayment() {
    if (this.bookingForm.valid && !this.bookingInProgress) {
      this.bookingInProgress = true;
      const paymentData = this.bookingForm.value;

      // Log paymentData to debug what is being sent
      console.log("Initiating payment with data: ", paymentData);

      this.paymentService.initiatePayment(paymentData).subscribe(
        (response) => {
          // Handle success response
          console.log('Payment initiated successfully:', response);
          // Redirect user to payment gateway or show success message
          window.location.href = response.data.authorization_url;
        },
        (error) => {
          this.bookingError = 'Failed to initiate payment. Please try again later.';
          this.bookingInProgress = false;
        }
      );
    } else {
      console.log("Form is invalid or payment is in progress.");
      console.log("Form errors: ", this.bookingForm.errors);
    }
  }
}







// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
// import { PaymentService } from 'src/app/services/payment.service';

// @Component({
//   selector: 'app-booking-form',
//   templateUrl: './booking-form.component.html',
//   styleUrls: ['./booking-form.component.css']
// })
// export class BookingFormComponent implements OnInit {
//   bookingForm!: FormGroup;
//   bookingInProgress: boolean = false;
//   bookingError: string = '';
//   routeDescription: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private paymentService: PaymentService,
//     private route: ActivatedRoute,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       const totalPrice = params['totalPrice'];
//       const paymentType = params['paymentType'];
//       const originTerminalName = params['originTerminalName'];
//       const destinationTerminalName = params['destinationTerminalName'];
//       this.routeDescription = `${originTerminalName} to ${destinationTerminalName}`;

//       const baseForm = {
//         amount: [totalPrice || '', [Validators.required, Validators.min(1)]],
//         email: ['', [Validators.required, Validators.email]],
//         paymentType: [paymentType || '', [Validators.required]],
//         userId: [this.authService.getUserIdFromToken(), Validators.required],
//       };

//       if (paymentType === 'booking') {
//         this.bookingForm = this.fb.group({
//           ...baseForm,
//           fullName: ['', Validators.required],
//           phoneNumber:  ['', []] ,
//           transportLineName: [params['transportLineName'],],
//           vehicleType: [params['vehicleType'],],
//           originTerminalName: [originTerminalName || '',],
//           destinationTerminalName: [destinationTerminalName || '', ],
//           route: [this.routeDescription,]
//         });
//       } 
      
//       if (paymentType === 'subscription') {
//         this.bookingForm = this.fb.group(baseForm);
//       }
  
//       console.log("Initialized booking form with values: ", this.bookingForm.value);
//     });

//     this.bookingForm.statusChanges.subscribe(status => {
//       console.log('Form status:', status);
//     });
//   }

//   initiatePayment() {
//     if (this.bookingForm.valid && !this.bookingInProgress) {
//       this.bookingInProgress = true;
//       const paymentData = this.bookingForm.value;

//       // Log paymentData to debug what is being sent
//       console.log("Initiating payment with data: ", paymentData);

//       this.paymentService.initiatePayment(paymentData).subscribe(
//         (response) => {
//           // Handle success response
//           console.log('Payment initiated successfully:', response);
//           // Redirect user to payment gateway or show success message
//           window.location.href = response.data.authorization_url;
//         },
//         (error) => {
//           this.bookingError = 'Failed to initiate payment. Please try again later.';
//           this.bookingInProgress = false;
//         }
//       );
//     } else {
//       console.log("Form is invalid or payment is in progress.");
//       console.log("Form errors: ", this.bookingForm.errors);
//     }
//   }
// }



















