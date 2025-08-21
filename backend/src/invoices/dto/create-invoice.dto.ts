import { IsDateString, IsOptional, IsString, IsUUID, Length, Matches, IsIn } from 'class-validator';

export class CreateInvoiceDto {
  @IsUUID()
  ownerId!: string; // user owner

  @IsOptional()
  @IsUUID()
  clientId?: string; // can be undefined

  @IsString()
  @Length(1, 40)
  invoiceNumber!: string;

  @IsDateString()
  issueDate!: string; // YYYY-MM-DD

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/)
  currency: string = 'USD';

  @IsOptional()
  @IsIn(['draft', 'sent', 'paid', 'void'])
  status?: 'draft' | 'sent' | 'paid' | 'void';
}
