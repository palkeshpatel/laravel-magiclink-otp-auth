<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\InvitationController;
use App\Http\Controllers\Auth\MagicLinkController;
use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\Auth\UserProfileController;
use App\Http\Controllers\Auth\WellnessController;
use App\Http\Controllers\Auth\WellbeingController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Invitation Routes
Route::post('/invite', [InvitationController::class, 'invite']);

// Magic Link Routes
Route::get('/magic-link/user', [MagicLinkController::class, 'getUserByToken']);
Route::post('/magic-link/create', [MagicLinkController::class, 'createMagicLink']);

// OTP Routes
Route::get('/verify-email', [OtpController::class, 'verifyEmail']);
Route::get('/send-otp', [OtpController::class, 'sendOtp']);
Route::get('/verify-otp', [OtpController::class, 'verifyOtp']);

// User Profile Routes
Route::post('/user/profile', [UserProfileController::class, 'saveProfile']);
Route::get('/user/profile', [UserProfileController::class, 'getProfile']);

// Wellness Interests Routes
Route::get('/wellness-interests', [WellnessController::class, 'getWellnessInterests']);
Route::post('/wellness-interests', [WellnessController::class, 'saveUserWellnessInterests']);
Route::get('/user/wellness-interests', [WellnessController::class, 'getUserWellnessInterests']);

// Wellbeing Pillars Routes
Route::get('/wellbeing-pillars', [WellbeingController::class, 'getWellbeingPillars']);
Route::post('/wellbeing-pillars', [WellbeingController::class, 'saveUserWellbeingPillars']);
Route::get('/user/wellbeing-pillars', [WellbeingController::class, 'getUserWellbeingPillars']);
