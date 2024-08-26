import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/models/Booking';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  booking: Booking | null = null;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.fetchBookingDetails();
  }

  fetchBookingDetails() {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (bookingId) {
      this.bookingService.getBookingDetails(bookingId).subscribe(
        (data) => {
          this.booking = {
            ...data,
            // Convert dates if necessary
            createdAt: new Date(data.createdAt),
            departureDate: data.departureDate ? new Date(data.departureDate) : null
          };
        },
        (error) => {
          console.error('Failed to fetch booking details:', error);
          this.error = 'Failed to fetch booking details. Please try again later.';
        }
      );
    } else {
      this.error = 'Booking ID not found.';
    }
  }
}
