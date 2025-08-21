<?php

namespace Database\Seeders;

use App\Models\WellbeingPillar;
use Illuminate\Database\Seeder;

class WellbeingPillarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $wellbeingPillars = [
            [
                'name' => 'Physical',
                'description' => 'Physical health and fitness for overall wellbeing',
                'icon' => '🏃‍♀️',
                'is_active' => true,
            ],
            [
                'name' => 'Mental',
                'description' => 'Mental health and cognitive wellness',
                'icon' => '🧠',
                'is_active' => true,
            ],
            [
                'name' => 'Social',
                'description' => 'Social connections and relationships',
                'icon' => '👥',
                'is_active' => true,
            ],
            [
                'name' => 'Financial',
                'description' => 'Financial security and planning',
                'icon' => '💰',
                'is_active' => true,
            ],
            [
                'name' => 'Emotional',
                'description' => 'Emotional intelligence and self-awareness',
                'icon' => '❤️',
                'is_active' => true,
            ],
            [
                'name' => 'Spiritual',
                'description' => 'Spiritual growth and purpose',
                'icon' => '🕊️',
                'is_active' => true,
            ],
        ];

        foreach ($wellbeingPillars as $pillar) {
            WellbeingPillar::create($pillar);
        }
    }
}
