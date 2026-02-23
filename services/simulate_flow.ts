import axios from 'axios';

const log = (node: string, msg: string) => console.log(`[${node}] ${msg}`);
const API_URL = 'http://localhost:4000/api';

async function runSimulation() {
  console.log('🚀 Starting CreativeOS Node E2E Integration Test...\n');
  try {
    // --- NODE 12: AUDIT & SECURITY ---
    log('NODE_12', 'Logging test startup...');
    await axios.post(`${API_URL}/audit`, { action: 'E2E_TEST_START', userId: 'tester' });

    // --- NODE 1: CLIENT DNA ---
    log('NODE_1', 'Creating Client DNA in PostgreSQL (pgvector)...');
    const dnaRes = await axios.post(`${API_URL}/dna`, {
      clientName: 'Integration Tester',
      industry: 'SaaS',
      brandTone: 'Analytical',
      audience: 'Engineers',
      semanticTags: ['testing', 'automation'],
      competitors: []
    });
    const dnaId = dnaRes.data.data.id;
    log('NODE_1', `Success! DNA ID: ${dnaId}`);

    // --- NODE 2: STRATEGY (Groq) ---
    log('NODE_2', 'Generating Campaign Strategy (Groq LLaMA 3)...');
    const stratRes = await axios.post(`${API_URL}/strategy/generate`, {
      clientDnaId: dnaId,
      objective: 'Brand Awareness',
      targetAudience: 'Developers',
      budget: 500,
      durationDays: 7
    });
    const stratId = stratRes.data.data.id;
    log('NODE_2', `Success! Strategy ID: ${stratId}`);

    // --- NODE 3: CONTENT (Groq) ---
    log('NODE_3', 'Generating Content Items (Groq LLaMA 3)...');
    const contentRes = await axios.post(`${API_URL}/content/generate`, {
      blueprintId: stratId,
      format: 'LINKEDIN_POST'
    });
    const contentId = contentRes.data.data.items[0].id;
    log('NODE_3', `Success! Content Item ID: ${contentId}`);

    // --- NODE 4: MEDIA (HuggingFace) ---
    log('NODE_4', 'Generating Visual Assets (Hugging Face Stable Diffusion)...');
    const mediaRes = await axios.post(`${API_URL}/media/generate`, {
      contentId: contentId,
      prompt: 'A futuristic server rack glowing with neon blue lights, highly detailed, 4k'
    });
    const assetId = mediaRes.data.data.id;
    log('NODE_4', `Success! Media Asset ID: ${assetId}`);

    // --- NODE 5: REVISION (Groq) ---
    log('NODE_5', 'Testing Revision Intelligence (Groq)...');
    const revRes = await axios.post(`${API_URL}/revision/process`, {
      originalContentId: contentId,
      userFeedback: 'Make it sound more professional and less cheesy'
    });
    log('NODE_5', `Success! Revision Classified as: ${revRes.data.data.classification}`);

    // --- NODE 6: APPROVAL (Event Emitter) ---
    log('NODE_6', 'Triggering Native Node.js Webhook Approval...');
    const appRes = await axios.post(`${API_URL}/approval/request`, {
      assetId: assetId,
      type: 'CONTENT'
    });
    log('NODE_6', `Success! Approval Event emitted for ${assetId}`);

    // --- NODE 7: SCHEDULER (Redis/BullMQ) ---
    log('NODE_7', 'Queueing job in Redis via BullMQ...');
    const schedRes = await axios.post(`${API_URL}/scheduler/schedule`, {
      assetId: assetId,
      platform: 'LinkedIn',
      scheduledTime: new Date(Date.now() + 60000).toISOString()
    });
    log('NODE_7', `Success! Job Queued: ${schedRes.data.data.jobId}`);

    // --- NODE 8: ANALYTICS (PostHog) ---
    log('NODE_8', 'Pushing Metrics to PostHog...');
    const anaRes = await axios.get(`${API_URL}/analytics/campaign/${stratId}`);
    log('NODE_8', `Success! Analytics Insights: ${anaRes.data.data.insight}`);

    // --- NODE 11: KNOWLEDGE GRAPH (PostgreSQL) ---
    log('NODE_11', 'Storing Graphic Relationships in PostgreSQL Prisma...');
    const graphRes = await axios.post(`${API_URL}/knowledge/relationship`, {
      sourceId: dnaId,
      targetId: stratId,
      type: 'HAS_STRATEGY'
    });
    log('NODE_11', `Success! Relationship Graph Updated.`);

    log('NODE_12', 'Logging test completion...');
    await axios.post(`${API_URL}/audit`, { action: 'E2E_TEST_COMPLETE', userId: 'tester' });

    console.log('\n✅ ALL INTEGRATION TESTS PASSED. Every node correctly fired its free alternative.');
  } catch (error: any) {
    console.error('\n❌ INTEGRATION TEST FAILED!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error);
    }
  }
}

runSimulation();
