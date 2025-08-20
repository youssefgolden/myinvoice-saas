import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('users')            // maps class to "users" table
@Unique(['email'])          // unique constraint
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;       // PK UUID
  @Column({ length: 120 }) name: string;            // name
  @Column({ length: 180 }) email: string;           // email
  @Column() passwordHash: string;                   // hashed password
  @CreateDateColumn() createdAt: Date;              // auto timestamps
  @UpdateDateColumn() updatedAt: Date;
}
