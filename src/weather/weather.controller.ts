import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dtos/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/city/:name')
  private findOneByCityName(
    @Param('name') cityName: string,
  ): Promise<WeatherDto[]> {
    return this.weatherService.findOneByCityName(cityName.toLowerCase());
  }

  @Post('/city/:name')
  private create(
    @Param('name') cityName: string,
    @Body() weather: WeatherDto,
  ): Promise<WeatherDto> {
    return this.weatherService.create({
      ...weather,
      city: { name: cityName.toLowerCase() },
    });
  }

  @Put('/:id')
  private updateById(
    @Param('id') name: string,
    @Body() data: WeatherDto,
  ): Promise<void> {
    return this.weatherService.updateById(name, data);
  }

  @Delete('/:id')
  private deleteById(@Param('id') id: string): Promise<void> {
    return this.weatherService.deleteById(id);
  }
}
