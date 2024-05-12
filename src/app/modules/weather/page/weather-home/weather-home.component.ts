import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from './../../services/weather.service';
import { Weather } from 'src/app/models/interfaces/weather';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  public weatherDatas!: Weather;
  public initialCityName: string = "São Paulo";
  public searchIcon = faMagnifyingGlass;

  constructor(private service: WeatherService) { }

  ngOnInit(): void {
    this.getWheatherDatas(this.initialCityName);
  }

  onSubmit(): void {
    this.getWheatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  public getWheatherDatas(city: string) {
    this.service.getWeatherDatas(city).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        response && (this.weatherDatas = response);
        console.log(this.weatherDatas);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
