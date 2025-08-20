<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WellbeingPillar extends Model
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
     * Get the users that have this wellbeing pillar.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_wellbeing_pillars');
    }

    /**
     * Scope to get only active wellbeing pillars.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
