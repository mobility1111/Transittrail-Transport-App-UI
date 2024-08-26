import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Terminal } from 'src/app/models/Terminal.model';
import { TerminalService } from 'src/app/services/terminal.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-terminal-form',
  templateUrl: './terminal-form.component.html',
  styleUrls: ['./terminal-form.component.css']
})
export class TerminalFormComponent {
  terminal: Terminal = {
    id: '',
    name: '',
    location: '',
    description: ''
  };

  constructor(
    private terminalService: TerminalService,
    private router: Router,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  submit(): void {
    this.terminalService.addTerminal(this.terminal).subscribe(
      (data: Terminal) => {
        console.log('Terminal added:', data);
        this.toastr.success('Terminal added successfully'); // Use Toastr for success
        this.router.navigate(['/terminals']);
      },
      error => {
        console.error('Error:', error);
        this.toastr.error('Failed to add terminal'); // Use Toastr for error
      }
    );
  }
}
