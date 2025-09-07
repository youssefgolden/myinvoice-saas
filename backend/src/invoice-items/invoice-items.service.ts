import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';
import { Invoice } from 'src/invoices/invoice.entity';
import { InvoiceCalcService } from 'src/invoices/invoice-calc.service';


@Injectable() //this class can be used in other contexts
export class InvoiceItemsService {
  constructor(
    @InjectRepository(InvoiceItem) private readonly itemRepo: Repository<InvoiceItem>,  //itemRepo will create, edit and remove InvoiceItem
    @InjectRepository(Invoice) private readonly invRepo: Repository<Invoice>,  //invRepo will create, edit and remove Invoice
    private readonly calc: InvoiceCalcService, //my privates calc functions
  ) {}





  private async recalcInvoice(invoiceId: string) { 
    const items = await this.itemRepo.find({ where: { invoice: { id: invoiceId } } });
    // ensure lineTotal is stored as well
    for (const it of items) {
      const lt = this.calc.computeLineTotal(it.quantity, it.unitPrice, it.taxPercent);
      if (it.lineTotal !== lt) {
        it.lineTotal = lt;
        await this.itemRepo.save(it);
      }
    }
    const { subtotal, taxTotal, total } = this.calc.computeTotals(items);
    await this.invRepo.update(invoiceId, { subtotal, taxTotal, total });
  }

  async create(
    invoiceId: string, 
    dto: { position?: number; description: string; quantity?: string; unitPrice?: string; taxPercent?: string; }) {
    
    const invoice = await this.invRepo.findOneByOrFail({ id: invoiceId });
    const item = this.itemRepo.create({
      invoice,
      position: dto.position ?? 0,
      description: dto.description ?? '',
      quantity: dto.quantity ?? '1',
      unitPrice: dto.unitPrice ?? '0',
      taxPercent: dto.taxPercent ?? '0',
      lineTotal: '0',
    });
    await this.itemRepo.save(item);
    await this.recalcInvoice(invoice.id);
    return item;
  }

  async update(itemId: string, patch: Partial<InvoiceItem>) {
    const item = await this.itemRepo.findOneOrFail({ where: { id: itemId }, relations: ['invoice'] });
    Object.assign(item, patch);
    await this.itemRepo.save(item);
    await this.recalcInvoice(item.invoice.id);
    return item;
  }

  async remove(itemId: string) {
    const item = await this.itemRepo.findOneOrFail({ where: { id: itemId }, relations: ['invoice'] });
    await this.itemRepo.delete(itemId);
    await this.recalcInvoice(item.invoice.id);
  }
}
