<?php

namespace Database\Seeders;

use App\Models\WellnessInterest;
use Illuminate\Database\Seeder;

class WellnessInterestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $wellnessInterests = [
            [
                'name' => 'Yoga',
                'description' => 'Physical, mental, and spiritual practices for health and wellness',
                'icon' => '🧘‍♀️',
                'is_active' => true,
            ],
            [
                'name' => 'Meditation',
                'description' => 'Mindfulness and relaxation techniques for mental clarity',
                'icon' => '🧘‍♂️',
                'is_active' => true,
            ],
            [
                'name' => 'Fitness',
                'description' => 'Physical exercise and strength training for overall health',
                'icon' => '💪',
                'is_active' => true,
            ],
            [
                'name' => 'Nutrition',
                'description' => 'Healthy eating habits and dietary wellness',
                'icon' => '🥗',
                'is_active' => true,
            ],
            [
                'name' => 'Mindfulness',
                'description' => 'Present moment awareness and stress reduction',
                'icon' => '🌿',
                'is_active' => true,
            ],
            [
                'name' => 'Sleep',
                'description' => 'Quality sleep and rest for optimal health',
                'icon' => '😴',
                'is_active' => true,
            ],
        ];

        foreach ($wellnessInterests as $interest) {
            WellnessInterest::create($interest);
        }
    }
}
