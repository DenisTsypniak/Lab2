import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CityDto, CityWeatherDto } from './dtos/city-weather.dto';

import { City } from '../entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
  ) {}

  public async findAll(): Promise<CityWeatherDto[]> {
    return await this.cityRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.weather', 'weather')
      .getMany();
  }

  public async findByNameWithWeather(
    name: City['name'],
  ): Promise<CityWeatherDto> {
    const city = await this.cityRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.weather', 'weather')
      .where('city.name = :name', { name: name.toLowerCase() })
      .getOne();

    if (!city) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }

    return city;
  }

  public async create(city: CityDto): Promise<CityDto> {
    const newCity = await this.cityRepository.save({
      ...city,
      name: city.name.toLowerCase(),
    });

    if (!newCity) {
      throw new HttpException(
        'City has not been created',
        HttpStatus.BAD_REQUEST,
      );
    }

    return newCity;
  }

  public async updateById(id: string, data: CityDto): Promise<void> {
    const updatedCity = await this.cityRepository.update(id, data);

    if (!updatedCity) {
      throw new HttpException(
        'The city has not been updated',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async updateByName(
    name: CityDto['name'],
    data: CityDto,
  ): Promise<void> {
    const city = await this.cityRepository.findOneBy({ name });
    const updatedCity = await this.cityRepository.update(city, data);

    if (!updatedCity) {
      throw new HttpException(
        'The city has not been updated',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async deleteByName(name: CityDto['name']): Promise<void> {
    await this.cityRepository
      .createQueryBuilder('city')
      .delete()
      .from(City)
      .where('city.name = :name', { name: name.toLowerCase() })
      .execute();
  }
}
