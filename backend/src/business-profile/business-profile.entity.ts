import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('business_profiles')            // maps class to "business_profiles" table
export class BusinessProfile {
  @PrimaryGeneratedColumn('uuid') id: string;       // PK UUID
  @OneToOne(() => User, { eager: true, onDelete: 'CASCADE' })// relation with User table, here OneToOne because only one profil per user
  @JoinColumn()
  owner: User;

  @Column({ type: 'varchar',length: 180 }) legalName: string;            // legalName
  @Column({ type: 'varchar',length: 60, nullable: true }) taxId: string;           // taxId
  @Column({ type: 'text', nullable: true }) address: string;           // address
  @Column({ type: 'varchar',length: 3, default: 'USD'}) defaultCurrency: string;           // defaultCurrency
  @Column({ type: 'text', nullable: true }) logoUrl: string;           // logoUrl


  @CreateDateColumn() createdAt: Date;              // timestamps
  @UpdateDateColumn() updatedAt: Date;
}
