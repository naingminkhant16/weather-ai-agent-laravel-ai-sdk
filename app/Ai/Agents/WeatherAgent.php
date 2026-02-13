<?php

namespace App\Ai\Agents;

use App\Models\Conversation;
use App\Models\ConversationMessage;
use App\Models\User;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Attributes\Provider;
use Laravel\Ai\Concerns\RemembersConversations;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\Conversational;
use Laravel\Ai\Contracts\HasTools;
use Laravel\Ai\Messages\Message;
use Laravel\Ai\Promptable;
use Stringable;

#[Provider('groq')]
class WeatherAgent implements Agent, Conversational, HasTools
{
    use Promptable, RemembersConversations;

    public const NAME = "weather-agent";
    public const ROLE = "assistant";

    public function __construct(public Conversation $conversation, public User $user)
    {
    }

    /**
     * Get the instructions that the agent should follow.
     */
    public function instructions(): Stringable|string
    {
        return 'You are a helpful weather assistant that provides accurate weather information
        and can help planning activities based on the weather';
    }

    /**
     * Get the list of messages comprising the conversation so far.
     */
    public function messages(): iterable
    {
        return ConversationMessage::where([
            'user_id' => $this->user->id,
            'conversation_id' => $this->conversation->id
        ])
            ->latest()
            ->limit(50)
            ->get()
            ->reverse()
            ->map(fn($message) => new Message($message->role, $message->content))
            ->all();
    }

    /**
     * Get the tools available to the agent.
     *
     * @return Tool[]
     */
    public function tools(): iterable
    {
        return [];
    }

    /**
     * Get the agent's structured output schema definition.
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'temperature' => $schema->number()->required(),
            'condition' => $schema->string()->required(),
            'activities' => $schema->array()->required(),
        ];
    }
}
