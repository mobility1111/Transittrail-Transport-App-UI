// search.component.ts
import { Component, OnInit } from '@angular/core';
import { TerminalService } from '../../services/terminal.service';
import { Terminal } from 'src/app/models/Terminal.model';
import { RoouteService } from 'src/app/services/rooute.service';
import { Rooute } from 'src/app/models/Rooute.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  terminals: Terminal[] = [];
  rooutes: Rooute[] = [];

  searchValue: string = '';

  // Pagination properties for terminals
  terminalPageSize: number = 8;
  terminalCurrentPage: number = 1;

  // Pagination properties for routes
  routePageSize: number = 6;
  routeCurrentPage: number = 1;

  constructor(
    private terminalService: TerminalService,
    private roouteService: RoouteService,
  ) {}

  ngOnInit() {
    this.onSearchChange();
  }

  loadTerminals() {
    if (this.searchValue) {
      this.terminalService.getTerminals(this.searchValue).subscribe({
        next: (data: Terminal[]) => {
          this.terminals = data.slice((this.terminalCurrentPage - 1) * this.terminalPageSize, this.terminalCurrentPage * this.terminalPageSize);
        },
        error: (error) => {
          console.error('Error fetching terminals', error);
        }
      });
    } else {
      this.terminals = [];
    }
  }

  loadRooutes() {
    if (this.searchValue) {
      this.roouteService.getRooutes(this.searchValue).subscribe({
        next: (data: Rooute[]) => {
          this.rooutes = data.slice((this.routeCurrentPage - 1) * this.routePageSize, this.routeCurrentPage * this.routePageSize);
        },
        error: (error) => {
          console.error('Error fetching routes', error);
        }
      });
    } else {
      this.rooutes = [];
    }
  }

  onSearchChange() {
    this.terminalCurrentPage = 1;
    this.routeCurrentPage = 1;
    this.loadTerminals();
    this.loadRooutes();
  }

  // Pagination methods for terminals
  get terminalTotalPages(): number {
    return Math.ceil(this.terminals.length / this.terminalPageSize);
  }

  // Pagination methods for routes
  get routeTotalPages(): number {
    return Math.ceil(this.rooutes.length / this.routePageSize);
  }
}
