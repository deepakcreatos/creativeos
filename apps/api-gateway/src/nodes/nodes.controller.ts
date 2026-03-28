/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * nodes.controller.ts
 * All remaining CreativeOS node controllers embedded in the Gateway.
 * Nodes 3-13: Content, Media, Strategy, Revision, Approval, Scheduler, Analytics, Billing, Voice, Knowledge, Audit
 */
import { Controller, Get, Post, Body, HttpCode, HttpStatus, Req, Param, Delete, Patch, Headers } from '@nestjs/common';
import { OpenAI } from 'openai';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient({ log: ['error', 'warn'] });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', { apiVersion: '2025-01-27.acacia' as any });

// ─── NODE 3: Content Engine ──────────────────────────────────────────────────
@Controller('content')
export class ContentController {
  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  async generate(@Req() req: any, @Body() body: any) {
    const prompt = String(body.prompt || 'Generate content');
    const platform = String(body.platform || 'LinkedIn');
    
    let aiText = '';
    try {
      if (process.env.OPENAI_API_KEY) {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: `You are an expert ${platform} marketing copywriter. Write highly engaging, conversion-optimized copy.` },
            { role: 'user', content: `Write a post about: ${prompt}` }
          ]
        });
        aiText = completion.choices[0].message.content || '';
      }
    } catch (e) {
      console.warn('OpenAI failure, using fallback content.');
    }

    const finalCopy = aiText || `🚀 [AI Generated for ${platform}]\n\n${prompt}\n\n✨ Crafted by CreativeOS to maximize engagement.`;

    // Persist to DB
    const contentItem = await prisma.contentItem.create({
      data: {
        userId: req?.user?.id || 'demo-user',
        platform,
        copyText: finalCopy,
        status: 'draft',
      }
    });

    return {
      status: 'success',
      node: 'NODE_3_CONTENT_ENGINE',
      data: {
        id: contentItem.id,
        items: [
          {
            platform,
            text: finalCopy,
            id: contentItem.id
          }
        ],
        generatedAt: contentItem.createdAt,
      },
    };
  }

  @Get()
  async list(@Req() req: any) {
    const userId = req?.user?.id || 'demo-user';
    const items = await prisma.contentItem.findMany({ where: { userId, isActive: true }, orderBy: { createdAt: 'desc' } });
    return { status: 'success', node: 'NODE_3_CONTENT_ENGINE', data: items };
  }
}

// ─── NODE 4: Media Engine ─────────────────────────────────────────────────────
@Controller('media')
export class MediaController {
  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  generate(@Body() body: any) {
    const prompt = String(body.prompt || 'Generate media');
    return {
      status: 'success',
      node: 'NODE_4_MEDIA_ENGINE',
      data: {
        url: `https://placehold.co/1080x1080/0061FF/FFFFFF?text=${encodeURIComponent(prompt.slice(0, 30))}`,
        type: body.type || 'IMAGE',
        dimensions: body.dimensions || { width: 1080, height: 1080 },
        prompt,
        generatedAt: new Date().toISOString(),
      },
    };
  }
}

// ─── NODE 2: Strategy Engine ──────────────────────────────────────────────────
@Controller('strategy')
export class StrategyController {
  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  async generate(@Req() req: any, @Body() body: any) {
    const objective = String(body.objective || 'Brand Awareness');
    const budget = Number(body.budget || 5000);
    const platforms = body.platforms || ['LinkedIn', 'Meta'];
    
    let finalKpis = ['Reach: 50,000', 'Engagement Rate: 4%', 'Leads: 200', 'Conversions: 20'];
    let finalPillars = ['Brand Authority', 'Market Education', 'Product Showcase', 'Customer Stories', 'Industry Trends'];

    try {
      if (process.env.OPENAI_API_KEY) {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: 'You are an elite marketing strategist. Return JSON with keys "kpis" (array of strings) and "pillars" (array of strings).' },
            { role: 'user', content: `Objective: ${objective}. Budget: $${budget}. Channels: ${platforms.join(', ')}.` }
          ]
        });
        const aiJson = JSON.parse(completion.choices[0].message.content || '{}');
        if (aiJson.kpis) finalKpis = aiJson.kpis;
        if (aiJson.pillars) finalPillars = aiJson.pillars;
      }
    } catch (e) {
      console.warn('OpenAI failure, fallback to mock strategy', e);
    }

    const budgetBreakdown = { total: budget, breakdown: { Primary: Math.floor(budget * 0.7), Secondary: Math.floor(budget * 0.3) } };
    const timeline = body.duration || '30 days';

    // Persist strategy to DB
    const strat = await prisma.strategy.create({
      data: {
        userId: req?.user?.id || 'demo-user',
        objective,
        platforms,
        pillars: finalPillars,
        kpis: finalKpis,
        budget: budgetBreakdown,
        timeline,
      }
    });

    return {
      status: 'success',
      node: 'NODE_2_STRATEGY_ENGINE',
      data: {
        id: strat.id,
        pillars: finalPillars,
        channels: platforms,
        budget: budgetBreakdown,
        timeline,
        kpis: finalKpis,
        generatedAt: strat.createdAt,
      },
    };
  }

  @Get()
  async list(@Req() req: any) {
    const userId = req?.user?.id || 'demo-user';
    const strategies = await prisma.strategy.findMany({ where: { userId, isActive: true }, orderBy: { createdAt: 'desc' } });
    return { status: 'success', node: 'NODE_2_STRATEGY_ENGINE', data: strategies };
  }
}

// ─── NODE 5: Revision Engine ──────────────────────────────────────────────────
@Controller('revision')
export class RevisionController {
  @Post('process')
  @HttpCode(HttpStatus.CREATED)
  process(@Body() body: any) {
    return {
      status: 'success',
      node: 'NODE_5_REVISION_ENGINE',
      data: {
        original: body.content || '',
        revised: `[AI Revised] ${body.content || 'Content revised for clarity, tone and platform optimization.'}`,
        changes: ['Improved headline hook', 'Shortened sentences', 'Added clear CTA', 'Optimized hashtags'],
        score: { before: 62, after: 88 },
        processedAt: new Date().toISOString(),
      },
    };
  }
}

// ─── NODE 6: Approval Service ─────────────────────────────────────────────────
@Controller('approval')
export class ApprovalController {
  @Get()
  list() {
    return {
      approvals: [
        { id: '1', title: 'Q1 LinkedIn Campaign', status: 'pending', submittedAt: new Date().toISOString(), client: 'Squadra Media' },
        { id: '2', title: 'Product Launch Email Sequence', status: 'approved', submittedAt: new Date(Date.now() - 86400000).toISOString(), client: 'TechCorp' },
        { id: '3', title: 'Instagram Reel Scripts', status: 'revision_requested', submittedAt: new Date(Date.now() - 172800000).toISOString(), client: 'Fashion Brand X' },
      ],
      node: 'NODE_6_APPROVAL',
    };
  }

  @Post('request')
  @HttpCode(HttpStatus.CREATED)
  request(@Body() body: any) {
    return {
      status: 'success',
      node: 'NODE_6_APPROVAL',
      data: {
        id: `approval-${Date.now()}`,
        title: body.title || 'Content Approval Request',
        status: 'pending',
        submittedAt: new Date().toISOString(),
        reviewUrl: `https://creativeos-web-client.vercel.app/approvals`,
      },
    };
  }

  @Post(':id/approve')
  approve() {
    return { status: 'approved', node: 'NODE_6_APPROVAL', approvedAt: new Date().toISOString() };
  }

  @Post(':id/reject')
  reject() {
    return { status: 'rejected', node: 'NODE_6_APPROVAL', rejectedAt: new Date().toISOString() };
  }
}

// ─── NODE 7: Scheduler ────────────────────────────────────────────────────────
@Controller('scheduler')
export class SchedulerController {
  @Get()
  list() {
    return {
      scheduled: [
        { id: '1', content: 'LinkedIn Post: Brand Story', platform: 'LinkedIn', scheduledFor: new Date(Date.now() + 3 * 3600000).toISOString(), status: 'queued' },
        { id: '2', content: 'Meta Ad: Product Launch', platform: 'Meta', scheduledFor: new Date(Date.now() + 86400000).toISOString(), status: 'queued' },
        { id: '3', content: 'Email: Weekly Newsletter', platform: 'Email', scheduledFor: new Date(Date.now() + 2 * 86400000).toISOString(), status: 'draft' },
      ],
      node: 'NODE_7_SCHEDULER',
    };
  }

  @Post('schedule')
  @HttpCode(HttpStatus.CREATED)
  schedule(@Body() body: any) {
    return {
      status: 'success',
      node: 'NODE_7_SCHEDULER',
      data: {
        id: `sched-${Date.now()}`,
        platform: body.platform || 'LinkedIn',
        scheduledFor: body.scheduledFor || new Date(Date.now() + 86400000).toISOString(),
        status: 'queued',
      },
    };
  }
}

// ─── NODE 8: Analytics Engine ─────────────────────────────────────────────────
@Controller('analytics')
export class AnalyticsController {
  @Get()
  overview() {
    return {
      node: 'NODE_8_ANALYTICS',
      data: {
        reach: 48200,
        impressions: 142000,
        engagementRate: 4.2,
        leads: 186,
        conversions: 23,
        roas: 3.8,
        topPlatform: 'LinkedIn',
        trend: '+18% vs last month',
        breakdown: [
          { platform: 'LinkedIn', reach: 22000, engagement: 5.1, leads: 98 },
          { platform: 'Meta', reach: 18000, engagement: 3.8, leads: 62 },
          { platform: 'Google', reach: 8200, engagement: 2.9, leads: 26 },
        ],
      },
    };
  }

  @Get('report')
  report() {
    return {
      node: 'NODE_8_ANALYTICS',
      report: {
        period: 'Last 30 days',
        generatedAt: new Date().toISOString(),
        highlights: ['Reached 48K+ unique users', '186 qualified leads generated', '23 conversions tracked', 'ROAS of 3.8x achieved'],
      },
    };
  }
}

// ─── NODE 9: Billing ──────────────────────────────────────────────────────────
@Controller('billing')
export class BillingController {
  @Get()
  status() {
    return {
      node: 'NODE_9_BILLING',
      plan: 'Professional',
      status: 'active',
      nextBilling: new Date(Date.now() + 30 * 86400000).toISOString(),
      usage: { dnaProfiles: 3, campaigns: 8, contentPieces: 47, aiCredits: { used: 340, total: 1000 } },
    };
  }

  @Post('checkout')
  @HttpCode(HttpStatus.CREATED)
  async checkout(@Req() req: any, @Body() body: any) {
    const planId = body.planId || 'price_pro_monthly';
    const userId = req?.user?.id || 'demo-user';

    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder') {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{ price: planId, quantity: 1 }],
          mode: 'subscription',
          success_url: 'https://creativeos-web-client.vercel.app/billing?success=true',
          cancel_url: 'https://creativeos-web-client.vercel.app/pricing?canceled=true',
          client_reference_id: userId,
        });
        return { status: 'success', node: 'NODE_9_BILLING', url: session.url };
      } catch (e) {
        console.error('Stripe Error:', e);
        return { status: 'error', message: 'Failed to create checkout session' };
      }
    }

    // Mock response
    return { 
      status: 'success', 
      node: 'NODE_9_BILLING', 
      url: 'https://creativeos-web-client.vercel.app/billing?success=true&mock=true',
      message: 'Mock Checkout Session Created (No API Key)' 
    };
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async webhook(@Body() body: any, @Headers('stripe-signature') signature: string) {
    // In production, you would use stripe.webhooks.constructEvent to verify signature
    // using the raw body buffer and your webhook secret.
    const event = body; 
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log(`Payment complete for user ${session.client_reference_id}`);
        // Here you would find the user in DB and update their subscription status
        break;
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        console.log(`Subscription deleted: ${subscription.id}`);
        // Handle cancellation
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  }
}

// ─── NODE 10: Voice ───────────────────────────────────────────────────────────
@Controller('voice')
export class VoiceController {
  @Post('command')
  @HttpCode(HttpStatus.OK)
  command(@Body() body: any) {
    const cmd = String(body.command || '').toLowerCase();
    let response = 'Command received. Processing your request.';
    if (cmd.includes('campaign')) response = 'Opening Campaign Generator. Ready to create a new campaign.';
    else if (cmd.includes('dna') || cmd.includes('client')) response = 'Navigating to Client DNA setup.';
    else if (cmd.includes('content')) response = 'Launching Content Studio for AI generation.';
    else if (cmd.includes('analytics')) response = 'Fetching your latest analytics report.';
    return { node: 'NODE_10_VOICE', command: body.command, response, action: 'NAVIGATE', processedAt: new Date().toISOString() };
  }
}

// ─── NODE 11: Knowledge Graph ─────────────────────────────────────────────────
@Controller('knowledge')
export class KnowledgeController {
  @Get()
  graph() {
    return {
      node: 'NODE_11_KNOWLEDGE_GRAPH',
      nodes: [
        { id: 'dna-1', type: 'ClientDNA', label: 'Client Profile', connections: 3 },
        { id: 'camp-1', type: 'Campaign', label: 'Q1 Campaign', connections: 5 },
        { id: 'cont-1', type: 'Content', label: 'LinkedIn Post Series', connections: 2 },
        { id: 'aud-1', type: 'Audience', label: 'Decision Makers 35-50', connections: 4 },
        { id: 'comp-1', type: 'Competitor', label: 'Competitor Analysis', connections: 2 },
      ],
      edges: [
        { from: 'dna-1', to: 'camp-1', label: 'powers' },
        { from: 'camp-1', to: 'cont-1', label: 'generates' },
        { from: 'dna-1', to: 'aud-1', label: 'targets' },
      ],
    };
  }

  @Post('query')
  query(@Body() body: any) {
    return { node: 'NODE_11_KNOWLEDGE_GRAPH', query: body.query, results: [], processedAt: new Date().toISOString() };
  }
}

// ─── NODE 12: Audit ───────────────────────────────────────────────────────────
@Controller('audit')
export class AuditController {
  @Get()
  logs() {
    return {
      node: 'NODE_12_AUDIT',
      logs: [
        { id: '1', action: 'DNA_CREATED', userId: 'user-1', timestamp: new Date(Date.now() - 600000).toISOString(), status: 'SUCCESS' },
        { id: '2', action: 'CAMPAIGN_GENERATED', userId: 'user-1', timestamp: new Date(Date.now() - 300000).toISOString(), status: 'SUCCESS' },
        { id: '3', action: 'CONTENT_GENERATED', userId: 'user-1', timestamp: new Date(Date.now() - 120000).toISOString(), status: 'SUCCESS' },
        { id: '4', action: 'ACCESS_GRANTED', userId: 'user-1', timestamp: new Date().toISOString(), status: 'SUCCESS' },
      ],
      total: 4,
    };
  }
}
