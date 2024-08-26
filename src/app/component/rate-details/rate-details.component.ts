import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RateService } from '../../services/rate.service';
import { Rate } from '../../models/Rate.model';

@Component({
  selector: 'app-rate-details',
  templateUrl: './rate-details.component.html',
  styleUrls: ['./rate-details.component.css']
})
export class RateDetailsComponent implements OnInit {
  rate: Rate | null = null;

  constructor(
    private route: ActivatedRoute,
    private rateService: RateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRateDetails();
  }

  loadRateDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.rateService.getRateById(id).subscribe(
        rate => this.rate = rate,
        error => console.error('Error loading rate details:', error)
      );
    }
  }

  bookNow(): void {
    if (this.rate) {
      const queryParams = {
        roouteName: this.rate.roouteName,
        transportLineName: this.rate.transportLineName,
        vehicleType: this.rate.vehicleType,
        totalPrice: this.rate.price,
        date: this.rate.date,
        paymentType: 'booking'
      };
      this.router.navigate(['/booking-form'], { queryParams });
    } else {
      console.error('Invalid rate details:', this.rate);
    }
  }
}