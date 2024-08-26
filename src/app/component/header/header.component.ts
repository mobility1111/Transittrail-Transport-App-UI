import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loggedIn = false;
  public fullName: string = '';
  public users: any = [];
  public role!:string;

  constructor(private auth: AuthService, private api: ApiService,     private userStore: UserStoreService,) { }

  ngOnInit(): void {
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
  

  logout() {
    this.auth.logout();
    this.fullName = '';
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
