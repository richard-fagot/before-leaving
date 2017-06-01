import { Component, OnInit } from '@angular/core';

import {MeteoService} from './meteo.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MeteoService]
})

export class AppComponent implements OnInit {
  forecast: number;
  morning = 'Loading...';
  lunch = 'Loading...';
  endDay = 'Loading...';

  constructor(private meteoService: MeteoService) { }

  ngOnInit(): void {
    this.meteoService.refreshForecast().subscribe(res => {
      this.morning = res.morningTemp;
      this.lunch = res.lunchTemp;
      this.endDay = res.endDayTemp;
    });
  }


}
