<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Technology;

class TechnologySeeder extends Seeder
{
    public function run(): void
    {
        $technologies = [
            [
                'title' => 'Cloud Architecture Best Practices',
                'description' => 'Building scalable cloud infrastructure with modern tools and frameworks',
                'image' => '/assets/technology/cyber_security_image.png',
                'category' => 'cloud',
                'content' => 'Comprehensive guide to cloud architecture patterns and best practices. Learn about microservices, serverless, and container orchestration.',
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'Cybersecurity Essentials',
                'description' => 'Protecting your digital assets from modern threats',
                'image' => '/assets/technology/cyber_security_image.png',
                'category' => 'cybersecurity',
                'content' => 'Essential cybersecurity practices for modern businesses. From encryption to zero-trust architecture.',
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'title' => 'AI and Machine Learning',
                'description' => 'Introduction to AI technologies and practical applications',
                'image' => '/assets/technology/contribute_field.png',
                'category' => 'ai',
                'content' => 'Getting started with artificial intelligence and machine learning. Understand neural networks, deep learning, and practical AI applications.',
                'is_featured' => true,
                'order' => 3,
            ],
            [
                'title' => 'Modern Web Development',
                'description' => 'Full-stack development with React and Laravel',
                'image' => '/assets/technology/contribute_field.png',
                'category' => 'web-development',
                'content' => 'Building modern web applications with React, Laravel, and Inertia.js. A complete guide to full-stack development.',
                'is_featured' => true,
                'order' => 4,
            ],
            [
                'title' => 'DevOps and CI/CD',
                'description' => 'Automating deployment and infrastructure management',
                'image' => '/assets/technology/cyber_security_image.png',
                'category' => 'devops',
                'content' => 'Learn about continuous integration, continuous deployment, and infrastructure as code.',
                'is_featured' => false,
                'order' => 5,
            ],
        ];

        foreach ($technologies as $tech) {
            Technology::create($tech);
        }
    }
}
