import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { TransportLineWithTerminal } from 'src/app/DTOs/TransportLineWithTerminal';
import { Period } from 'src/app/enums/Period';
import { PeriodFilterModel } from 'src/app/models/period-filter.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { TransportLineService } from 'src/app/services/transport-line.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  periodForm!: FormGroup;
  transportLines: TransportLineWithTerminal[] = [];
  periods = Object.values(Period);

  @Output() filterChanged = new EventEmitter<PeriodFilterModel>();

  @ViewChild('myChart', { static: true })
  myChartRef!: ElementRef<HTMLCanvasElement>; 
  chart: Chart | undefined; 

  constructor(private fb: FormBuilder, private chartService: ChartService,
              private router: Router, private transportLineService: TransportLineService,
              private subscriptionService: SubscriptionService, private authService: AuthService) { }

  ngOnInit() {
    this.periodForm = this.fb.group({
      period: [Period.Daily],
      startDate: [''],
      endDate: [''],
      transportLineName: ['']
    });

    this.transportLineService.getTransportLines().subscribe({
      next: (data) => {
        this.transportLines = data;
      },
      error: (error) => {
        console.error('Error fetching transport lines', error);
      }
    });
  }

  applyFilter() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      const filterModel = this.periodForm.value;

      this.subscriptionService.checkSubscriptionStatus(userId).subscribe({
        next: (hasSubscription) => {
          if (hasSubscription) {
            this.fetchAndRenderChart(filterModel);
          } else {
            this.router.navigate(['/subscription']);
          }
        },
        error: (error) => {
          console.error('Error checking subscription status', error);
        }
      });
    } else {
      console.error('User ID not available');
    }
  }

  private fetchAndRenderChart(filterModel: any): void {
    this.chartService.getChart(filterModel).subscribe({
      next: (data) => {
        const chartData: ChartConfiguration = {
          type: 'bar',
          data: {
            labels: data.map((x: { date: any }) => x.date),
            datasets: [
              {
                label: 'Price',
                data: data.map((item: { price: any }) => item.price),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            // Your chart options
          }
        };

        this.createChart(chartData);
      },
      error: (error) => {
        console.error('Error fetching chart data', error);
      }
    });
  }

  private createChart(chartData: ChartConfiguration): void {
    if (this.chart) {
      this.chart.data = chartData.data;
      this.chart.options = chartData.options || {};
      this.chart.update();
    } else {
      this.chart = new Chart(this.myChartRef.nativeElement, chartData);
    }
  }
}
