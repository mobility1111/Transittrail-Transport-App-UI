import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TerminalService } from '../../services/terminal.service';
import { TransportLineService } from '../../services/transport-line.service';
import { VehicleService } from '../../services/vehicle.service';
import { Terminal } from 'src/app/models/Terminal.model';
import { TransportLineWithTerminal } from 'src/app/DTOs/TransportLineWithTerminal';
import { VehicleWithTransportLine } from 'src/app/DTOs/VehicleWithTransportLine';

@Component({
  selector: 'app-route-selector',
  templateUrl: './route-selector.component.html',
  styleUrls: ['./route-selector.component.css']
})
export class RouteSelectorComponent implements OnInit {

  routeForm!: FormGroup;
  terminals: Terminal[] = [];
  transportLines: TransportLineWithTerminal[] = [];
  vehicles: VehicleWithTransportLine[] = [];
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private terminalService: TerminalService,
    private transportLineService: TransportLineService,
    private vehicleService: VehicleService,
    private router: Router
  ) {
    // Set the minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.routeForm = this.fb.group({
      originTerminal: ['', Validators.required],
      destinationTerminal: ['', Validators.required],
      transportLine: ['', Validators.required],
      vehicle: ['', Validators.required],
      departureDate: [this.minDate, Validators.required],
      seatQuantity: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      paymentType: ['booking'] 
    });

    this.loadTerminals();
    this.loadTransportLines();
    this.loadVehicles();
  }

  loadTerminals(): void {
    this.terminalService.getTerminals().subscribe(
      data => this.terminals = data,
      error => console.error('Error loading terminals:', error)
    );
  }

  loadTransportLines(): void {
    this.transportLineService.getTransportLines().subscribe(
      data => this.transportLines = data,
      error => console.error('Error fetching transport lines:', error)
    );
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(
      data => this.vehicles = data,
      error => console.error('Error fetching vehicles:', error)
    );
  }

  proceed(): void {
    const selectedVehicle = this.vehicles.find(vehicle => vehicle.id === this.routeForm.value.vehicle);

    if (selectedVehicle) {
      const queryParams = {
        originTerminalName: this.terminals.find(terminal => terminal.id === this.routeForm.value.originTerminal)?.name,
        destinationTerminalName: this.terminals.find(terminal => terminal.id === this.routeForm.value.destinationTerminal)?.name,
        transportLineName: selectedVehicle.transportLineName,
        vehicleType: selectedVehicle.type,
        amount: selectedVehicle.rate.toString(),
        paymentType: this.routeForm.value.paymentType,
        departureDate: this.routeForm.value.departureDate,
        seatQuantity: this.routeForm.value.seatQuantity.toString()
      };

      console.log("Query Params: ", queryParams);

      this.router.navigate(['/booking-form'], { queryParams });
    } else {
      console.error('Selected vehicle not found.');
    }
  }

}
