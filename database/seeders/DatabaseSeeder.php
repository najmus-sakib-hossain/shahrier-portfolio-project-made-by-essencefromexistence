<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default admin user
        User::firstOrCreate(
            ['email' => 'shahrier@gmail.com'],
            [
                'name' => 'Shahrier',
                'password' => 'shahrier@password',
                'avatar' => '/assets/life_events/life_events_banner.png',
                'email_verified_at' => now(),
            ]
        );

        // Seed all content
        $this->call([
            IndexPageSeeder::class,
            HeroSectionSeeder::class,
            StatisticSeeder::class,
            BlogPostSeeder::class,
            BookSeeder::class,
            EventSeeder::class,
            VideoSeeder::class,
            TechnologySeeder::class,
            DonationSeeder::class,
            LifeEventSeeder::class,
            AboutSectionSeeder::class,
            AwardSeeder::class,
            CertificateSeeder::class,
            EntrepreneurshipContentSeeder::class,
        ]);
    }
}
