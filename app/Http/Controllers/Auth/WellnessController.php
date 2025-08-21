<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\WellnessInterest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WellnessController extends Controller
{
    /**
     * Get all wellness interests
     */
    public function getWellnessInterests(): JsonResponse
    {
        $wellnessInterests = WellnessInterest::active()->get();

        return response()->json([
            'success' => true,
            'message' => 'Wellness interests retrieved successfully',
            'data' => [
                'wellness_interests' => $wellnessInterests
            ]
        ]);
    }

    /**
     * Save user selected wellness interests
     */
    public function saveUserWellnessInterests(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'wellness_interest_ids' => 'required|array|min:1',
            'wellness_interest_ids.*' => 'exists:wellness_interests,id',
        ]);

        $user = User::findOrFail($request->user_id);

        // Sync user wellness interests
        $user->wellnessInterests()->sync($request->wellness_interest_ids);

        return response()->json([
            'success' => true,
            'message' => 'Wellness interests saved successfully',
            'data' => [
                'user_id' => $user->id,
                'wellness_interests' => $user->wellnessInterests()->get()
            ]
        ]);
    }

    /**
     * Get user wellness interests
     */
    public function getUserWellnessInterests(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::findOrFail($request->user_id);

        return response()->json([
            'success' => true,
            'message' => 'User wellness interests retrieved successfully',
            'data' => [
                'user_id' => $user->id,
                'wellness_interests' => $user->wellnessInterests()->get()
            ]
        ]);
    }
}
