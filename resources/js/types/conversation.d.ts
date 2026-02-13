export interface Conversation {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    messages: Message[];
}

export interface Message {
    id: number;
    conversation_id: number;
    user_id: number;
    agent?: string;
    role?: string;
    content: string;
    attachments?: string[];
    tool_calls?: string[];
    tool_results?: string[];
    usage?: string;
    meta?: string;
    created_at: string;
    updated_at: string;
}
