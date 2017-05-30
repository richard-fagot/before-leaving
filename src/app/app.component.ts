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
  title = 'app works!';

  constructor(private meteoService: MeteoService) { }

  ngOnInit(): void {
    this.refreshForecast();
    this.meteoService.getTodayTemp(this.title);
    this.refreshForecast();
  }

  refreshForecast() : void {
    this.meteoService.refreshForecast();
  }
}
