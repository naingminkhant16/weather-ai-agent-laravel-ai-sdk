<?php

namespace App\Http\Controllers;

use App\Ai\Agents\WeatherAgent;
use App\Models\Conversation;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConversationController extends Controller
{
    public function home()
    {
        return Inertia::render('home');
    }

    public function conversations()
    {
        $conversations = Conversation::where('user_id', Auth::id())->latest()->limit(20)->get();
        return response()->json([
            'conversations' => $conversations
        ]);
    }

    public function new_conversation()
    {
        return Inertia::render('new_conversation');
    }

    public function store()
    {
        $validated = request()->validate([
            'message' => 'required|string',
        ]);

        $conversation = Conversation::create([
            'user_id' => Auth::id(),
            'title' => substr($validated['message'], 0, 50) . '...',
        ]);

        // Save user message
        $conversation->messages()->create([
            'user_id' => Auth::id(),
            'agent' => WeatherAgent::class,
            'role' => 'user',
            'content' => $validated['message'],
            'attachments' => [],
            'tool_calls' => [],
            'tool_results' => [],
            'usage' => [],
            'meta' => [],
        ]);

        // Call AI Agent to generate response
        $response = (new WeatherAgent($conversation, Auth::user()))->prompt($validated['message']);

        // Save agent response message
        $conversation->messages()->create([
            'user_id' => 0,
            'agent' => WeatherAgent::class,
            'role' => WeatherAgent::ROLE,
            'content' => (string)$response,
            'attachments' => [],
            'tool_calls' => [],
            'tool_results' => [],
            'usage' => [],
            'meta' => [],
        ]);

        return to_route('conversations.show', $conversation);
    }

    public function show(Conversation $conversation)
    {
        if ($conversation->user_id !== Auth::id()) {
            abort(403);
        }

        $conversation->load('messages');

        return Inertia::render('conversations/show', [
            'conversation' => $conversation,
            'messages' => $conversation->messages
        ]);
    }

    public function chat(Conversation $conversation)
    {
        $validated = request()->validate([
            'message' => 'required|string',
        ]);

        // Call AI Agent to generate response
        (new WeatherAgent($conversation, Auth::user()))
            ->continue($conversation->id, as: Auth::user())
            ->prompt($validated['message']);

        return to_route('conversations.show', $conversation);
    }
}
