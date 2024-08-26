import { Component, OnInit } from '@angular/core';
import { Terminal } from 'src/app/models/Terminal.model';
import { TerminalService } from 'src/app/services/terminal.service';


@Component({
  selector: 'app-terminal-list',
  templateUrl: './terminal-list.component.html',
  styleUrls: ['./terminal-list.component.css']
})
export class TerminalListComponent implements OnInit {
  terminals: Terminal[] = [];

  constructor(private terminalService: TerminalService) { }

  ngOnInit(): void {
    this.loadTerminals();
  }

  loadTerminals(): void {
    this.terminalService.getTerminals().subscribe(terminals => {
      this.terminals = terminals;
    });
  }

  deleteTerminal(id: string): void {
    this.terminalService.deleteTerminal(id).subscribe(() => {
      this.terminals = this.terminals.filter(t => t.id !== id);
    });
  }
}
