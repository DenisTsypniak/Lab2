import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CityDto, CityWeatherDto } from './dtos/city-weather.dto';

@Controller('/city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/')
  private findAll(): Promise<CityWeatherDto[]> {
    return this.cityService.findAll();
  }

  @Get('/:name')
  private findOneByNameWithWeather(
    @Param('name') name: string,
  ): Promise<CityWeatherDto> {
    return this.cityService.findByNameWithWeather(name);
  }

  @Post('')
  private create(@Body() city: CityDto): Promise<CityDto> {
    return this.cityService.create(city);
  }

  @Put('/:name')
  private updateByName(
    @Param('name') name: string,
    @Body() data: CityDto,
  ): Promise<void> {
    return this.cityService.updateByName(name, data);
  }

  @Delete('/:name')
  private deleteByName(@Param('name') name: string): Promise<void> {
    return this.cityService.deleteByName(name);
  }
}
