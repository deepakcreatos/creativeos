# 🚀 CreativeOS Demo Mode - Setup & Testing Guide

Your "Perfect Demo" environment is ready. Follow these steps to run the full stack locally (Free, Secure, Production-Architecture).

## 1. Prerequisites
- **Docker Desktop** must be running.
- **Node.js** (v18+) installed.

## 2. Start Infrastructure (Database & Cache)
Run the helper script in the root directory:
```bash
./start-demo.bat
```
*checks: Docker containers `creativeos-demo-db` and `creativeos-demo-redis` should be running.*

## 3. Start Backend Services

### Terminal 1: Client DNA Service (The "Real" Core)
This service connects to the local DB.
```bash
cd services/client-dna-service
npm install
npx prisma db push  # Creates the DB schema
npm run start:dev
```
*Output: `🚀 CreativeOS Backend running on port 3002`*

### Terminal 2: API Gateway (The "Proxy")
This routes traffic and handles Mock Auth.
```bash
cd apps/api-gateway
npm install
npm run start:dev
```
*Output: `Nest application successfully started` (Port 3000)*

## 4. Start Frontend

### Terminal 3: Web Client
```bash
cd apps/web-client
npm install
npm run dev
```
*Output: `Ready on http://localhost:3000` (or 3001 if gateway logic differs, check terminal)*
**Note**: Since API Gateway runs on 3000, Next.js might pick 3001. 
- **API**: `http://localhost:3000`
- **Frontend**: `http://localhost:3001` (Check your terminal!)

## 5. Demo Script (Walkthrough)

1.  **Login**:
    - URL: `http://localhost:3001/auth/login`
    - Creds: `admin@creativeos.ai` / `admin` (or generic)
    - *Result*: Redirects to Dashboard.

2.  **Create Client DNA** (Real DB Test):
    - Go to: `Client DNA` page.
    - Fill form: "Acme Corp", "SaaS", "Friendly".
    - Click **Save**.
    - *Result*: "Client DNA Saved Successfully!" (Data persisted in local Postgres).

3.  **Generate Campaign** (AI/Mock Test):
    - Go to: `Campaigns` page.
    - Select Objective: "Brand Awareness".
    - Click **Generate**.
    - *Result*: Loading spinner -> Real-time generated Strategy & Mind Map (using Fallback Logic or Ollama if active).

## 6. Troubleshooting
- **Database Error?** Ensure Docker is running.
- **Auth Error?** Ensure API Gateway (Terminal 2) is running.
- **Generation Error?** Ensure Client DNA Service (Terminal 1) is running.
