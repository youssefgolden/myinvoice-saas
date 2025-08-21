import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { User } from 'src/users/user.entity';
import { Client } from 'src/clients/client.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private readonly invRepo: Repository<Invoice>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Client) private readonly clientRepo: Repository<Client>,
  ) {}

  async create(dto: CreateInvoiceDto) {
    const owner = await this.userRepo.findOneByOrFail({ id: dto.ownerId });
    const client = dto.clientId ? await this.clientRepo.findOneBy({ id: dto.clientId }) : null;

    const inv = this.invRepo.create({
      owner,
      client: client ?? null,
      invoiceNumber: dto.invoiceNumber,
      issueDate: dto.issueDate,
      dueDate: dto.dueDate ?? null,
      currency: dto.currency ?? 'USD',
      status: dto.status ?? 'draft',
      subtotal: '0.00',
      taxTotal: '0.00',
      total: '0.00',
    });

    return this.invRepo.save(inv);
  }

  findAll() {
    return this.invRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const inv = await this.invRepo.findOne({ where: { id } });
    if (!inv) throw new NotFoundException('Invoice not found');
    return inv;
  }

  async update(id: string, dto: UpdateInvoiceDto) {
    const inv = await this.findOne(id);

    if (dto.clientId !== undefined) {
      inv.client = dto.clientId ? await this.clientRepo.findOneByOrFail({ id: dto.clientId }) : null;
    }
    if (dto.invoiceNumber !== undefined) inv.invoiceNumber = dto.invoiceNumber;
    if (dto.issueDate !== undefined) inv.issueDate = dto.issueDate;
    if (dto.dueDate !== undefined) inv.dueDate = dto.dueDate ?? null;
    if (dto.currency !== undefined) inv.currency = dto.currency;
    if (dto.status !== undefined) inv.status = dto.status;

    return this.invRepo.save(inv);
  }

  async remove(id: string) {
    const inv = await this.findOne(id);
    await this.invRepo.remove(inv); // cascade deletes items via FK
    return { deleted: true };
  }
}
