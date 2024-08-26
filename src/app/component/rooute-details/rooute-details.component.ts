import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoouteService } from '../../services/rooute.service';

@Component({
  selector: 'app-rooute-details',
  templateUrl: './rooute-details.component.html',
  styleUrls: ['./rooute-details.component.css']
})
export class RoouteDetailsComponent implements OnInit {
  @Input() rooute: any;

  // New properties for departure date and seat quantity
  departureDate: string = '';
  seatQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private roouteService: RoouteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRoouteDetails();
  }

  loadRoouteDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.roouteService.getRoouteDetails(id).subscribe(
        data => this.rooute = data,
        error => console.error('Error loading route details:', error)
      );
    }
  }

  bookNow(): void {
    if (this.rooute && this.departureDate && this.seatQuantity > 0) {
      const queryParams = {
        originTerminalName: this.rooute.originTerminalName,
        destinationTerminalName: this.rooute.destinationTerminalName,
        transportLineName: this.rooute.transportLineName,
        vehicleType: this.rooute.vehicleType,
        amount: this.rooute.rate,
        paymentType: 'booking',
        departureDate: this.departureDate,  // Include departure date
        seatQuantity: this.seatQuantity    // Include seat quantity
      };
      this.router.navigate(['/booking-form'], { queryParams });
    } else {
      console.error('Invalid route details or input values:', this.rooute);
    }
  }

  compareRates(): void {
    if (this.rooute && this.rooute.originTerminalId && this.rooute.destinationTerminalId) {
        const originTerminalId = this.rooute.originTerminalId;
        const destinationTerminalId = this.rooute.destinationTerminalId;
        const queryParams = { 
            originTerminalId, 
            destinationTerminalId, 
            departureDate: this.departureDate, 
            seatQuantity: this.seatQuantity 
        };
        this.router.navigate(['/rate-comparison'], { queryParams });
    } else {
        console.error('Invalid route details:', this.rooute);
    }
}

}



// import { Component, Input, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RoouteService } from '../../services/rooute.service';

// @Component({
//   selector: 'app-rooute-details',
//   templateUrl: './rooute-details.component.html',
//   styleUrls: ['./rooute-details.component.css']
// })
// export class RoouteDetailsComponent implements OnInit {
//   @Input() rooute: any;

//   constructor(
//     private route: ActivatedRoute,
//     private roouteService: RoouteService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.loadRoouteDetails();
//   }

//   loadRoouteDetails(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.roouteService.getRoouteDetails(id).subscribe(
//         data => this.rooute = data,
//         error => console.error('Error loading route details:', error)
//       );
//     }
//   }

//   bookNow(): void {
//     if (this.rooute) {
//       const queryParams = {
//         originTerminalName: this.rooute.originTerminalName,
//         destinationTerminalName: this.rooute.destinationTerminalName,
//         transportLineName: this.rooute.transportLineName,
//         vehicleType: this.rooute.vehicleType,
//         totalPrice: this.rooute.rate, // Change `rate` to `totalPrice`
//         paymentType: 'booking'
//       };
//       this.router.navigate(['/booking-form'], { queryParams });
//     } else {
//       console.error('Invalid route details:', this.rooute);
//     }
//   }


//   compareRates() {
//     console.log('Route details:', this.rooute); // Debug log
//     if (this.rooute && this.rooute.originTerminalId && this.rooute.destinationTerminalId) {
//         const originTerminalId = this.rooute.originTerminalId;
//         const destinationTerminalId = this.rooute.destinationTerminalId;
//         console.log('Navigating with IDs:', { originTerminalId, destinationTerminalId }); // Debug log
//         this.router.navigate(['/rate-comparison'], {
//             queryParams: { originTerminalId, destinationTerminalId }
//         });
//     } else {
//         console.error('Invalid route details:', this.rooute);
//     }
//   }

// }
