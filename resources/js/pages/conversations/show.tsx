import SideBarLayout from '@/layouts/SideBarLayout';
import { Conversation, Message } from '@/types/conversation';
import { Head, useForm } from '@inertiajs/react';
import { ArrowUp, Bot, Loader2, User } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
    conversation: Conversation;
    messages: Message[];
}

export default function Show({ conversation, messages }: Props) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!data.message.trim() || processing) return;

        post(`/conversations/${conversation.id}/chat`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as FormEvent);
        }
    };

    return (
        <SideBarLayout>
            <Head title={conversation.title} />
            <div className="flex h-full flex-col">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <div className="mx-auto max-w-3xl space-y-6">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-4 ${
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                {message.role !== 'user' && (
                                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-zinc-100 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
                                        <Bot className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                                    </div>
                                )}
                                <div
                                    className={`relative max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                                        message.role === 'user'
                                            ? 'bg-blue-600 text-white dark:bg-blue-500'
                                            : 'bg-white border border-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100'
                                    }`}
                                >
                                    <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                                        <ReactMarkdown>{message.content}</ReactMarkdown>
                                    </div>
                                </div>
                                {message.role === 'user' && (
                                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
                                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mx-auto max-w-3xl">
                        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-900">
                            <textarea
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Message Weather Agent..."
                                className="max-h-32 min-h-[44px] w-full resize-none bg-transparent px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100"
                                rows={1}
                                style={{ minHeight: '44px' }}
                            />
                            <button
                                type="submit"
                                disabled={!data.message.trim() || processing}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                {processing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <ArrowUp className="h-4 w-4" />
                                )}
                            </button>
                        </form>
                         <div className="mt-2 text-center text-xs text-zinc-400">
                            Weather Agent With Laravel AI SDK, Made by Naing Min Khant.
                        </div>
                    </div>
                </div>
            </div>
        </SideBarLayout>
    );
}
