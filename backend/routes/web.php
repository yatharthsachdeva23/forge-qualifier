<?php

use Illuminate\Support\Facades\Route;

Route::get('/status', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toIso8601String(),
        'message' => 'OpenClaw Backend is operational',
    ]);
});

Route::get('/', function () {
    return view('welcome');
});
