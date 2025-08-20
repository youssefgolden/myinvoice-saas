import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('clients')            // maps class to "clients" table
@Unique(['email','owner'])          // unique constraint
export class Client {
  @PrimaryGeneratedColumn('uuid') id: string;       // PK UUID
  @Column({ length: 160 }) name: string;            // name
  @Column({ length: 180, nullable: true }) email: string;           // email
  @Column({ type: 'text', nullable: true }) address: string;           // address
  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' }) owner: User; // relation with User table
  @CreateDateColumn() createdAt: Date;              // timestamps
  @UpdateDateColumn() updatedAt: Date;
}
