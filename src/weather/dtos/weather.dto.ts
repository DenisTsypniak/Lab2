class City {
  name: string;
}

export class WeatherDto {
  temperature: number;
  feelsLikeTemperature: number;
  windSpeed: number;
  humidity: number;
  start: Date;
  end: Date;
}

export class WeatherCityDto extends WeatherDto {
  city: City;
}
