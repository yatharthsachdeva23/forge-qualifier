<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CardController;

Route::get('/cards', [CardController::class, 'index']);
Route::post('/cards', [CardController::class, 'store']);
Route::put('/cards/{id}', [CardController::class, 'update']);
Route::delete('/cards/{id}', [CardController::class, 'destroy']);
