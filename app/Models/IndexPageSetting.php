<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndexPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_text',
        'hero_image',
        'button_text',
        'button_link',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function logos()
    {
        return $this->hasMany(IndexPageLogo::class)->orderBy('display_order');
    }

    public function activeLogos()
    {
        return $this->hasMany(IndexPageLogo::class)->where('is_active', true)->orderBy('display_order');
    }
}
