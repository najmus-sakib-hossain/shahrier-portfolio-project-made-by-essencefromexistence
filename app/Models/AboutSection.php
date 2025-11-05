<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model
{
    protected $fillable = [
        'section_type',
        'title',
        'content',
        'image',
        'additional_data',
        'order',
        'is_active',
    ];

    protected $casts = [
        'additional_data' => 'array',
        'is_active' => 'boolean',
    ];
}
