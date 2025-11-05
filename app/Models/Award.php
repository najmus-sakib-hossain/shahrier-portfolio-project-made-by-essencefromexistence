<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    protected $fillable = [
        'title',
        'description',
        'organization',
        'image',
        'award_date',
        'order',
    ];

    protected $casts = [
        'award_date' => 'date',
    ];
}
