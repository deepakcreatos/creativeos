
import { Body, Controller, Post } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('invoice')
  async createInvoice(@Body() body: { assetId: string, type: 'IMAGE' | 'VIDEO' | 'TEXT' }) {
    return this.billingService.calculateCost(body.assetId, body.type);
  }
}
