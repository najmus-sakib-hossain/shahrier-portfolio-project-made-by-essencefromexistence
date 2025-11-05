<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EntrepreneurshipContent extends Model
{
    protected $table = 'entrepreneurship_content';

    protected $fillable = [
        'type',
        'title',
        'content',
        'image',
        'author',
        'publish_date',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'publish_date' => 'date',
        'is_featured' => 'boolean',
    ];
}
