import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityController } from './city.controller';
import { CityService } from './city.service';

import { City } from '../entities/city.entity';
import { Weather } from '../entities/weather.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Weather])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
