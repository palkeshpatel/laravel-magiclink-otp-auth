<?php

namespace Database\Factories;

use App\Models\OtpCode;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OtpCode>
 */
class OtpCodeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = OtpCode::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'code' => str_pad($this->faker->numberBetween(0, 999999), 6, '0', STR_PAD_LEFT),
            'used' => false,
            'expires_at' => $this->faker->dateTimeBetween('now', '+10 minutes'),
            'used_at' => null,
        ];
    }

    /**
     * Indicate that the OTP code is used.
     */
    public function used(): static
    {
        return $this->state(fn(array $attributes) => [
            'used' => true,
            'used_at' => $this->faker->dateTimeBetween('-1 hour', 'now'),
        ]);
    }

    /**
     * Indicate that the OTP code is expired.
     */
    public function expired(): static
    {
        return $this->state(fn(array $attributes) => [
            'expires_at' => $this->faker->dateTimeBetween('-1 hour', '-1 minute'),
        ]);
    }
}