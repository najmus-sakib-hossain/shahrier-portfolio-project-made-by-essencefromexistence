<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EntrepreneurshipContent;

class EntrepreneurshipContentSeeder extends Seeder
{
    public function run(): void
    {
        $content = [
            // Quotes
            [
                'type' => 'quote',
                'title' => 'Innovation Quote',
                'content' => 'The best way to predict the future is to invent it.',
                'image' => null,
                'author' => 'Alan Kay',
                'publish_date' => null,
                'is_featured' => true,
                'order' => 1,
            ],
            
            // Blogs
            [
                'type' => 'blog',
                'title' => 'Building a Startup Ecosystem',
                'content' => 'How to create and nurture a thriving startup community in emerging markets. Learn from years of experience building multiple successful ventures.',
                'image' => '/assets/entepreneourship/slider_1.jpeg',
                'author' => 'Shahriar Khan',
                'publish_date' => now()->subDays(7),
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'type' => 'blog',
                'title' => 'The Future of EdTech',
                'content' => 'Exploring how technology is revolutionizing education and making learning accessible to everyone.',
                'image' => '/assets/entepreneourship/slider_2.jpeg',
                'author' => 'Shahriar Khan',
                'publish_date' => now()->subDays(14),
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'type' => 'blog',
                'title' => 'Scaling Your Business Globally',
                'content' => 'Strategies for taking your local business to international markets successfully.',
                'image' => '/assets/entepreneourship/slider_3.jpeg',
                'author' => 'Shahriar Khan',
                'publish_date' => now()->subDays(21),
                'is_featured' => false,
                'order' => 3,
            ],
            
            // Innovations/Startups
            [
                'type' => 'innovation',
                'title' => 'NexKraft Solutions',
                'content' => 'AI-Powered Business Solutions. Leveraging artificial intelligence to solve real business problems.',
                'image' => '/assets/entepreneourship/nexkraft.png',
                'author' => null,
                'publish_date' => now()->subDays(14),
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'type' => 'innovation',
                'title' => 'Mechanix Pro',
                'content' => 'Digital Platform for Automotive Services. Connecting vehicle owners with trusted mechanics and service providers.',
                'image' => '/assets/entepreneourship/mechani.png',
                'author' => null,
                'publish_date' => now()->subMonths(2),
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'type' => 'innovation',
                'title' => 'Huistle App',
                'content' => 'Productivity & Task Management. A modern productivity app that helps teams collaborate better.',
                'image' => '/assets/entepreneourship/huistle.png',
                'author' => null,
                'publish_date' => now()->subMonths(3),
                'is_featured' => true,
                'order' => 3,
            ],
            [
                'type' => 'innovation',
                'title' => 'MindShaper',
                'content' => 'Personal Development Platform. Empowering individuals to reach their full potential.',
                'image' => '/assets/entepreneourship/mindshaper.png',
                'author' => null,
                'publish_date' => now()->subMonths(4),
                'is_featured' => true,
                'order' => 4,
            ],
            
            // Events
            [
                'type' => 'event',
                'title' => 'Startup Summit 2024',
                'content' => 'Annual gathering of entrepreneurs and investors. Network with fellow entrepreneurs and learn from industry leaders.',
                'image' => '/assets/entepreneourship/slider_4.jpeg',
                'author' => null,
                'publish_date' => now(),
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'type' => 'event',
                'title' => 'Innovation Workshop Series',
                'content' => 'Hands-on workshops on building innovative products. Learn from experienced entrepreneurs.',
                'image' => '/assets/entepreneourship/slider_5.jpeg',
                'author' => null,
                'publish_date' => now(),
                'is_featured' => false,
                'order' => 2,
            ],
        ];

        foreach ($content as $item) {
            EntrepreneurshipContent::create($item);
        }
    }
}
