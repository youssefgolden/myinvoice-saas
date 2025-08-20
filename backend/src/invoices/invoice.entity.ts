import { Client } from 'src/clients/client.entity';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('invoices')            // maps class to "invoices" table
@Unique(['invoiceNumber','owner'])          // unique constraint

export class Invoice {

  @PrimaryGeneratedColumn('uuid') id: string;       // PK UUID

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' }) owner: User; // relation with User table
  @ManyToOne(() => Client, { eager: true, nullable: true, onDelete: 'SET NULL' }) client: Client | null ; // relation with User table

  
  @Column({ type: 'varchar', length: 40 , }) invoiceNumber: string;            // invoiceNumber
  @Column({ type: 'date'}) issueDate: string;           // issueDate
  @Column({ type: 'date', nullable: true }) dueDate: string | null ;           // dueDate
  @Column({ type: 'varchar',length: 3,   default: 'USD' }) currency: string;           // currency

  @Column({ type: 'varchar',length: 20, default:'draft'}) status:'draft' | 'sent' | 'paid' | 'void';

  @Column({type: 'numeric',precision: 12, scale: 2, default: 0}) subtotal:string; // here, TS type is string to avoid float issues
  @Column({type: 'numeric',precision: 12, scale: 2, default: 0}) taxTotal:string;
  @Column({type: 'numeric',precision: 12, scale: 2, default: 0}) total:string;

  @CreateDateColumn() createdAt: Date;              // timestamps
  @UpdateDateColumn() updatedAt: Date;
}
