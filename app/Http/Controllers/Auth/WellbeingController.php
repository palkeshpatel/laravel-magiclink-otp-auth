<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\WellbeingPillar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WellbeingController extends Controller
{
    /**
     * Get all wellbeing pillars
     */
    public function getWellbeingPillars(): JsonResponse
    {
        $wellbeingPillars = WellbeingPillar::active()->get();

        return response()->json([
            'success' => true,
            'message' => 'Wellbeing pillars retrieved successfully',
            'data' => [
                'wellbeing_pillars' => $wellbeingPillars
            ]
        ]);
    }

    /**
     * Save user selected wellbeing pillars (exactly 3 required)
     */
    public function saveUserWellbeingPillars(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'wellbeing_pillar_ids' => 'required|array|size:3',
            'wellbeing_pillar_ids.*' => 'exists:wellbeing_pillars,id',
        ], [
            'wellbeing_pillar_ids.size' => 'Exactly 3 wellbeing pillars must be selected.',
        ]);

        $user = User::findOrFail($request->user_id);

        // Sync user wellbeing pillars
        $user->wellbeingPillars()->sync($request->wellbeing_pillar_ids);

        // Mark registration as complete
        $user->update([
            'registration_completed' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Wellbeing pillars saved successfully. Registration completed!',
            'data' => [
                'user_id' => $user->id,
                'wellbeing_pillars' => $user->wellbeingPillars()->get(),
                'registration_completed' => $user->registration_completed,
            ]
        ]);
    }

    /**
     * Get user wellbeing pillars
     */
    public function getUserWellbeingPillars(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::findOrFail($request->user_id);

        return response()->json([
            'success' => true,
            'message' => 'User wellbeing pillars retrieved successfully',
            'data' => [
                'user_id' => $user->id,
                'wellbeing_pillars' => $user->wellbeingPillars()->get(),
                'registration_completed' => $user->registration_completed,
            ]
        ]);
    }
}
