import { Component } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/Vehicle.model';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent {
  vehicle: Vehicle = {
    id: '',
    name: '',
    type: '',
    capacity: 0,
    amenities: '',
    available: false,
    imageUrl: '',
    rate: 0,
    transportLineName: ''
  };

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  submit(): void {
    this.vehicleService.addVehicle(this.vehicle).subscribe(
      (data: Vehicle) => {
        console.log('Vehicle added:', data);
        this.toastr.success('Vehicle added successfully'); // Use Toastr for success
        this.router.navigate(['/vehicles']);
      },
      error => {
        console.error('Error:', error);
        this.toastr.error('Failed to add vehicle'); // Use Toastr for error
      }
    );
  }
}














// import { Component, OnInit } from '@angular/core';
// import { VehicleService } from '../../services/vehicle.service';
// import { Vehicle } from '../../models/vehicle';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-vehicle-form',
//   templateUrl: './vehicle-form.component.html',
//   styleUrls: ['./vehicle-form.component.css']
// })
// export class VehicleFormComponent implements OnInit {
//   vehicle: Vehicle = {
//     id: '',
//     name: '',
//     type: '',
//     capacity: 0,
//     amenities: '',
//     available: false,
//     imageUrl: ''
//   };
//   isEditMode = false;

//   constructor(
//     private vehicleService: VehicleService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.isEditMode = true;
//       this.vehicleService.getVehicle(id).subscribe(
//         (data: Vehicle) => this.vehicle = data,
//         error => console.error('Error loading vehicle:', error)
//       );
//     }
//   }

//   submit(): void {
//     if (this.isEditMode) {
//       this.vehicleService.updateVehicle(this.vehicle.id, this.vehicle).subscribe(
//         () => {
//           console.log('Vehicle updated successfully');
//           alert('Vehicle updated successfully');
//           this.router.navigate(['/vehicles']);
//         },
//         error => {
//           console.error('Error updating vehicle:', error);
//           alert('Failed to update vehicle');
//         }
//       );
//     } else {
//       this.vehicleService.addVehicle(this.vehicle).subscribe(
//         (data: Vehicle) => {
//           console.log('Vehicle added:', data);
//           alert('Vehicle added successfully');
//           this.router.navigate(['/vehicles']);
//         },
//         error => {
//           console.error('Error:', error);
//           alert('Failed to add vehicle');
//         }
//       );
//     }
//   }
// }
