import { AbstractEntity } from './abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { City } from './city.entity';

@Entity()
export class Weather extends AbstractEntity {
  @Column({ type: 'float' })
  temperature: number; // in Celsius

  @Column({ type: 'float' })
  feelsLikeTemperature: number; // in Celsius

  @Column({ type: 'float' })
  windSpeed: number;

  @Column({ type: 'integer' })
  humidity: number; // in percents

  @Column({ type: 'date' })
  start: Date;

  @Column({ type: 'date' })
  end: Date;

  @ManyToOne(() => City, (city) => city.weather, { onDelete: 'CASCADE' })
  city: City;
}
