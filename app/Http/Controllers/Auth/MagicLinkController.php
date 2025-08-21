<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\MagicLink;
use App\Models\User;
use App\Models\UserInvitation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class MagicLinkController extends Controller
{
    /**
     * Get user details by magic link token
     */
    public function getUserByToken(Request $request): JsonResponse
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $token = $request->token;

        // Find the magic link
        $magicLink = MagicLink::where('token', $token)
            ->where('used', false)
            ->where('expires_at', '>', now())
            ->first();

        if (!$magicLink) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired magic link token',
            ], 400);
        }

        // Get user details
        $user = $magicLink->user;

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        // Mark magic link as used
        $magicLink->markAsUsed();

        return response()->json([
            'success' => true,
            'message' => 'User details retrieved successfully',
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

    /**
     * Create magic link for user
     */
    public function createMagicLink(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
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

        // Create magic link
        $magicLink = MagicLink::create([
            'user_id' => $user->id,
            'token' => \Illuminate\Support\Str::random(64),
            'expires_at' => now()->addHours(24), // Expires in 24 hours
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Magic link created successfully',
            'data' => [
                'token' => $magicLink->token,
                'expires_at' => $magicLink->expires_at,
            ]
        ]);
    }
}