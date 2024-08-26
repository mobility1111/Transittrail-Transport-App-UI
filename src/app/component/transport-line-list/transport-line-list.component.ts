
import { Component, OnInit } from '@angular/core';
import { TransportLineWithTerminal } from 'src/app/DTOs/TransportLineWithTerminal';

import { TransportLineService } from 'src/app/services/transport-line.service';

@Component({
    selector: 'app-transport-line-list',
    templateUrl: './transport-line-list.component.html',
    styleUrls: ['./transport-line-list.component.css']
})
export class TransportLineListComponent implements OnInit {
    transportLines: TransportLineWithTerminal[] = [];

    constructor(private transportLineService: TransportLineService) {}

    ngOnInit(): void {
        this.transportLineService.getTransportLines().subscribe(
            (data) => this.transportLines = data,
            (error) => console.error('Error fetching transport lines:', error)
        );
    }
}
















// import { Component, OnInit } from '@angular/core';
// import { TransportLine } from 'src/app/models/TransportLine.model';
// import { TransportLineService } from 'src/app/services/transport-line.service';


// @Component({
//   selector: 'app-transport-line-list',
//   templateUrl: './transport-line-list.component.html',
//   styleUrls: ['./transport-line-list.component.css']
// })
// export class TransportLineListComponent implements OnInit {
//   transportLines: TransportLine[] = [];

//   constructor(private transportLineService: TransportLineService) {}

//   ngOnInit(): void {
//     this.loadTransportLines();
//   }

//   loadTransportLines(): void {
//     this.transportLineService.getTransportLines().subscribe(data => {
//       this.transportLines = data;
//     });
//   }

//   deleteTransportLine(id: string): void {
//     if (confirm('Are you sure you want to delete this transport line?')) {
//       this.transportLineService.deleteTransportLine(id).subscribe(() => {
//         this.loadTransportLines();
//       });
//     }
//   }
//}
