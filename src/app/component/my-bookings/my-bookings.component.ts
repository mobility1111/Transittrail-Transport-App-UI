import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { Booking } from 'src/app/models/Booking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  error: string = '';

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.fetchBookings(userId);
    } else {
      this.error = 'User ID not found. Please log in again.';
    }
  }

  fetchBookings(userId: string): void {
    this.bookingService.getUserBookings(userId).subscribe({
      next: (data: any) => {
        this.bookings = data.map((booking: any) => ({
          ...booking,
          bookingDate: booking.createdAt ? new Date(booking.createdAt) : null,
          departureDate: booking.departureDate ? new Date(booking.departureDate) : null,
          route: booking.route || 'Not Available', // Handle null route
          seatQuantity: booking.seatQuantity || 0, // Handle null seatQuantity
          status: this.mapStatus(booking.status)
        }));
      },
      error: (error: any) => {
        console.error('Failed to fetch bookings:', error);
        this.error = 'Failed to fetch bookings. Please try again later.';
      }
    });
  }

  mapStatus(status: number): string {
    console.log('Mapping status:', status); // Debugging line

    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Confirmed';
      case 2:
        return 'Cancelled';
      case 3:
        return 'Completed';
      default:
        return `Unknown Status (${status})`; // Explicitly handle unexpected statuses
    }
  }

  viewBookingDetails(bookingId: string): void {
    // Navigate to the booking details page
    this.router.navigate(['/booking-details', bookingId]);
  }
}
