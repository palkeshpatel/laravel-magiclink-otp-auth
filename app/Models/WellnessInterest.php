<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WellnessInterest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'icon',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the users that have this wellness interest.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_wellness_interests');
    }

    /**
     * Scope to get only active wellness interests.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
