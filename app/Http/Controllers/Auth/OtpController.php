<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\OTPMail;
use App\Models\OtpCode;
use App\Models\User;
use App\Models\UserInvitation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class OtpController extends Controller
{
    /**
     * Verify email exists in invitations
     */
    public function verifyEmail(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $invitation = UserInvitation::where('email', $request->email)
            ->where('status', 'pending')
            ->where('expires_at', '>', now())
            ->first();

        if (!$invitation) {
            return response()->json([
                'success' => false,
                'message' => 'No valid invitation found for this email',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully',
            'data' => [
                'user' => [
                    'first_name' => $invitation->first_name,
                    'last_name' => $invitation->last_name,
                    'email' => $invitation->email,
                ]
            ]
        ]);
    }

    /**
     * Send OTP to email
     */
    public function sendOtp(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|max:255',
        ]);

        // Find user invitation
        $invitation = UserInvitation::where('email', $request->email)
            ->where('status', 'pending')
            ->where('expires_at', '>', now())
            ->first();

        if (!$invitation) {
            return response()->json([
                'success' => false,
                'message' => 'No valid invitation found for this email',
            ], 404);
        }

        // Create or get user
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            $user = User::create([
                'name' => $invitation->first_name . ' ' . $invitation->last_name,
                'first_name' => $invitation->first_name,
                'last_name' => $invitation->last_name,
                'email' => $invitation->email,
                'invitation_id' => $invitation->id,
                'password' => Hash::make('temporary_password_' . time()), // Temporary password
            ]);
        }

        // Generate OTP
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Create OTP record
        OtpCode::create([
            'user_id' => $user->id,
            'code' => $otp,
            'expires_at' => now()->addMinutes(10), // Expires in 10 minutes
        ]);

        // Send OTP email
        try {
            Mail::to($request->email)->send(new OTPMail($otp));
        } catch (\Exception $e) {
            // Log the error but don't fail the request
            Log::error('Failed to send OTP email: ' . $e->getMessage());

            // For development, you might want to return the OTP in the response
            // In production, you should remove this
            return response()->json([
                'success' => true,
                'message' => 'OTP sent successfully (check logs for email)',
                'data' => [
                    'expires_in' => 600, // 10 minutes in seconds
                    'otp' => $otp, // Remove this in production
                ]
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'OTP sent successfully',
            'data' => [
                'expires_in' => 600, // 10 minutes in seconds
            ]
        ]);
    }

    /**
     * Verify OTP
     */
    public function verifyOtp(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|max:255',
            'otp' => 'required|string|size:6|regex:/^[0-9]+$/',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        // Find valid OTP
        $otpCode = OtpCode::where('user_id', $user->id)
            ->where('code', $request->otp)
            ->where('used', false)
            ->where('expires_at', '>', now())
            ->first();

        if (!$otpCode) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired OTP',
            ], 400);
        }

        // Mark OTP as used
        $otpCode->markAsUsed();

        return response()->json([
            'success' => true,
            'message' => 'OTP verified successfully',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'profile_completed' => $user->profile_completed,
                    'registration_completed' => $user->registration_completed,
                ]
            ]
        ]);
    }
}
