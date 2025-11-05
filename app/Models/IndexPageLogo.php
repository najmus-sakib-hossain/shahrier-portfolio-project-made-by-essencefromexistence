<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndexPageLogo extends Model
{
    use HasFactory;

    protected $fillable = [
        'index_page_setting_id',
        'name',
        'logo_path',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function indexPageSetting()
    {
        return $this->belongsTo(IndexPageSetting::class);
    }
}
