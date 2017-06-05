import { Component, OnInit } from '@angular/core';

import {MeteoService} from './meteo.service'
import {Forecast, Instant} from './forecast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MeteoService]
})

export class AppComponent implements OnInit {
  forecast: number;
  morning = 'Matin : ';
  lunch = 'Midi : ';
  endDay = 'Soir : ';
  tomorrowMorning = 'Demain Matin : ';
  tomorrowLunch = 'Demain Midi : ';
  tomorrowEndDay = 'Demain Soir : ';

  constructor(private meteoService: MeteoService) { }

  ngOnInit(): void {
    this.meteoService.refreshForecast().subscribe(res => {
      this.morning += this.detectPast(res.morningTemp);
      this.lunch += this.detectPast(res.lunchTemp);
      this.endDay += this.detectPast(res.endDayTemp);
      this.tomorrowMorning += this.detectPast(res.tomorrowMorningTemp);
      this.tomorrowLunch += this.detectPast(res.tomorrowLunchTemp);
      this.tomorrowEndDay += this.detectPast(res.tomorrowEndDayTemp);
    });
  }

  detectPast(temp: number): string {
    var res = '' + temp;
    if(temp == Forecast.NOT_AVAILABLE) {
      res = "Past Doesn't Matter";
    }
    return res;
  }

}
