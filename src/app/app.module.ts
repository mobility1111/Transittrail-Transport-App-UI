import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { TerminalListComponent } from './component/terminal-list/terminal-list.component';
import { TerminalFormComponent } from './component/terminal-form/terminal-form.component';
import { TransportLineListComponent } from './component/transport-line-list/transport-line-list.component';
import { VehicleListComponent } from './component/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './component/vehicle-form/vehicle-form.component';
import { RoouteListComponent } from './component/rooute-list/rooute-list.component';
import { RoouteFormComponent } from './component/rooute-form/rooute-form.component';
import { BookingListComponent } from './component/booking-list/booking-list.component';
import { BookingFormComponent } from './component/booking-form/booking-form.component';
import { RateListComponent } from './component/rate-list/rate-list.component';
import { RateFormComponent } from './component/rate-form/rate-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TransportLineFormComponent } from './component/transport-line-form/transport-line-form.component';
import { HomeComponent } from './component/home/home.component';
import { RoouteDetailsComponent } from './component/rooute-details/rooute-details.component';
import { RateComparisonComponent } from './component/rate-comparison/rate-comparison.component';
import { SearchComponent } from './component/search/search.component';
import { TerminalDetailsComponent } from './component/terminal-details/terminal-details.component';
import { TransportLineComponent } from './component/transport-line/transport-line.component';
import { VehicleComponent } from './component/vehicle/vehicle.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RateDetailsComponent } from './component/rate-details/rate-details.component';
import { ReactivationEmailComponent } from './component/reactivation-email/reactivation-email.component';
import { ResetComponent } from './component/reset/reset.component';
import { ChartComponent } from './component/chart/chart.component';
import { SubscriptionComponent } from './component/subscription/subscription.component';
import { FaqComponent } from './component/faq/faq.component';
import { ContactComponent } from './component/contact/contact.component';
import { ConfirmationComponent } from './component/confirmation/confirmation.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { PaymentTransactionsComponent } from './component/payment-transactions/payment-transactions.component';
import { PaymentSuccessComponent } from './component/payment-success/payment-success.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MyBookingsComponent } from './component/my-bookings/my-bookings.component';
import { BookingDetailsComponent } from './component/booking-details/booking-details.component';
import { FeaturedTransportLinesComponent } from './component/featured-transport-lines/featured-transport-lines.component';
import { FeaturedRooutesComponent } from './component/featured-rooutes/featured-rooutes.component';
import { TransportsComponent } from './component/transports/transports.component';
import { RouteSelectorComponent } from './component/route-selector/route-selector.component';
import { BottomNavComponent } from './component/bottom-nav/bottom-nav.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    TerminalListComponent,
    TerminalFormComponent,
    TransportLineListComponent,
    TransportLineFormComponent,
    VehicleListComponent,
    VehicleFormComponent,
    RoouteListComponent,
    RoouteFormComponent,
    BookingListComponent,
    BookingFormComponent,
    RateListComponent,
    RateFormComponent,
    HomeComponent,
    RoouteDetailsComponent,
    RateComparisonComponent,
    SearchComponent,
    TerminalDetailsComponent,
    TransportLineComponent,
    VehicleComponent,
    DashboardComponent,
    RateDetailsComponent,
    ReactivationEmailComponent,
    ResetComponent,
    ChartComponent,
    SubscriptionComponent,
    FaqComponent,
    ContactComponent,
    ConfirmationComponent,
    AboutUsComponent,
    PaymentTransactionsComponent,
    PaymentSuccessComponent,
    NotFoundComponent,
    ProfileComponent,
    MyBookingsComponent,
    BookingDetailsComponent,
    FeaturedTransportLinesComponent,
    FeaturedRooutesComponent,
    TransportsComponent,
    RouteSelectorComponent,
    BottomNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule, 
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    
  ],
  
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }