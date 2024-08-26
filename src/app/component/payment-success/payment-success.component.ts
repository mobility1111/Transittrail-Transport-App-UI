import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AuthService } from 'src/app/services/auth.service';
import { SubscriptionType } from 'src/app/models/SubscriptionType.model';
import { BookingService } from 'src/app/services/booking.service';
import { PlaceBookingRequest } from 'src/app/models/PlaceOrderRequest';


@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  subscriptionTypes: SubscriptionType[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private auth: AuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const paymentType = params['paymenttype'];
      const amountString = params['amount'];

      if (paymentType === 'subscription') {
        const amount = amountString ? parseFloat(amountString) : undefined;
        if (amount !== undefined) {
          this.getSubscriptionType(amount);
        } else {
          console.error('Invalid amount value received from the backend.');
        }
      } else if (paymentType === 'booking') {
        this.placeBooking();
      } else {
        console.log('Payment type is not recognized.');
      }
    });
  }

  getSubscriptionType(amount: number): void {
    this.subscriptionService.getAllSubscriptionTypes().subscribe({
      next: (types: SubscriptionType[]) => {
        this.subscriptionTypes = types;
        const subscriptionType = this.subscriptionTypes.find(type => type.price === amount);
        if (subscriptionType) {
          this.subscribe(subscriptionType, amount);
        } else {
          console.error('No subscription type found for the given amount.');
        }
      },
      error: (error) => {
        console.error('Failed to fetch subscription types:', error);
      }
    });
  }

  subscribe(subscriptionType: SubscriptionType, amount: number): void {
    const userId = this.auth.getUserIdFromToken();
    if (!userId) {
      console.error('User ID not available');
      return;
    }

    this.subscriptionService.addUserSubscription(userId, subscriptionType.id, amount).subscribe({
      next: (data: any) => {
        console.log('Subscription added successfully:', data);
        // Handle success response for subscription
      },
      error: (error: any) => {
        console.error('Failed to add subscription:', error);
        // Handle error response for subscription
      }
    });
  }

  placeBooking(): void {
    const userId = this.auth.getUserIdFromToken();
    if (!userId) {
      console.error('User ID not available');
      return;
    }

    const placeBookingRequest: PlaceBookingRequest = {
      userId
      // Add any other necessary fields for the booking
    };

    this.bookingService.placeBooking(placeBookingRequest).subscribe({
      next: (bookingId: string) => {
        console.log('Booking placed successfully. Booking ID:', bookingId);
        // Handle success response for placing booking
      },
      error: (error: any) => {
        if (error.status === 400) {
          console.error('Bad request error:', error.error);
        } else {
          console.error('Failed to place booking:', error);
        }
        // Handle error response for placing booking
      }
    });
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}




// goToHomePage() {
//   this.router.navigate(['/']);
// }
