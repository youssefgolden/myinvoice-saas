import { Injectable } from '@nestjs/common';
import { InvoiceItem } from 'src/invoice-items/invoice-item.entity';

// my custom functions
function toInt(s: string) { return parseInt(s, 10) || 0; }
function padLeft(n: number, w = 2) { return n.toString().padStart(w, '0'); }

// "12.345" -> 12345 (thousandths)
function toThousandths(qty: string) {
  const [a, b = ''] = qty.split('.');
  const frac = (b + '000').slice(0, 3);
  return toInt(a) * 1000 + toInt(frac);
}

// "99.99" -> 9999 (cents)
function toCents(money: string) {
  const [a, b = ''] = money.split('.');
  const frac = (b + '00').slice(0, 2);
  return toInt(a) * 100 + toInt(frac);
}

// "20.00" -> 2000 (basis points)
function toBps(pct: string) {
  const [a, b = ''] = pct.split('.');
  const frac = (b + '00').slice(0, 2);
  return toInt(a) * 100 + toInt(frac);
}

function fromCents(cents: number) {
  const sign = cents < 0 ? '-' : '';
  const v = Math.abs(cents);
  const i = Math.floor(v / 100);
  const f = v % 100;
  return `${sign}${i}.${padLeft(f, 2)}`;
}

@Injectable()
export class InvoiceCalcService {
  // qty(3dp) * unit(2dp) -> net cents, rounded half-up
  computeNetLineCents(qty: string, unit: string) {
    const qTh = toThousandths(qty);
    const uC = toCents(unit);
    // (qTh * uC) / 1000 with rounding
    const num = qTh * uC;
    return Math.round(num / 1000);
  }

  // tax = net * pct(bps) / 10000
  computeTaxCents(netCents: number, taxPercent: string) {
    const bps = toBps(taxPercent);
    return Math.round((netCents * bps) / 10000);
  }

  // per-line total (net + tax) as string (2dp)
  computeLineTotal(qty: string, unit: string, taxPercent: string): string {
    const net = this.computeNetLineCents(qty, unit);
    const tax = this.computeTaxCents(net, taxPercent);
    return fromCents(net + tax);
  }

  // sum over items -> { subtotal, taxTotal, total } as strings (2dp)
  computeTotals(items: InvoiceItem[]) {
    let subC = 0, taxC = 0;
    for (const it of items) {
      const net = this.computeNetLineCents(it.quantity, it.unitPrice);
      const tax = this.computeTaxCents(net, it.taxPercent);
      subC += net;
      taxC += tax;
    }
    const totC = subC + taxC;
    return {
      subtotal: fromCents(subC),
      taxTotal: fromCents(taxC),
      total: fromCents(totC),
    };
  }
}
