<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BlogPost;

class BlogPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogs = [
            [
                'title' => 'The Future of AI in Bangladeshi Businesses',
                'slug' => 'future-of-ai-in-bangladeshi-businesses',
                'excerpt' => 'Exploring how artificial intelligence is transforming the business landscape in Bangladesh.',
                'content' => 'Artificial Intelligence is revolutionizing how businesses operate in Bangladesh. From automating routine tasks to providing deep insights through data analytics, AI is becoming an essential tool for competitive advantage.',
                'featured_image' => '/assets/blogs/img1.png',
                'category' => 'Technology',
                'tags' => 'AI, Business, Bangladesh',
                'read_time' => 10,
                'published_at' => now()->subDays(5),
                'is_published' => true,
            ],
            [
                'title' => 'Cybersecurity Best Practices for SMEs',
                'slug' => 'cybersecurity-best-practices-for-smes',
                'excerpt' => 'Essential cybersecurity measures every small and medium enterprise should implement.',
                'content' => 'In today digital age, cybersecurity is not optional. Small and medium enterprises must implement robust security measures to protect their data, customers, and reputation.',
                'featured_image' => '/assets/blogs/img2.png',
                'category' => 'Security',
                'tags' => 'Cybersecurity, SME, Best Practices',
                'read_time' => 8,
                'published_at' => now()->subDays(10),
                'is_published' => true,
            ],
            [
                'title' => 'Digital Transformation Strategies',
                'slug' => 'digital-transformation-strategies',
                'excerpt' => 'A comprehensive guide to implementing digital transformation in your organization.',
                'content' => 'Digital transformation is more than just technology - it is about reimagining how your organization creates value and serves customers in the digital age.',
                'featured_image' => '/assets/blogs/img3.png',
                'category' => 'Business',
                'tags' => 'Digital Transformation, Strategy',
                'read_time' => 12,
                'published_at' => now()->subDays(15),
                'is_published' => true,
            ],
            [
                'title' => 'Cloud Computing Trends in 2024',
                'slug' => 'cloud-computing-trends-2024',
                'excerpt' => 'The latest trends and innovations in cloud computing for 2024.',
                'content' => 'Cloud computing continues to evolve rapidly. From serverless architecture to edge computing, 2024 brings exciting new possibilities for businesses.',
                'featured_image' => '/assets/blogs/img4.png',
                'category' => 'Cloud',
                'tags' => 'Cloud Computing, Trends, 2024',
                'read_time' => 9,
                'published_at' => now()->subDays(20),
                'is_published' => true,
            ],
            [
                'title' => 'Building Scalable Tech Startups',
                'slug' => 'building-scalable-tech-startups',
                'excerpt' => 'Key principles for building and scaling a successful tech startup.',
                'content' => 'Building a scalable tech startup requires a clear vision, strong technical foundation, and the ability to adapt quickly. Focus on solving real problems, validate your market early, and build a product that can grow with your user base. Leverage modern cloud infrastructure, implement robust security from day one, and create a culture of innovation within your team. Remember, scalability is not just about technology - it is about creating sustainable processes and systems that can handle rapid growth.',
                'featured_image' => '/assets/blogs/img5.png',
                'category' => 'Startup',
                'tags' => 'Startup, Scalability, Tech',
                'read_time' => 11,
                'published_at' => now()->subDays(25),
                'is_published' => true,
            ],
        ];

        foreach ($blogs as $blog) {
            BlogPost::create($blog);
        }
    }
}
