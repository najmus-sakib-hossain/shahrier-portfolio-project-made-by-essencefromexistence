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
                'description' => 'Annual technology and innovation conference bringing together leaders in tech and business',
                'image' => '/assets/events/event_activites_1.png',
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
                'description' => 'Connect with fellow entrepreneurs and investors. Share ideas and build partnerships.',
                'image' => '/assets/events/event_activities_2.png',
                'location' => 'Gulshan, Dhaka',
                'event_date' => now()->addDays(15),
                'event_time' => '18:00:00',
                'category' => 'Networking',
                'organizer' => 'Startup Bangladesh',
                'is_featured' => true,
                'is_past' => false,
            ],
            [
                'title' => 'Digital Marketing Workshop',
                'description' => 'Learn advanced digital marketing strategies from industry experts',
                'image' => '/assets/events/event_activites_3.png',
                'location' => 'Online',
                'event_date' => now()->subDays(10),
                'event_time' => '14:00:00',
                'category' => 'Workshop',
                'organizer' => 'Marketing Pro',
                'is_featured' => false,
                'is_past' => true,
            ],
            [
                'title' => 'AI and Machine Learning Conference',
                'description' => 'Exploring the future of AI and its applications in business',
                'image' => '/assets/events/event_activites_4.png',
                'location' => 'Singapore',
                'event_date' => now()->subMonths(2),
                'event_time' => '10:00:00',
                'category' => 'Conference',
                'organizer' => 'AI Asia',
                'is_featured' => true,
                'is_past' => true,
            ],
            [
                'title' => 'Entrepreneurship Bootcamp',
                'description' => 'Intensive 3-day program for aspiring entrepreneurs',
                'image' => '/assets/events/event_activites_1.png',
                'location' => 'Dhaka, Bangladesh',
                'event_date' => now()->addMonths(2),
                'event_time' => '09:00:00',
                'category' => 'Training',
                'organizer' => 'Business Incubator BD',
                'is_featured' => true,
                'is_past' => false,
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
