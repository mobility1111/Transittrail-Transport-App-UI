import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoouteService } from '../../services/rooute.service';
import { Rooute } from 'src/app/models/Rooute.model';

@Component({
  selector: 'app-rooute-form',
  templateUrl: './rooute-form.component.html',
  styleUrls: ['./rooute-form.component.css']
})
export class RoouteFormComponent implements OnInit {
  rooute: Rooute = {
    id: '',
    originTerminalId: '',
    destinationTerminalId: '',
    vehicleId: '',
    transportLineId: '',
    departureTime: new Date(),
    arrivalTime: new Date(),
    rate: 0,
    originTerminalName: '',
    destinationTerminalName: '',
    vehicleType: '',
    transportLineName: ''
  };

  terminals: any[] = [];
  vehicles: any[] = [];
  transportLines: any[] = [];

  constructor(
    private roouteService: RoouteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTerminals();
    this.loadVehicles();
    this.loadTransportLines();
  }

  loadTerminals(): void {
    this.roouteService.getTerminals().subscribe(
      data => this.terminals = data,
      error => console.error('Error loading terminals:', error)
    );
  }

  loadVehicles(): void {
    this.roouteService.getVehicles().subscribe(
      data => this.vehicles = data,
      error => console.error('Error loading vehicles:', error)
    );
  }

  loadTransportLines(): void {
    this.roouteService.getTransportLines().subscribe(
      data => this.transportLines = data,
      error => console.error('Error loading transport lines:', error)
    );
  }

  submit(): void {
    this.roouteService.addRooute(this.rooute).subscribe(
      (data: Rooute) => {
        console.log('Route added:', data);
        alert('Route added successfully');
        this.router.navigate(['/rooutes']);
      },
      error => {
        console.error('Error:', error);
        alert('Failed to add route');
      }
    );
  }
}
