<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LifeEvent extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'event_date',
        'category',
        'location',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'event_date' => 'date',
        'is_featured' => 'boolean',
    ];
}
