<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'location',
        'event_date',
        'event_time',
        'category',
        'organizer',
        'is_featured',
        'is_past',
    ];

    protected $casts = [
        'event_date' => 'date',
        'is_featured' => 'boolean',
        'is_past' => 'boolean',
    ];
}
