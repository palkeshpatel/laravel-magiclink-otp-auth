<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'first_name',
        'last_name',
        'email',
        'password',
        'date_of_birth',
        'contact_number',
        'profile_completed',
        'registration_completed',
        'invitation_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'date_of_birth' => 'date',
            'profile_completed' => 'boolean',
            'registration_completed' => 'boolean',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's invitation.
     */
    public function invitation()
    {
        return $this->belongsTo(UserInvitation::class, 'invitation_id');
    }

    /**
     * Get the user's magic links.
     */
    public function magicLinks()
    {
        return $this->hasMany(MagicLink::class);
    }

    /**
     * Get the user's OTP codes.
     */
    public function otpCodes()
    {
        return $this->hasMany(OtpCode::class);
    }

    /**
     * Get the user's wellness interests.
     */
    public function wellnessInterests()
    {
        return $this->belongsToMany(WellnessInterest::class, 'user_wellness_interests');
    }

    /**
     * Get the user's wellbeing pillars.
     */
    public function wellbeingPillars()
    {
        return $this->belongsToMany(WellbeingPillar::class, 'user_wellbeing_pillars');
    }
}
