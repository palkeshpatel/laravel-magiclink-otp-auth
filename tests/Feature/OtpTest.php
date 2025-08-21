<?php

namespace Tests\Feature;

use App\Models\OtpCode;
use App\Models\User;
use App\Models\UserInvitation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OtpTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_verify_email_with_valid_invitation()
    {
        $invitation = UserInvitation::factory()->create([
            'status' => 'pending',
            'expires_at' => now()->addDays(1),
        ]);

        $response = $this->get('/api/verify-email?email=' . urlencode($invitation->email));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Email verified successfully',
            ]);
    }

    public function test_verify_email_with_invalid_invitation()
    {
        $response = $this->get('/api/verify-email?email=nonexistent@example.com');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'No valid invitation found for this email',
            ]);
    }

    public function test_send_otp_with_valid_invitation()
    {
        $invitation = UserInvitation::factory()->create([
            'status' => 'pending',
            'expires_at' => now()->addDays(1),
        ]);

        $response = $this->get('/api/send-otp?email=' . urlencode($invitation->email));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'OTP sent successfully',
            ]);

        // Check that OTP was created
        $user = User::where('email', $invitation->email)->first();
        $this->assertNotNull($user);

        $otpCode = OtpCode::where('user_id', $user->id)->first();
        $this->assertNotNull($otpCode);
        $this->assertEquals(6, strlen($otpCode->code));
    }

    public function test_verify_otp_with_valid_code()
    {
        $invitation = UserInvitation::factory()->create([
            'status' => 'pending',
            'expires_at' => now()->addDays(1),
        ]);

        $user = User::factory()->create([
            'email' => $invitation->email,
        ]);

        $otpCode = OtpCode::factory()->create([
            'user_id' => $user->id,
            'code' => '123456',
            'used' => false,
            'expires_at' => now()->addMinutes(10),
        ]);

        $response = $this->get('/api/verify-otp?email=' . urlencode($user->email) . '&otp=123456');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'OTP verified successfully',
            ]);

        // Check that OTP was marked as used
        $otpCode->refresh();
        $this->assertTrue($otpCode->used);
    }

    public function test_verify_otp_with_invalid_code()
    {
        $user = User::factory()->create();

        $response = $this->get('/api/verify-otp?email=' . urlencode($user->email) . '&otp=000000');

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'Invalid or expired OTP',
            ]);
    }
}
