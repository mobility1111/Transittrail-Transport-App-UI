import { Component, OnInit } from '@angular/core';
import { VehicleWithTransportLine } from 'src/app/DTOs/VehicleWithTransportLine';

import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
    selector: 'app-vehicle-list',
    templateUrl: './vehicle-list.component.html',
    styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
    vehicles: VehicleWithTransportLine[] = [];  // Use the updated model

    constructor(private vehicleService: VehicleService) {}

    ngOnInit(): void {
        this.vehicleService.getVehicles().subscribe(
            (data) => this.vehicles = data,
            (error) => console.error('Error fetching vehicles:', error)
        );
    }

    deleteVehicle(id: string): void {
        if (confirm('Are you sure you want to delete this vehicle?')) {
            this.vehicleService.deleteVehicle(id).subscribe(
                () => this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id),
                (error) => console.error('Error deleting vehicle:', error)
            );
        }
    }
}
