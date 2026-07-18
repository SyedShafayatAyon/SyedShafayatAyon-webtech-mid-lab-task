import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 25,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    // length: 150,
  })
  description: string;

  @Column({
    type: 'decimal',
    nullable: false,
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    nullable: true,
  })
  stock: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  category: string;

  @Column({
    nullable: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
