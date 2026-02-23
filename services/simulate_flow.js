"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var log = function (node, msg) { return console.log("[".concat(node, "] ").concat(msg)); };
var API_URL = 'http://localhost:4000/api';
function runSimulation() {
    return __awaiter(this, void 0, void 0, function () {
        var dnaRes, dnaId, stratRes, stratId, contentRes, contentId, mediaRes, assetId, revRes, appRes, schedRes, anaRes, graphRes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🚀 Starting CreativeOS Node E2E Integration Test...\n');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 13, , 14]);
                    // --- NODE 12: AUDIT & SECURITY ---
                    log('NODE_12', 'Logging test startup...');
                    return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/audit"), { action: 'E2E_TEST_START', userId: 'tester' })];
                case 2:
                    _a.sent();
                    // --- NODE 1: CLIENT DNA ---
                    log('NODE_1', 'Creating Client DNA in PostgreSQL (pgvector)...');
                    return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/dna"), {
                            clientName: 'Integration Tester',
                            industry: 'SaaS',
                            brandTone: 'Analytical',
                            audience: 'Engineers',
                            semanticTags: ['testing', 'automation'],
                            competitors: []
                        })];
                case 3:
                    dnaRes = _a.sent();
                    dnaId = dnaRes.data.data.id;
                    log('NODE_1', "Success! DNA ID: ".concat(dnaId));
                    // --- NODE 2: STRATEGY (Groq) ---
                    log('NODE_2', 'Generating Campaign Strategy (Groq LLaMA 3)...');
                    return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/strategy/generate"), {
                            clientDnaId: dnaId,
                            objective: 'Brand Awareness',
                            targetAudience: 'Developers',
                            budget: 500,
                            durationDays: 7
                        })];
                case 4:
                    stratRes = _a.sent();
                    stratId = stratRes.data.data.id;
                    log('NODE_2', "Success! Strategy ID: ".concat(stratId));
                    // --- NODE 3: CONTENT (Groq) ---
                    log('NODE_3', 'Generating Content Items (Groq LLaMA 3)...');
                    return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/content/generate"), {
                            blueprintId: stratId,
                            format: 'LINKEDIN_POST'
                        })];
                case 5:
                    contentRes = _a.sent();
                    contentId = contentRes.data.data.items[0].id;
                    log('NODE_3', "Success! Content Item ID: ".concat(contentId));
                    // --- NODE 4: MEDIA (HuggingFace) ---
                    log('NODE_4', 'Generating Visual Assets (Hugging Face Stable Diffusion)...');
                    return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/media/generate"), {
                            contentId: contentId,
                            prompt: 'A futuristic server rack glowing with neon blue lights, highly detailed, 4k'
                        })];
                case 6:
                    mediaRes = _a.sent();
                    assetId = mediaRes.data.data.id;
                    log('NODE_4', "Success! Media Asset ID: ".concat(assetId));
                    // --- NODE 5: REVISION (Groq) ---
                    log('NODE_5', 'Testing Revision Intelligence (Groq)...');
                    return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/revision/process"), {
                            originalContentId: contentId,
                            userFeedback: 'Make it sound more professional and less cheesy'
                        })];
                case 7:
                    revRes = _a.sent();
                    log('NODE_5', "Success! Revision Classified as: ".concat(revRes.data.data.classification));
                    // --- NODE 6: APPROVAL (Event Emitter) ---
                    log('NODE_6', 'Triggering Native Node.js Webhook Approval...');
                    return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/approval/request"), {
                            assetId: assetId,
                            type: 'CONTENT'
                        })];
                case 8:
                    appRes = _a.sent();
                    log('NODE_6', "Success! Approval Event emitted for ".concat(assetId));
                    // --- NODE 7: SCHEDULER (Redis/BullMQ) ---
                    log('NODE_7', 'Queueing job in Redis via BullMQ...');
                    return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/scheduler/schedule"), {
                            assetId: assetId,
                            platform: 'LinkedIn',
                            scheduledTime: new Date(Date.now() + 60000).toISOString()
                        })];
                case 9:
                    schedRes = _a.sent();
                    log('NODE_7', "Success! Job Queued: ".concat(schedRes.data.data.jobId));
                    // --- NODE 8: ANALYTICS (PostHog) ---
                    log('NODE_8', 'Pushing Metrics to PostHog...');
                    return [4 /*yield*/, axios_1.default.get("".concat(API_URL, "/analytics/campaign/").concat(stratId))];
                case 10:
                    anaRes = _a.sent();
                    log('NODE_8', "Success! Analytics Insights: ".concat(anaRes.data.data.insight));
                    // --- NODE 11: KNOWLEDGE GRAPH (PostgreSQL) ---
                    log('NODE_11', 'Storing Graphic Relationships in PostgreSQL Prisma...');
                    return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/knowledge/relationship"), {
                            sourceId: dnaId,
                            targetId: stratId,
                            type: 'HAS_STRATEGY'
                        })];
                case 11:
                    graphRes = _a.sent();
                    log('NODE_11', "Success! Relationship Graph Updated.");
                    log('NODE_12', 'Logging test completion...');
                    return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/audit"), { action: 'E2E_TEST_COMPLETE', userId: 'tester' })];
                case 12:
                    _a.sent();
                    console.log('\n✅ ALL INTEGRATION TESTS PASSED. Every node correctly fired its free alternative.');
                    return [3 /*break*/, 14];
                case 13:
                    error_1 = _a.sent();
                    console.error('\n❌ INTEGRATION TEST FAILED!');
                    if (error_1.response) {
                        console.error('Status:', error_1.response.status);
                        console.error('Data:', JSON.stringify(error_1.response.data, null, 2));
                    }
                    else {
                        console.error(error_1);
                    }
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
runSimulation();
