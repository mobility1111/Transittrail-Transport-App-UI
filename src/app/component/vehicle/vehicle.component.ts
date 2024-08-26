import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/models/Vehicle.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicles: Vehicle[] = [];
  transportLineId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.transportLineId = this.route.snapshot.paramMap.get('transportLineId');
    if (this.transportLineId) {
      this.loadVehicles();
    }
  }

  loadVehicles(): void {
    if (this.transportLineId) {
      this.vehicleService.getVehiclesByTransportLine(this.transportLineId).subscribe(
        vehicles => this.vehicles = vehicles,
        error => console.error('Error loading vehicles:', error)
      );
    }
  }
}
