import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Forecast, Instant} from './forecast';

@Injectable()
export class MeteoService {

  forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Toulouse,fr&APPID=089dcecfc0ef51b648ae1a672f5c3074'

  constructor(private http: Http) { }

  refreshForecast(): Observable<Forecast> {
    var content = this.http.get(this.forecastUrl);
    return content.map(res => {return this.computeForecast(res.json())});
  }

  computeForecast(forecast:any): Forecast {
    var todayDate = new Date();
    var tomorrowDate = new Date();
    tomorrowDate.setDate(todayDate.getDate() +1);


    var today = todayDate.toISOString().slice(0, 10);
    var tomorrow =  tomorrowDate.toISOString().slice(0, 10);

    var morning =' 09:00:00';
    var lunch =' 12:00:00';
    var evening =' 18:00:00';


    var morningForecast = this.getRoundedTemp(forecast, Instant.MORNING);
    var lunchForecast = this.getRoundedTemp(forecast, Instant.LUNCH);
    var eveningForecast = this.getRoundedTemp(forecast, Instant.EVENING);
    var tomorrowMorningForecast = this.getRoundedTemp(forecast, Instant.TOMORROW_MORNING);
    var tomorrowLunchForecast = this.getRoundedTemp(forecast, Instant.TOMORROW_LUNCH);
    var tomorrowEveningForecast = this.getRoundedTemp(forecast, Instant.TOMORROW_EVENING);

    return new Forecast(
        morningForecast
        ,lunchForecast
        ,eveningForecast
        ,tomorrowMorningForecast
        ,tomorrowLunchForecast
        ,tomorrowEveningForecast
      );
  }

  getRoundedTemp(forecast: any, instant: Instant) : number {
    var date = new Date();

    switch(instant) {
      case Instant.TOMORROW_MORNING:
      case Instant.TOMORROW_LUNCH:
      case Instant.TOMORROW_EVENING:
        date.setDate(date.getDate() +1);
    }
    
    var dateText = date.toISOString().slice(0, 10);

    var roundedTemp = Forecast.NOT_AVAILABLE;
    var forecastDay = forecast.list.find(x => x.dt_txt == dateText + this.getInstantHour(instant));
    if(forecastDay != null) {
      roundedTemp = Math.round(forecastDay.main.temp - 273.15);
    }

    return roundedTemp;
  }

  getInstantHour(instant: Instant): string {
      var res:string;
      switch(instant) {
        case Instant.MORNING:
        case Instant.TOMORROW_MORNING:
          res = ' 09:00:00';
          break;
        case Instant.LUNCH:
        case Instant.TOMORROW_LUNCH:
          res = ' 12:00:00';
          break;
        case Instant.EVENING:
        case Instant.TOMORROW_EVENING:
          res = ' 18:00:00';
          break;
        default:
          res = 'oups';
      }
      return res;
  }

  getInstantText(instant:Instant): string {
    var res;

    switch(instant) {
      case Instant.MORNING:
        res = 'Matin : ';
        break;
      case Instant.LUNCH:
        res = 'Midi : ';
        break;
      case Instant.EVENING:
        res = 'Soir : ';
        break;
      case Instant.TOMORROW_MORNING:
        res = 'Demain matin : ';
        break;
      case Instant.TOMORROW_LUNCH:
        res = 'Demain midi : ';
        break;
      case Instant.TOMORROW_EVENING:
        res = 'Demain soir : ';
        break;
      default:
        res = 'oups';
    }

    return res;
  }

  getTomorrowInstantText(instant:Instant): string {
    var tomorrowInstant:Instant;
    switch(instant) {
      case Instant.MORNING:
        tomorrowInstant = Instant.TOMORROW_MORNING;
        break;
      case Instant.LUNCH:
        tomorrowInstant = Instant.TOMORROW_LUNCH;
        break;
      case Instant.EVENING:
        tomorrowInstant = Instant.TOMORROW_EVENING;
        break;
    }

    return this.getInstantText(tomorrowInstant);
  }
}
