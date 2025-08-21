<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create demo admin user
        User::create([
            'name' => 'Admin User',
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'profile_completed' => true,
            'registration_completed' => true,
        ]);

        // Create demo regular user
        User::create([
            'name' => 'John Doe',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'date_of_birth' => '1990-01-01',
            'contact_number' => '+1234567890',
            'profile_completed' => true,
            'registration_completed' => true,
        ]);

        // Create demo user for testing
        User::create([
            'name' => 'Jane Smith',
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'date_of_birth' => '1995-05-15',
            'contact_number' => '+1987654321',
            'profile_completed' => true,
            'registration_completed' => true,
        ]);
    }
}
