<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserProfileController extends Controller
{
    /**
     * Save user profile (password, DOB, contact details, confirmation)
     */
    public function saveProfile(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'password' => ['required', Password::defaults()],
            'dob' => 'required|date|before:today',
            'contact_number' => 'required|string|max:20',
            'confirmation_flag' => 'required|boolean',
        ]);

        $user = User::findOrFail($request->user_id);

        // Update user profile
        $user->update([
            'password' => Hash::make($request->password),
            'date_of_birth' => $request->dob,
            'contact_number' => $request->contact_number,
            'profile_completed' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profile saved successfully',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'date_of_birth' => $user->date_of_birth,
                    'contact_number' => $user->contact_number,
                    'profile_completed' => $user->profile_completed,
                    'registration_completed' => $user->registration_completed,
                ]
            ]
        ]);
    }

    /**
     * Get user profile
     */
    public function getProfile(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::findOrFail($request->user_id);

        return response()->json([
            'success' => true,
            'message' => 'Profile retrieved successfully',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'date_of_birth' => $user->date_of_birth,
                    'contact_number' => $user->contact_number,
                    'profile_completed' => $user->profile_completed,
                    'registration_completed' => $user->registration_completed,
                ]
            ]
        ]);
    }
}
