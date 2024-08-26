import { Component, OnInit } from '@angular/core';
import { RateService } from '../../services/rate.service';


@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.css']
})
export class RateListComponent implements OnInit {
  rates: any[] = [];
  public role!:string;

  constructor(private rateService: RateService) { }

  ngOnInit(): void {
    this.loadRates();
  }

  loadRates(): void {
    this.rateService.getRates().subscribe(rates => {
      this.rates = rates;
    });
  }
}
