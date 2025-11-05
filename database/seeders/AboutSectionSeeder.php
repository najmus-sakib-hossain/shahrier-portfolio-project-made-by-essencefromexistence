<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AboutSection;

class AboutSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            [
                'section_type' => 'story',
                'title' => 'My Journey',
                'content' => "I began my journey in technology and entrepreneurship over a decade ago, driven by a passion for innovation and creating meaningful impact.\n\nThrough various ventures and projects, I have worked to bridge the gap between technology and real-world solutions.",
                'image' => '/assets/about_me/shahriar_khan1.png',
                'additional_data' => null,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'section_type' => 'impact',
                'title' => 'Creating Impact',
                'content' => "Through technology and entrepreneurship, I have worked to create positive change in communities.\n\nOur initiatives have reached thousands of people, providing education, technology access, and business opportunities.",
                'image' => '/assets/about_me/shahriar_khan2.png',
                'additional_data' => null,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'section_type' => 'vision',
                'title' => 'Future Vision',
                'content' => "Looking ahead, I envision a world where technology empowers everyone to achieve their full potential.\n\nMy goal is to continue building solutions that make a lasting impact on society and business.",
                'image' => '/assets/about_me/shahriar_khan3.png',
                'additional_data' => null,
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($sections as $section) {
            AboutSection::create($section);
        }
    }
}
