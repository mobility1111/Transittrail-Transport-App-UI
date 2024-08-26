import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminalFormComponent } from './component/terminal-form/terminal-form.component';
import { TerminalListComponent } from './component/terminal-list/terminal-list.component';
import { TransportLineFormComponent } from './component/transport-line-form/transport-line-form.component';
import { TransportLineListComponent } from './component/transport-line-list/transport-line-list.component';
import { HomeComponent } from './component/home/home.component';
import { VehicleListComponent } from './component/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './component/vehicle-form/vehicle-form.component';
import { RoouteFormComponent } from './component/rooute-form/rooute-form.component';
import { RoouteListComponent } from './component/rooute-list/rooute-list.component';
import { RateComparisonComponent } from './component/rate-comparison/rate-comparison.component';
import { RoouteDetailsComponent } from './component/rooute-details/rooute-details.component';
import { BookingFormComponent } from './component/booking-form/booking-form.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { TerminalDetailsComponent } from './component/terminal-details/terminal-details.component';
import { TransportLineComponent } from './component/transport-line/transport-line.component';
import { VehicleComponent } from './component/vehicle/vehicle.component';
import { RateListComponent } from './component/rate-list/rate-list.component';
import { RateFormComponent } from './component/rate-form/rate-form.component';
import { AuthGuard } from './guards/auth.guard';
import { RateDetailsComponent } from './component/rate-details/rate-details.component';
import { SearchComponent } from './component/search/search.component';
import { SubscriptionComponent } from './component/subscription/subscription.component';
import { ChartComponent } from './component/chart/chart.component';
import { PaymentSuccessComponent } from './component/payment-success/payment-success.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { FaqComponent } from './component/faq/faq.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { PaymentTransactionsComponent } from './component/payment-transactions/payment-transactions.component';
import { ResetComponent } from './component/reset/reset.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ContactComponent } from './component/contact/contact.component';
import { MyBookingsComponent } from './component/my-bookings/my-bookings.component';
import { ConfirmationComponent } from './component/confirmation/confirmation.component';
import { ReactivationEmailComponent } from './component/reactivation-email/reactivation-email.component';
import { BookingDetailsComponent } from './component/booking-details/booking-details.component';
import { RouteSelectorComponent } from './component/route-selector/route-selector.component';
import { RoleGuard } from './guards/role.guard';
import { ProfileComponent } from './component/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', component: DashboardComponent},
  { path: 'terminals', component: TerminalListComponent},
  { path: 'add-terminal', component: TerminalFormComponent,canActivate:[RoleGuard]},
  { path: 'transport-lines', component: TransportLineListComponent},
  { path: 'add-transport-line', component: TransportLineFormComponent,canActivate:[RoleGuard] },
  { path: 'edit-transport-line/:id', component: TransportLineFormComponent,canActivate:[RoleGuard] },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'add-vehicle', component: VehicleFormComponent,canActivate:[RoleGuard] },
  { path: 'rooutes', component: RoouteListComponent, canActivate:[AuthGuard]},
  { path: 'rooutes/:id', component: RoouteDetailsComponent },
  { path: 'add-rooute', component: RoouteFormComponent, canActivate:[RoleGuard]},
  { path: 'rate-comparison', component: RateComparisonComponent,canActivate:[AuthGuard]},
  { path: 'booking-form', component: BookingFormComponent,canActivate:[RoleGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'terminal-details/:id', component: TerminalDetailsComponent },
  { path: 'transport-lines/:terminalId', component: TransportLineComponent },
  { path: 'vehicles/:transportLineId', component: VehicleComponent },
  //{ path: 'rates', component: RateListComponent, canActivate:[AuthGuard]},
  { path: 'rate-form', component: RateFormComponent },
  { path: 'rate-details/:id', component: RateDetailsComponent },
  { path: 'search', component: SearchComponent},
  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path:'subscription', component: SubscriptionComponent},
  { path: 'chart', component: ChartComponent, canActivate:[AuthGuard]},
  { path: 'my-bookings', component: MyBookingsComponent,canActivate:[AuthGuard]},
  { path: 'booking-details/:id', component: BookingDetailsComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'about', component: AboutUsComponent},
  { path: 'confirm-email', component: ConfirmationComponent },
  { path: 'reactivate', component: ReactivationEmailComponent },
  { path: 'faq', component: FaqComponent},
  { path: 'payments', component: PaymentTransactionsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'selector', component: RouteSelectorComponent},
  {path:'reset', component: ResetComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: '/not-found' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
