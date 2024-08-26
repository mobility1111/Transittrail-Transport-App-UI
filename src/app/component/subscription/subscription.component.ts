import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionType } from 'src/app/models/SubscriptionType.model';
import { AuthService } from 'src/app/services/auth.service';
import { SubscriptionService } from 'src/app/services/subscription.service';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptionTypes: SubscriptionType[] = [];

  constructor(
    private subscriptionService: SubscriptionService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Fetch subscription types from the backend
    this.subscriptionService.getAllSubscriptionTypes().subscribe({
      next:(types)=>{
        this.subscriptionTypes = types
      },
      error:(error:any) =>{
        console.log("error", error)
      }
    }
  
    );
  }
  // subscription.component.ts
  subscribe(subscriptionType: SubscriptionType): void {
    this.router.navigate(['/booking-form'], { queryParams: { amount: subscriptionType.price, paymentType: 'subscription' } });
  }
  
  
}
