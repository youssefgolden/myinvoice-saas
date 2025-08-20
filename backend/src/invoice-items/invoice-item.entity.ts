import { Invoice } from 'src/invoices/invoice.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('invoice_items')            // maps class to "invoice_items" table

export class InvoiceItem {

  @PrimaryGeneratedColumn('uuid') id: string;       // PK UUID

  @ManyToOne(() => Invoice, { eager: true, onDelete: 'CASCADE'}) invoice: Invoice; // relation with User table

  @Column({type:'int', default:0}) position: number;

  @Column({ type: 'text', default: ''}) description: string;            // description

  @Column({type: 'numeric',precision: 12, scale: 3, default: 1}) quantity:string; // here, TS type is string to avoid float issues
  @Column({type: 'numeric',precision: 12, scale: 2, default: 0}) unitPrice:string;
  @Column({type: 'numeric',precision: 5, scale: 2, default: 0}) taxPercent:string;
  @Column({type: 'numeric',precision: 12, scale: 2, default: 0}) lineTotal:string;

  @CreateDateColumn() createdAt: Date;              // timestamps
  @UpdateDateColumn() updatedAt: Date;
}
