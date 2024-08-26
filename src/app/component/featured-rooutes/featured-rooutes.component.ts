import { Component, OnInit } from '@angular/core';
import { RoouteService } from 'src/app/services/rooute.service';
import { Rooute } from 'src/app/models/Rooute.model';

@Component({
  selector: 'app-featured-rooutes',
  templateUrl: './featured-rooutes.component.html',
  styleUrls: ['./featured-rooutes.component.css']
})
export class FeaturedRooutesComponent implements OnInit {
  featuredRooutes: Rooute[] = [];

  constructor(private roouteService: RoouteService) {}

  ngOnInit(): void {
    this.roouteService.getFeaturedRooutes().subscribe({
      next: (data) => {
        this.featuredRooutes = data;
      },
      error: (error) => {
        console.error('Error fetching featured rooutes', error);
      }
    });
  }
}
