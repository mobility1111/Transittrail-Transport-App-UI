
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RateComparisonDto } from 'src/app/models/RateComparisonDto';
import { RateComparisonService } from 'src/app/services/rate-comparison.service';

@Component({
    selector: 'app-rate-comparison',
    templateUrl: './rate-comparison.component.html',
    styleUrls: ['./rate-comparison.component.css']
})
export class RateComparisonComponent implements OnInit {
    rates: RateComparisonDto[] = [];
    originTerminalName: string = '';
    destinationTerminalName: string = '';
    departureDate: string = '';
    seatQuantity: number = 1;


    constructor(
        private route: ActivatedRoute,
        private rateComparisonService: RateComparisonService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const originTerminalId = params['originTerminalId'];
            const destinationTerminalId = params['destinationTerminalId'];
            this.departureDate = params['departureDate']; // Capture departure date
            this.seatQuantity = params['seatQuantity'];   // Capture seat quantity
    
            if (originTerminalId && destinationTerminalId) {
                this.rateComparisonService.compareRates(originTerminalId, destinationTerminalId).subscribe(
                    (data) => {
                        this.rates = data;
                        if (data.length > 0) {
                            this.originTerminalName = data[0].originTerminalName;
                            this.destinationTerminalName = data[0].destinationTerminalName;
                        }
                    },
                    (error) => console.error(error)
                );
            } else {
                console.error('Invalid query parameters:', params);
            }
        });
    }
    
    

    bookNow(rate: RateComparisonDto): void {
        this.router.navigate(['/booking-form'], { 
            queryParams: { 
                transportLineName: rate.transportLineName, 
                vehicleType: rate.vehicleType, 
                amount: rate.rate,  // Pass the rate as the amount
                originTerminalName: rate.originTerminalName,
                destinationTerminalName: rate.destinationTerminalName,
                paymentType: 'booking',
                departureDate: this.departureDate, // Include the departure date
                seatQuantity: this.seatQuantity    // Include the seat quantity
            } 
        });
    }
}



















// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RateComparisonDto } from 'src/app/models/RateComparisonDto';
// import { RateComparisonService } from 'src/app/services/rate-comparison.service';

// @Component({
//     selector: 'app-rate-comparison',
//     templateUrl: './rate-comparison.component.html',
//     styleUrls: ['./rate-comparison.component.css']
// })
// export class RateComparisonComponent implements OnInit {
//     rates: RateComparisonDto[] = [];
//     originTerminalName: string = ''; // Add this property
//     destinationTerminalName: string = ''; // Add this property

//     constructor(
//         private route: ActivatedRoute,
//         private rateComparisonService: RateComparisonService,
//         private router: Router
//     ) { }

//     ngOnInit(): void {
//         this.route.queryParams.subscribe(params => {
//             const originTerminalId = params['originTerminalId'];
//             const destinationTerminalId = params['destinationTerminalId'];
//             if (originTerminalId && destinationTerminalId) {
//                 this.rateComparisonService.compareRates(originTerminalId, destinationTerminalId).subscribe(
//                     (data) => {
//                         this.rates = data;
//                         if (data.length > 0) {
//                             this.originTerminalName = data[0].originTerminalName;
//                             this.destinationTerminalName = data[0].destinationTerminalName;
//                         }
//                     },
//                     (error) => console.error(error)
//                 );
//             } else {
//                 console.error('Invalid query parameters:', params);
//             }
//         });
//     }

//     bookNow(transportLineName: string, vehicleType: string, rate: number, originTerminalName: string, destinationTerminalName: string): void {
//       this.router.navigate(['/booking-form'], { 
//           queryParams: { 
//               transportLineName: transportLineName, 
//               vehicleType: vehicleType, 
//               rate: rate,
//               originTerminalName: originTerminalName,
//               destinationTerminalName: destinationTerminalName
//           } 
//       });
//   }
  
// }
