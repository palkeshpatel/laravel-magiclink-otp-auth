<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\UserInvitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class InvitationController extends Controller
{
    /**
     * Invite a user to the platform
     */
    public function invite(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|unique:user_invitations,email',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
        ]);

        // Create invitation token
        $invitationToken = Str::random(64);
        
        // Create user invitation
        $invitation = UserInvitation::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'invitation_token' => $invitationToken,
            'expires_at' => now()->addDays(7), // Expires in 7 days
            'status' => 'pending',
        ]);

        // Send invitation email (we'll implement this later)
        // Mail::to($request->email)->send(new InvitationMail($invitation));

        return response()->json([
            'success' => true,
            'message' => 'Invitation sent successfully',
            'data' => [
                'invitation_id' => $invitation->id,
                'email' => $invitation->email,
                'expires_at' => $invitation->expires_at,
            ]
        ], 201);
    }
}
