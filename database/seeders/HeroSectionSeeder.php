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
        // Use updateOrCreate to prevent duplicates
        HeroSection::updateOrCreate(
            ['title' => 'Shahriar Khan'], // Find by title
            [
                'subtitle' => 'Embrace the extraordinary. Live your fullest life.',
                'subtitle_max_length' => 200,
                'image_url' => '/assets/home_banner.png',
                'tagline' => 'Entrepreneur',
                'tagline_max_length' => 50,
                'description' => 'Connecting brands & people through experiences.',
                'description_max_length' => 150,
                'social_links' => [
                    'linkedin' => 'https://www.linkedin.com/in/mohammadshahriarkhan/',
                    'dribbble' => 'https://dribbble.com',
                    'behance' => 'https://www.behance.net',
                ],
                'social_link_settings' => [
                    ['platform' => 'linkedin', 'label' => 'LinkedIn', 'is_active' => true],
                    ['platform' => 'dribbble', 'label' => 'Dribbble', 'is_active' => true],
                    ['platform' => 'behance', 'label' => 'Behance', 'is_active' => true],
                ],
                'font_settings' => [
                    'subtitle_size' => 'text-4xl lg:text-6xl',
                    'tagline_size' => 'text-3xl',
                    'description_size' => 'text-4xl lg:text-6xl',
                ],
                'is_active' => true,
                'order' => 1,
            ]
        );
    }
}

