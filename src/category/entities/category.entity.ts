import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;
}
