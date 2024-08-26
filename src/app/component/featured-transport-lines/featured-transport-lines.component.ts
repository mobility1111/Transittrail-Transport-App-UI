import { Component, OnInit } from '@angular/core';
import { TransportLine } from 'src/app/models/TransportLine.model';
import { TransportLineService } from 'src/app/services/transport-line.service';

@Component({
  selector: 'app-featured-transport-lines',
  templateUrl: './featured-transport-lines.component.html',
  styleUrls: ['./featured-transport-lines.component.css']
})
export class FeaturedTransportLinesComponent implements OnInit {
  featuredTransportLines: TransportLine[] = [];

  constructor(private transportLineService: TransportLineService) {}

  ngOnInit(): void {
    this.transportLineService.getFeaturedTransportLines().subscribe({
      next: (data) => {
        this.featuredTransportLines = data;
      },
      error: (error) => {
        console.error('Error fetching featured transport lines', error);
      }
    });
  }
}
