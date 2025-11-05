<?php

namespace Database\Seeders;

use App\Models\IndexPageSetting;
use App\Models\IndexPageLogo;
use Illuminate\Database\Seeder;

class IndexPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create the main index page setting
        $indexPage = IndexPageSetting::create([
            'title_text' => 'SHAHRIAR',
            'hero_image' => '/assets/shahrier.png',
            'button_text' => 'Play Now',
            'button_link' => '/home',
            'is_active' => true,
        ]);

        // Create the logos
        $logos = [
            ['name' => 'ICT Olympiad', 'logo_path' => '/assets/ict-olympiad-bangladesh.png', 'display_order' => 1],
            ['name' => 'Nexfly', 'logo_path' => '/assets/nex-fly.png', 'display_order' => 2],
            ['name' => 'Mechanix', 'logo_path' => '/assets/mechanix.png', 'display_order' => 3],
            ['name' => 'NexAcademy', 'logo_path' => '/assets/nex-academy.png', 'display_order' => 4],
            ['name' => 'MindShopper', 'logo_path' => '/assets/mindshaper.png', 'display_order' => 5],
            ['name' => 'NEX Real Estate', 'logo_path' => '/assets/nex-real-estate.png', 'display_order' => 6],
            ['name' => 'NexSports', 'logo_path' => '/assets/nex-sports.png', 'display_order' => 7],
            ['name' => 'Brand', 'logo_path' => '/assets/my-brand-story.png', 'display_order' => 8],
        ];

        foreach ($logos as $logo) {
            IndexPageLogo::create([
                'index_page_setting_id' => $indexPage->id,
                'name' => $logo['name'],
                'logo_path' => $logo['logo_path'],
                'display_order' => $logo['display_order'],
                'is_active' => true,
            ]);
        }
    }
}
