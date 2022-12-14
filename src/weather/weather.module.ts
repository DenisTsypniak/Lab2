import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

import { City } from '../entities/city.entity';
import { Weather } from '../entities/weather.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Weather])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
