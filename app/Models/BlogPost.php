<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'category',
        'tags',
        'read_time',
        'published_at',
        'is_published',
        'views',
    ];

    protected $casts = [
        'published_at' => 'date',
        'is_published' => 'boolean',
    ];
}
