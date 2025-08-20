import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';

@Controller('invoices/:invoiceId/items')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class InvoiceItemsController {
  constructor(private readonly items: InvoiceItemsService) {}

  @Post()
  create(
    @Param('invoiceId', new ParseUUIDPipe()) invoiceId: string,
    @Body() body: CreateInvoiceItemDto,
  ) {
    return this.items.create(invoiceId, body);
  }

  @Patch(':itemId')
  update(
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
    @Body() body: UpdateInvoiceItemDto,
  ) {
    return this.items.update(itemId, body);
  }

  @Delete(':itemId')
  remove(@Param('itemId', new ParseUUIDPipe()) itemId: string) {
    return this.items.remove(itemId);
  }
}
