<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Video;

class VideoSeeder extends Seeder
{
    public function run(): void
    {
        $videos = [
            [
                'title' => 'How to Build a Successful Startup',
                'description' => 'Key lessons from building multiple startups and scaling businesses',
                'video_url' => 'https://youtube.com/watch?v=dQw4w9WgXcQ',
                'thumbnail' => '/assets/videos/video_thumbline.png',
                'platform' => 'youtube',
                'category' => 'Entrepreneurship',
                'duration' => 1200,
                'is_short' => false,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Quick Tech Tip: Docker Basics',
                'description' => '60-second Docker tutorial for beginners',
                'video_url' => 'https://youtube.com/shorts/dQw4w9WgXcQ',
                'thumbnail' => '/assets/videos/video_thumbline.png',
                'platform' => 'youtube',
                'category' => 'Technology',
                'duration' => 60,
                'is_short' => true,
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Leadership in Tech Industry',
                'description' => 'Building and leading high-performing teams in technology',
                'video_url' => 'https://youtube.com/watch?v=dQw4w9WgXcQ',
                'thumbnail' => '/assets/videos/video_thumbline.png',
                'platform' => 'youtube',
                'category' => 'Leadership',
                'duration' => 1800,
                'is_short' => false,
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'React Best Practices',
                'description' => 'Modern React development patterns and best practices',
                'video_url' => 'https://youtube.com/watch?v=dQw4w9WgXcQ',
                'thumbnail' => '/assets/videos/video_thumbline.png',
                'platform' => 'youtube',
                'category' => 'Technology',
                'duration' => 45,
                'is_short' => true,
                'published_at' => now()->subDays(1),
            ],
            [
                'title' => 'My Entrepreneurship Journey',
                'description' => 'From idea to successful business - lessons learned along the way',
                'video_url' => 'https://youtube.com/watch?v=dQw4w9WgXcQ',
                'thumbnail' => '/assets/videos/video_thumbline.png',
                'platform' => 'youtube',
                'category' => 'Entrepreneurship',
                'duration' => 2400,
                'is_short' => false,
                'published_at' => now()->subWeeks(2),
            ],
        ];

        foreach ($videos as $video) {
            Video::create($video);
        }
    }
}
