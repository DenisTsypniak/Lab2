import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City } from '../entities/city.entity';
import { Weather } from '../entities/weather.entity';

import { WeatherCityDto, WeatherDto } from './dtos/weather.dto';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
  ) {}

  public async findOneByCityName(
    cityName: City['name'],
  ): Promise<WeatherDto[]> {
    return await this.weatherRepository
      .createQueryBuilder('weather')
      .leftJoin('weather.city', 'city')
      .where('city.name = :name', { name: cityName })
      .getMany();
  }

  public async create(weather: WeatherCityDto): Promise<WeatherCityDto> {
    const city = await this.cityRepository.findOneBy({
      name: weather.city.name,
    });

    if (!city) {
      throw new HttpException(
        'Such city does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newWeather = await this.weatherRepository.save({ ...weather, city });

    if (!newWeather) {
      throw new HttpException('Data is not correct', HttpStatus.BAD_REQUEST);
    }

    return newWeather;
  }

  public async updateById(id: string, data: WeatherDto): Promise<void> {
    const weather = await this.weatherRepository.findOneBy({ id });
    const updatedWeather = await this.weatherRepository.update(weather, data);

    if (!updatedWeather) {
      throw new HttpException(
        'The forecast has not been updated',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async deleteById(id: string): Promise<void> {
    await this.weatherRepository
      .createQueryBuilder('weather')
      .delete()
      .from(Weather)
      .where('weather.id = :id', { id })
      .execute();
  }
}
