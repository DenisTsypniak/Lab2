class Weather {
  temperature: number;
  feelsLikeTemperature: number;
  windSpeed: number;
  humidity: number;
  start: Date;
  end: Date;
}

export class CityWeatherDto {
  name: string;
  weather: Weather[];
}

export class CityDto {
  name: string;
}
