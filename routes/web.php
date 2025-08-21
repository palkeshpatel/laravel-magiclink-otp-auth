<?php

use Illuminate\Support\Facades\Route;

// Admin route for inviting users
Route::get('/admin', function () {
    return view('admin');
});

// Serve React application for all frontend routes
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');