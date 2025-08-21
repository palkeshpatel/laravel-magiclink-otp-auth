<?php

namespace Database\Seeders;

use App\Models\UserInvitation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TestInvitationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a test invitation
        UserInvitation::create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test@example.com',
            'status' => 'pending',
            'invitation_token' => Str::uuid(),
            'expires_at' => now()->addDays(7),
        ]);

        // Create another test invitation for the email you're testing with
        UserInvitation::create([
            'first_name' => 'Palkesh',
            'last_name' => 'Patel',
            'email' => 'patel.palkesh@gmail.com',
            'status' => 'pending',
            'invitation_token' => Str::uuid(),
            'expires_at' => now()->addDays(7),
        ]);

        $this->command->info('Test invitations created successfully!');
        $this->command->info('You can now test with: test@example.com or patel.palkesh@gmail.com');
    }
}
