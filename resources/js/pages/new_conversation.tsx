import SideBarLayout from '@/layouts/SideBarLayout';
import { Head, useForm } from '@inertiajs/react'; // Import useForm
import { ArrowUp, Bot, Loader2 } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function NewConversation() {
    const { data, setData, post, processing, errors } = useForm({
        message: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!data.message.trim() || processing) return;

        post('/conversations');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as FormEvent);
        }
    };

    return (
        <SideBarLayout>
            <Head title="New Chat" />
            <div className="flex h-full flex-col">
                {/* Messages Area - Empty State */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <div className="mx-auto max-w-3xl space-y-6">
                        <div className="flex h-full flex-col items-center justify-center text-center text-zinc-500 mt-20">
                            <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
                                <Bot className="h-8 w-8 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                                How can I help you today?
                            </h2>
                            <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                                I can help you check the weather, give forecasts and todo activities.
                            </p>
                        </div>
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