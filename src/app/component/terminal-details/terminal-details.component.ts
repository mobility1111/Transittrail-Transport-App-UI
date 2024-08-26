import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TerminalService } from 'src/app/services/terminal.service';
import { Terminal } from 'src/app/models/Terminal.model';

@Component({
  selector: 'app-terminal-details',
  templateUrl: './terminal-details.component.html',
  styleUrls: ['./terminal-details.component.css']
})
export class TerminalDetailsComponent implements OnInit {
  terminal: Terminal | null = null;

  constructor(
    private route: ActivatedRoute,
    private terminalService: TerminalService
  ) { }

  ngOnInit(): void {
    this.loadTerminalDetails();
  }

  loadTerminalDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.terminalService.getTerminal(id).subscribe(
        terminal => this.terminal = terminal,
        error => console.error('Error loading terminal details:', error)
      );
    }
  }
}
