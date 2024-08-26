import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransportLine } from 'src/app/models/TransportLine.model';
import { TransportLineService } from 'src/app/services/transport-line.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transport-line-form',
  templateUrl: './transport-line-form.component.html',
  styleUrls: ['./transport-line-form.component.css']
})
export class TransportLineFormComponent {
  transportLine: TransportLine = {
    id: '',
    name: '',
    vehicleType: '',
    rate: 0
  };

  constructor(
    private transportLineService: TransportLineService,
    private router: Router,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  submit(): void {
    this.transportLineService.addTransportLine(this.transportLine).subscribe(
      (data: TransportLine) => {
        console.log('Transport Line added:', data);
        this.toastr.success('Transport Line added successfully'); // Use Toastr for success
        this.router.navigate(['/transport-lines']);
      },
      error => {
        console.error('Error:', error);
        this.toastr.error('Failed to add transport line'); // Use Toastr for error
      }
    );
  }
}
