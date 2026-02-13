<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use Illuminate\Support\Facades\Route;


Route::get('/login', [Authcontroller::class, 'login'])
    ->middleware('guest')
    ->name('login');

Route::get('/register', [Authcontroller::class, 'register'])
    ->middleware('guest')
    ->name('register');

Route::post('/login-attempt', [Authcontroller::class, 'login_attempt'])
    ->middleware('guest')
    ->name('login.attempt');

Route::post('/register', [Authcontroller::class, 'store'])
    ->middleware('guest')
    ->name('register.store');

Route::middleware(['auth'])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

    // Conversation
    Route::get('/', [ConversationController::class, 'home'])->name('home');
    Route::get('/conversations', [ConversationController::class, 'conversations'])
        ->name('conversations');
    Route::get('/new-conversation', [ConversationController::class, 'new_conversation'])
        ->name('new_conversation');
    Route::post('/conversations', [ConversationController::class, 'store'])->name('conversations.store');
    Route::get('/conversations/{conversation}', [ConversationController::class, 'show'])->name('conversations.show');

    // Chat
    Route::post('/conversations/{conversation}/chat', [ConversationController::class, 'chat'])->name('conversations.chat');
});
