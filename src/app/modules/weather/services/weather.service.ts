import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from 'src/app/models/interfaces/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiKey: string = "110cb75048d8ec589efeb86826edce77";

  constructor(private httpClient: HttpClient) { }

  public getWeatherDatas(city: string): Observable<Weather> {
    return this.httpClient.get<Weather>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${this.apiKey}`, {});
  }
}
