<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KanbanController;

Route::get('/board', [KanbanController::class, 'getBoard']);
Route::post('/cards', [KanbanController::class, 'storeCard']);
Route::patch('/cards/{id}', [KanbanController::class, 'updateCard']);
