<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'title',
        'description',
        'video_url',
        'thumbnail',
        'platform',
        'category',
        'duration',
        'is_short',
        'views',
        'published_at',
        'publish_date',
        'order',
    ];

    protected $casts = [
        'published_at' => 'date',
        'publish_date' => 'date',
        'is_short' => 'boolean',
    ];
}
