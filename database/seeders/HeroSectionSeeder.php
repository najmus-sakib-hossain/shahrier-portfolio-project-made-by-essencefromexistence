<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HeroSection;

class HeroSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HeroSection::create([
            'title' => 'Shahriar Khan',
            'subtitle' => 'Embrace the extraordinary. Live your fullest life.',
            'image_url' => '/assets/home_banner.png',
            'tagline' => 'Entrepreneur',
            'description' => 'Connecting brands & people through experiences.',
            'social_links' => [
                'linkedin' => 'https://www.linkedin.com/in/mohammadshahriarkhan/',
                'dribbble' => 'https://dribbble.com',
                'behance' => 'https://www.behance.net',
            ],
            'is_active' => true,
            'order' => 1,
        ]);
    }
}

