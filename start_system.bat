
@echo off
echo Starting CreativeOS System...

echo Starting Nodes 1-11...
start "Node 1: Client DNA" cmd /k "cd services/client-dna-service && npm run start"
start "Node 2: Strategy" cmd /k "cd services/strategy-engine && npm run start"
start "Node 3: Content" cmd /k "cd services/content-engine && npm run start"
start "Node 4: Media" cmd /k "cd services/media-engine && npm run start"
start "Node 5: Revision" cmd /k "cd services/revision-engine && npm run start"
start "Node 6: Approval" cmd /k "cd services/approval-service && npm run start"
start "Node 7: Scheduler" cmd /k "cd services/scheduler-service && npm run start"
start "Node 8: Analytics" cmd /k "cd services/analytics-engine && npm run start"
start "Node 9: Billing" cmd /k "cd services/billing-service && npm run start"
start "Node 10: Voice" cmd /k "cd services/voice-cortex && npm run start"
start "Node 11: Knowledge" cmd /k "cd services/knowledge-graph && npm run start"

echo Starting API Gateway...
start "API Gateway" cmd /k "cd apps/api-gateway && npm run start"

echo Starting Web Client...
start "Web Client" cmd /k "cd apps/web-client && npm run dev"

echo System Started! Access Frontend at http://localhost:3001
echo API Gateway at http://localhost:3000
