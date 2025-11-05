#!/bin/bash

# This script implements all remaining seeders

echo "Implementing all seeders..."

# EventSeeder
cat > database/seeders/EventSeeder.php << 'EOF'
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'title' => 'Tech Innovation Summit 2024',
                'description' => 'Annual technology and innovation conference',
                'image' => './assets/events/event1.png',
                'location' => 'Dhaka, Bangladesh',
                'event_date' => now()->addDays(30),
                'event_time' => '09:00:00',
                'category' => 'Conference',
                'organizer' => 'Tech BD',
                'is_featured' => true,
                'is_past' => false,
            ],
            [
                'title' => 'Startup Networking Meetup',
                'description' => 'Connect with fellow entrepreneurs and investors',
                'image' => './assets/events/event2.png',
                'location' => 'Gulshan, Dhaka',
                'event_date' => now()->addDays(15),
                'event_time' => '18:00:00',
                'category' => 'Networking',
                'organizer' => 'Startup Bangladesh',
                'is_featured' => false,
                'is_past' => false,
            ],
            [
                'title' => 'Digital Marketing Workshop',
                'description' => 'Learn advanced digital marketing strategies',
                'image' => './assets/events/event3.png',
                'location' => 'Online',
                'event_date' => now()->subDays(10),
                'event_time' => '14:00:00',
                'category' => 'Workshop',
                'organizer' => 'Marketing Pro',
                'is_featured' => false,
                'is_past' => true,
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
EOF

# VideoSeeder
cat > database/seeders/VideoSeeder.php << 'EOF'
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
                'description' => 'Key lessons from building multiple startups',
                'video_url' => 'https://youtube.com/watch?v=example1',
                'thumbnail' => './assets/videos/thumb1.png',
                'platform' => 'youtube',
                'category' => 'Entrepreneurship',
                'duration' => 1200,
                'is_short' => false,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Quick Tech Tip: Docker Basics',
                'description' => '60-second Docker tutorial',
                'video_url' => 'https://youtube.com/shorts/example2',
                'thumbnail' => './assets/videos/thumb2.png',
                'platform' => 'youtube',
                'category' => 'Technology',
                'duration' => 60,
                'is_short' => true,
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Leadership in Tech Industry',
                'description' => 'Building and leading high-performing teams',
                'video_url' => 'https://youtube.com/watch?v=example3',
                'thumbnail' => './assets/videos/thumb3.png',
                'platform' => 'youtube',
                'category' => 'Leadership',
                'duration' => 1800,
                'is_short' => false,
                'published_at' => now()->subDays(10),
            ],
        ];

        foreach ($videos as $video) {
            Video::create($video);
        }
    }
}
EOF

# TechnologySeeder
cat > database/seeders/TechnologySeeder.php << 'EOF'
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
                'description' => 'Building scalable cloud infrastructure',
                'image' => './assets/technology/cloud.png',
                'category' => 'cloud',
                'content' => 'Comprehensive guide to cloud architecture patterns and best practices.',
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'Cybersecurity Essentials',
                'description' => 'Protecting your digital assets',
                'image' => './assets/technology/security.png',
                'category' => 'cybersecurity',
                'content' => 'Essential cybersecurity practices for modern businesses.',
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'title' => 'AI and Machine Learning',
                'description' => 'Introduction to AI technologies',
                'image' => './assets/technology/ai.png',
                'category' => 'ai',
                'content' => 'Getting started with artificial intelligence and machine learning.',
                'is_featured' => false,
                'order' => 3,
            ],
        ];

        foreach ($technologies as $tech) {
            Technology::create($tech);
        }
    }
}
EOF

# DonationSeeder
cat > database/seeders/DonationSeeder.php << 'EOF'
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Donation;

class DonationSeeder extends Seeder
{
    public function run(): void
    {
        $donations = [
            [
                'title' => 'Education for Underprivileged Children',
                'description' => 'Help provide quality education to children in need',
                'image' => './assets/donation/education.png',
                'goal_amount' => 50000.00,
                'raised_amount' => 25000.00,
                'category' => 'Education',
                'end_date' => now()->addMonths(3),
                'is_active' => true,
                'beneficiary_info' => 'Rural schools in Bangladesh',
            ],
            [
                'title' => 'Tech Training for Youth',
                'description' => 'Empowering youth with technology skills',
                'image' => './assets/donation/tech-training.png',
                'goal_amount' => 30000.00,
                'raised_amount' => 18000.00,
                'category' => 'Technology',
                'end_date' => now()->addMonths(2),
                'is_active' => true,
                'beneficiary_info' => 'Youth in urban slums',
            ],
        ];

        foreach ($donations as $donation) {
            Donation::create($donation);
        }
    }
}
EOF

# LifeEventSeeder
cat > database/seeders/LifeEventSeeder.php << 'EOF'
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LifeEvent;

class LifeEventSeeder extends Seeder
{
    public function run(): void
    {
        $lifeEvents = [
            [
                'title' => 'Founded First Tech Startup',
                'description' => 'Launched my first technology company',
                'image' => './assets/life_events/startup.png',
                'event_date' => now()->subYears(5),
                'category' => 'Career',
                'location' => 'Dhaka, Bangladesh',
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'Graduated from University',
                'description' => 'Completed my degree in Computer Science',
                'image' => './assets/life_events/graduation.png',
                'event_date' => now()->subYears(8),
                'category' => 'Education',
                'location' => 'Dhaka University',
                'is_featured' => false,
                'order' => 2,
            ],
            [
                'title' => 'International Conference Speaker',
                'description' => 'Spoke at Tech Summit Asia',
                'image' => './assets/life_events/conference.png',
                'event_date' => now()->subYears(2),
                'category' => 'Achievement',
                'location' => 'Singapore',
                'is_featured' => true,
                'order' => 3,
            ],
        ];

        foreach ($lifeEvents as $event) {
            LifeEvent::create($event);
        }
    }
}
EOF

# AboutSectionSeeder
cat > database/seeders/AboutSectionSeeder.php << 'EOF'
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
                'title' => 'My Story',
                'content' => 'I began my journey in technology over a decade ago, driven by a passion for innovation and creating meaningful impact.',
                'image' => './assets/about_me/story.png',
                'additional_data' => null,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'section_type' => 'impact',
                'title' => 'Creating Impact',
                'content' => 'Through technology and entrepreneurship, I have worked to create positive change in communities.',
                'image' => './assets/about_me/impact.png',
                'additional_data' => null,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'section_type' => 'travel',
                'title' => 'Global Experiences',
                'content' => 'Traveled to over 20 countries, learning from diverse cultures and business practices.',
                'image' => './assets/about_me/travel.png',
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
EOF

# AwardSeeder
cat > database/seeders/AwardSeeder.php << 'EOF'
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Award;

class AwardSeeder extends Seeder
{
    public function run(): void
    {
        $awards = [
            [
                'title' => 'Entrepreneur of the Year 2023',
                'description' => 'Recognized for outstanding entrepreneurial achievements',
                'organization' => 'Bangladesh Chamber of Commerce',
                'image' => './assets/about_me/award1.png',
                'award_date' => now()->subYear(),
                'order' => 1,
            ],
            [
                'title' => 'Tech Innovation Award',
                'description' => 'For innovative technology solutions',
                'organization' => 'Tech Summit Asia',
                'image' => './assets/about_me/award2.png',
                'award_date' => now()->subYears(2),
                'order' => 2,
            ],
        ];

        foreach ($awards as $award) {
            Award::create($award);
        }
    }
}
EOF

# CertificateSeeder
cat > database/seeders/CertificateSeeder.php << 'EOF'
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Certificate;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $certificates = [
            [
                'title' => 'AWS Solutions Architect',
                'issuer' => 'Amazon Web Services',
                'description' => 'Professional level cloud architecture certification',
                'image' => './assets/technology/cert-aws.png',
                'certificate_url' => 'https://aws.amazon.com/certification',
                'issue_date' => now()->subYears(2),
                'expiry_date' => now()->addYear(),
                'category' => 'Cloud',
                'order' => 1,
            ],
            [
                'title' => 'Certified Ethical Hacker',
                'issuer' => 'EC-Council',
                'description' => 'Advanced cybersecurity certification',
                'image' => './assets/technology/cert-ceh.png',
                'certificate_url' => 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh',
                'issue_date' => now()->subYears(3),
                'expiry_date' => null,
                'category' => 'Security',
                'order' => 2,
            ],
        ];

        foreach ($certificates as $cert) {
            Certificate::create($cert);
        }
    }
}
EOF

# EntrepreneurshipContentSeeder
cat > database/seeders/EntrepreneurshipContentSeeder.php << 'EOF'
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EntrepreneurshipContent;

class EntrepreneurshipContentSeeder extends Seeder
{
    public function run(): void
    {
        $content = [
            [
                'type' => 'blog',
                'title' => 'Building a Startup Ecosystem',
                'content' => 'How to create and nurture a thriving startup community in emerging markets.',
                'image' => './assets/entepreneourship/blog1.png',
                'author' => 'Shahriar Khan',
                'publish_date' => now()->subDays(7),
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'type' => 'quote',
                'title' => 'Innovation Quote',
                'content' => 'The best way to predict the future is to invent it.',
                'image' => null,
                'author' => 'Alan Kay',
                'publish_date' => null,
                'is_featured' => false,
                'order' => 1,
            ],
            [
                'type' => 'innovation',
                'title' => 'AI-Powered Business Solutions',
                'content' => 'Leveraging artificial intelligence to solve real business problems.',
                'image' => './assets/entepreneourship/innovation1.png',
                'author' => null,
                'publish_date' => now()->subDays(14),
                'is_featured' => true,
                'order' => 1,
            ],
        ];

        foreach ($content as $item) {
            EntrepreneurshipContent::create($item);
        }
    }
}
EOF

echo "✅ All seeders implemented successfully!"
