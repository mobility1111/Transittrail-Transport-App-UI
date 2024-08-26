// src/app/models/Booking.ts
import { BookingStatus } from '../enums/BookingStatus';

export interface Booking {
  id: string;
  userId: string;
  fullName: string;
  route: string; // Make sure this matches the field name from the backend
  
  phoneNumber: string;
  email: string;
  originTerminalName: string;
  destinationTerminalName: string;
  transportLineName: string;
  vehicleType: string;
  amount: number;
  departureDate: Date | null;
  seatQuantity: number;
  status: BookingStatus;
  bookingDate: Date | null;
  createdAt: Date; // Adjust type if needed
}
