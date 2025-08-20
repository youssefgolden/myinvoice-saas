import { IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';

const MONEY_2DP = /^\d+(\.\d{1,2})?$/;
const QTY_3DP = /^\d+(\.\d{1,3})?$/;

export class UpdateInvoiceItemDto {
  @IsOptional() @IsInt() @Min(0)
  position?: number;

  @IsOptional() @IsString()
  description?: string;

  @IsOptional() @Matches(QTY_3DP)
  quantity?: string;

  @IsOptional() @Matches(MONEY_2DP)
  unitPrice?: string;

  @IsOptional() @Matches(MONEY_2DP)
  taxPercent?: string;
}
