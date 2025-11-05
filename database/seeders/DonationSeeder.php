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
                'description' => 'Help provide quality education to children in need. Your contribution will support school supplies, teachers, and infrastructure.',
                'image' => '/assets/donation/donate_card1.png',
                'goal_amount' => 50000.00,
                'raised_amount' => 25000.00,
                'category' => 'Education',
                'end_date' => now()->addMonths(3),
                'is_active' => true,
                'beneficiary_info' => 'Rural schools in Bangladesh',
                'order' => 1,
            ],
            [
                'title' => 'Tech Training for Youth',
                'description' => 'Empowering youth with technology skills for better employment opportunities. Learn coding, web development, and more.',
                'image' => '/assets/donation/donate_card2.png',
                'goal_amount' => 30000.00,
                'raised_amount' => 18000.00,
                'category' => 'Technology',
                'end_date' => now()->addMonths(2),
                'is_active' => true,
                'beneficiary_info' => 'Youth in urban slums',
                'order' => 2,
            ],
            [
                'title' => 'Clean Water Initiative',
                'description' => 'Providing access to clean drinking water in rural communities. Every drop counts.',
                'image' => '/assets/donation/donation.png',
                'goal_amount' => 75000.00,
                'raised_amount' => 45000.00,
                'category' => 'Health',
                'end_date' => now()->addMonths(6),
                'is_active' => true,
                'beneficiary_info' => 'Remote villages',
                'order' => 3,
            ],
        ];

        foreach ($donations as $donation) {
            Donation::create($donation);
        }
    }
}
