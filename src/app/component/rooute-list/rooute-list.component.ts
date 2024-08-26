import { Component, OnInit } from '@angular/core';
import { RoouteService } from '../../services/rooute.service';
import { Rooute } from 'src/app/models/Rooute.model';


@Component({
  selector: 'app-rooute-list',
  templateUrl: './rooute-list.component.html',
  styleUrls: ['./rooute-list.component.css']
})
export class RoouteListComponent implements OnInit {

  rooutes: Rooute[] = [];

  constructor(private roouteService: RoouteService) { }

  ngOnInit(): void {
    this.loadRooutes();
  }

  loadRooutes(): void {
    this.roouteService.getRooutes().subscribe(
      data => this.rooutes = data,
      error => console.error('Error loading rooutes:', error)
    );
  }

  deleteRooute(id: string): void {
    if (confirm('Are you sure you want to delete this route?')) {
      this.roouteService.deleteRooute(id).subscribe(
        () => this.loadRooutes(),
        error => console.error('Error deleting route:', error)
      );
    }
  }
}
