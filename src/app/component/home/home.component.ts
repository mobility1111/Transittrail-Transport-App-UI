import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quickSearchForm: FormGroup;
  popularRoutes = [
    { source: 'Lagos', destination: 'Abuja' },
    { source: 'Abuja', destination: 'Port Harcourt' },
    { source: 'Kano', destination: 'Kaduna' },
    // Add more popular routes as needed
  ];
  recentBookings = [
    { route: 'Lagos to Abuja', date: new Date(), status: 'Confirmed' },
    { route: 'Abuja to Port Harcourt', date: new Date(2023, 4, 15), status: 'Completed' },
    { route: 'Kano to Kaduna', date: new Date(2023, 3, 28), status: 'Cancelled' },
    // Add more recent bookings as needed
  ];
  public fullName: string = '';
  public users: any = [];

  public role!:string;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService,
     private api: ApiService,     private userStore: UserStoreService,) {
    this.quickSearchForm = this.fb.group({
      sourceTerminal: '',
      destinationTerminal: ''
    });
  }

  ngOnInit() {
    // Fetch popular routes and recent bookings from the backend

    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });

    this.userStore.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
  

  onQuickSearch() {
    const sourceTerminal = this.quickSearchForm.get('sourceTerminal')?.value;
    const destinationTerminal = this.quickSearchForm.get('destinationTerminal')?.value;

    // Navigate to the search page with the source and destination terminals as query parameters
    this.router.navigate(['/search'], { queryParams: { source: sourceTerminal, destination: destinationTerminal } });
  }

  logout() {
    this.auth.logout();
    this.fullName = '';
  }
}