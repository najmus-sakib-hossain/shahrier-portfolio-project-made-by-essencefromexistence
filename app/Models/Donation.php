<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'goal_amount',
        'raised_amount',
        'category',
        'end_date',
        'is_active',
        'beneficiary_info',
        'order',
    ];

    protected $casts = [
        'goal_amount' => 'decimal:2',
        'raised_amount' => 'decimal:2',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];
}
