<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::namespace('\App\Http\Controllers\Api')
    ->middleware(['auth:sanctum', 'verified'])
    ->group(function () {
        Route::get('/me', MeController::class);

        Route::apiResource('users', UserController::class);
    });
