<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;

Route::get('/articles', [ArticleController::class, 'index']);
Route::post('/articles', [ArticleController::class, 'store']);

Route::get('/articles/count', [ArticleController::class, 'count']);
Route::get('/articles/exists', [ArticleController::class, 'exists']);

Route::put('/articles/{id}/enhance', [ArticleController::class, 'updateContent']);
