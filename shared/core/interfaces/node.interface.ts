
export enum NodeType {
    ACCESS = 'NODE_0_ACCESS',
    CLIENT_DNA = 'NODE_1_CLIENT_DNA',
    STRATEGY = 'NODE_2_STRATEGY',
    CONTENT = 'NODE_3_CONTENT',
    IMAGE_VIDEO = 'NODE_4_IMAGE_VIDEO',
    REVISION = 'NODE_5_REVISION',
    APPROVAL = 'NODE_6_APPROVAL',
    SCHEDULER = 'NODE_7_SCHEDULER',
    ANALYTICS = 'NODE_8_ANALYTICS',
    BILLING = 'NODE_9_BILLING',
    VOICE = 'NODE_10_VOICE',
    KNOWLEDGE = 'NODE_11_KNOWLEDGE',
    SECURITY = 'NODE_12_SECURITY',
}

export interface NodeInput {
    context: {
        userId: string;
        workspaceId: string;
        traceId: string;
    };
    payload: any;
}

export interface NodeOutput<T = any> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
    metadata: {
        node: NodeType;
        timestamp: string;
        auditId: string;
    };
}

export interface CreativeOSNode {
    type: NodeType;
    process(input: NodeInput): Promise<NodeOutput>;
}
