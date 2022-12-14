import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Weather } from './weather.entity';

@Entity()
export class City extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Weather, (weather) => weather.city, { onDelete: 'CASCADE' })
  weather: Weather[];
}
