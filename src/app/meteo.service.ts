import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class MeteoService {

  forecastUrl = 'http://www.infoclimat.fr/public-api/gfs/json?_ll=43.60465,1.4442&_auth=VU8CFQB%2BXH5ecwcwUyVQeVY%2BAzYAdgEmBXlXNF86UC1VPlEwDm4HYVY4AH1TfAA2WHUHZF5lBjYAawN7XC5SM1U%2FAm4Aa1w7XjEHYlN8UHtWeANiACABJgVuVzlfLFAxVTRRMA5zB2dWOQBqU30ANlhvB2VefgYhAGIDYFw4UjdVNgJjAGFcPF4zB2ZTfFB7VmADagA9AWsFMFcyXzJQM1U2UTUObgdkVjoAY1N9ADFYaQdnXmAGNwBrA2dcNFIuVSkCHwAQXCNecQcnUzZQIlZ4AzYAYQFt&_c=d7f6a0acd71ffe781deae22d5271b1a3'

  forecast: Observable<number>;

  constructor(private http: Http) { }

  refreshForecast(): void {
    var content = this.http.get(this.forecastUrl);
    content.subscribe(res => console.log(res.json()));
    this.forecast = content.map(res => {return 13.5});
  }

  getTodayTemp(temp:string) : void {
    this.forecast.subscribe(res => temp = ''+res);
  }
}
