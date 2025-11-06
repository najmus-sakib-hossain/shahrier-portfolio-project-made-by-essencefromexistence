<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ContactPageSetting;

class ContactPageSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ContactPageSetting::updateOrCreate(
            ['id' => 1],
            [
                'page_title' => 'Contact',
                'heading' => "Let's talk over a cup of coffee!",
                'description' => "Ready to elevate your brand with unforgettable experiential events?\n\nWhether you're a brand looking to create a unique brand experience or a creative professional seeking collaboration, we're here to bring your vision to life.",
                'contact_email' => 'mdshahriar.khan@gmail.com',
                'form_title' => 'Drop Your Message',
                'background_image' => '/assets/contact/contact_banner_bg.png',
            ]
        );
    }
}
