<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'cover_image',
        'description',
        'summary',
        'highlights',
        'review',
        'rating',
        'isbn',
        'read_date',
        'is_recommended',
        'order',
    ];

    protected $casts = [
        'read_date' => 'date',
        'is_recommended' => 'boolean',
    ];
}
