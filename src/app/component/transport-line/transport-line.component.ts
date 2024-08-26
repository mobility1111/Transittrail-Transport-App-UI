import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransportLineService } from 'src/app/services/transport-line.service';
import { TransportLine } from 'src/app/models/TransportLine.model';

@Component({
  selector: 'app-transport-line',
  templateUrl: './transport-line.component.html',
  styleUrls: ['./transport-line.component.css']
})
export class TransportLineComponent implements OnInit {
  transportLines: TransportLine[] = [];
  terminalId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private transportLineService: TransportLineService
  ) { }

  ngOnInit(): void {
    this.terminalId = this.route.snapshot.paramMap.get('terminalId');
    if (this.terminalId) {
      this.loadTransportLines();
    }
  }

  loadTransportLines(): void {
    if (this.terminalId) {
      this.transportLineService.getTransportLinesByTerminal(this.terminalId).subscribe(
        transportLines => this.transportLines = transportLines,
        error => console.error('Error loading transport lines:', error)
      );
    }
  }
}
