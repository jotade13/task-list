<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;



Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('jwt.auth')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/tasks',[TaskController::class,'store']);
    Route::get('/tasks',[TaskController::class,'index']);
    Route::put('/tasks/{task:id}',[TaskController::class,'update']);
    Route::delete('/tasks/{task:id}',[TaskController::class,'destroy']);
});

/*
Route::post('/tasks',[TaskController::class,'store']);
Route::get('/tasks',[TaskController::class,'index']);
Route::put('/tasks/{task:id}',[TaskController::class,'update']);
Route::delete('/tasks/{task:id}',[TaskController::class,'destroy']);
*/
