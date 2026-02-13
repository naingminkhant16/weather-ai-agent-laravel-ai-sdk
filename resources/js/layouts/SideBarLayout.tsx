import { Conversation } from '@/types/conversation';
import { Link } from '@inertiajs/react';
import { MessageSquarePlus } from 'lucide-react';
import { PropsWithChildren, useEffect, useState } from 'react';
import axios from 'axios';

export default function SideBarLayout({ children }: PropsWithChildren) {
    // Mock conversations for now
// fetch conversations from api
const [conversations,setConversations]=useState<Conversation[]>([]);
    useEffect(()=>{
        axios.get('/conversations').then((response)=>{
            setConversations(response.data.conversations);
        });
    },[]);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
            {/* Sidebar */}
            <aside className="w-64 flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 hidden md:flex">
                <div className="flex h-16 items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                        <span>AI Weather Agent</span>
                    </Link>
                </div>
                   <div className="flex h-16 items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
                    <Link
                        href="/new-conversation"
                        className="flex items-center gap-2 font-semibold hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                        <MessageSquarePlus className="h-5 w-5" />
                        <span>New Chat</span>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider dark:text-zinc-400">
                            Recent
                        </div>
                        <nav className="flex flex-col gap-1">
                            {conversations.map((conversation) => (
                                <Link
                                    key={conversation.id}
                                    href={`/conversations/${conversation.id}`}
                                    className="rounded-md px-2 py-1.5 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 truncate transition-colors"
                                >
                                    {conversation.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
                    {/* User profile or settings could go here */}
                    <div className="text-xs text-zinc-500 text-center">
                        AI Weather Agent
                    </div>
                    <Link
                        href="/logout"
                        className="text-xs text-center text-red-500"
                    >
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative">
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
