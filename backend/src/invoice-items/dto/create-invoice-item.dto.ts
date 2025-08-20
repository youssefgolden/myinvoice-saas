import { IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';

const MONEY_2DP = /^\d+(\.\d{1,2})?$/;   // 2 decimals
const QTY_3DP = /^\d+(\.\d{1,3})?$/;     // 3 decimals

export class CreateInvoiceItemDto {
  @IsOptional() @IsInt() @Min(0)
  position?: number;

  @IsString()
  description!: string;

  @IsOptional() @Matches(QTY_3DP)
  quantity?: string;      // default value in service: "1"

  @IsOptional() @Matches(MONEY_2DP)
  unitPrice?: string;     // default "0"

  @IsOptional() @Matches(MONEY_2DP)
  taxPercent?: string;    // default "0"
}
