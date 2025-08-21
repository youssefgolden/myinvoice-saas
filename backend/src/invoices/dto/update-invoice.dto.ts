import { IsDateString, IsIn, IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';

export class UpdateInvoiceDto {
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @IsOptional()
  @IsString()
  @Length(1, 40)
  invoiceNumber?: string;

  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/)
  currency?: string;

  @IsOptional()
  @IsIn(['draft', 'sent', 'paid', 'void'])
  status?: 'draft' | 'sent' | 'paid' | 'void';
}
