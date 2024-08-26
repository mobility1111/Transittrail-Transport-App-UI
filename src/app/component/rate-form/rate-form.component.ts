import { Component, OnInit } from '@angular/core';
import { RateService } from '../../services/rate.service';
import { TransportLineService } from '../../services/transport-line.service';
import { VehicleService } from '../../services/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Rate } from '../../models/Rate.model';

@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.css']
})
export class RateFormComponent implements OnInit {
  rate: Rate = {
    id: '',
    roouteName: '',
    transportLineId: '',
    vehicleName: '',
    transportLineName: '',
    price: 0,
    date: new Date(),
    vehicleId: '',
    vehicleType: '',
    originTerminalName: '',
    destinationTerminalName: ''
  };
  transportLines: any[] = [];
  vehicles: any[] = [];
  isEditMode = false;

  constructor(
    private rateService: RateService,
    private transportLineService: TransportLineService,
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.rateService.getRateById(id).subscribe(
        (data: Rate) => this.rate = data,
        error => console.error('Error loading rate:', error)
      );
    }
    this.fetchTransportLines();
    this.fetchVehicles();
  }

  fetchTransportLines(): void {
    this.transportLineService.getTransportLines().subscribe(
      (data: any[]) => {
        this.transportLines = data;
      },
      error => {
        console.error('Error fetching transport lines', error);
      }
    );
  }

  fetchVehicles(): void {
    this.vehicleService.getVehicles().subscribe(
      (data: any[]) => {
        this.vehicles = data;
      },
      error => {
        console.error('Error fetching vehicles', error);
      }
    );
  }

  submit(): void {
    if (this.isEditMode) {
      this.rateService.updateRate(this.rate.id, this.rate).subscribe(
        () => {
          console.log('Rate updated successfully');
          alert('Rate updated successfully');
          this.router.navigate(['/rates']);
        },
        error => {
          console.error('Error updating rate:', error);
          alert('Failed to update rate');
        }
      );
    } else {
      this.rateService.addRate(this.rate).subscribe(
        (data: Rate) => {
          console.log('Rate added:', data);
          alert('Rate added successfully');
          this.router.navigate(['/rates']);
        },
        error => {
          console.error('Error:', error);
          alert('Failed to add rate');
        }
      );
    }
  }
}