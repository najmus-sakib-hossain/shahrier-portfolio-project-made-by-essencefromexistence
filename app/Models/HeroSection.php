<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'subtitle_max_length',
        'image_url',
        'tagline',
        'tagline_max_length',
        'description',
        'description_max_length',
        'social_links',
        'social_link_settings',
        'font_settings',
        'is_active',
        'order',
    ];

    protected $casts = [
        'social_links' => 'array',
        'social_link_settings' => 'array',
        'font_settings' => 'array',
        'is_active' => 'boolean',
    ];

    protected $attributes = [
        'subtitle_max_length' => 200,
        'tagline_max_length' => 50,
        'description_max_length' => 150,
    ];
}
