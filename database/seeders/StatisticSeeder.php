<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Statistic;

class StatisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statistics = [
            ['label' => 'Years Experience', 'value' => '11', 'order' => 1],
            ['label' => 'Projects Completed', 'value' => '200', 'order' => 2],
            ['label' => 'Certifications', 'value' => '6', 'order' => 3],
            ['label' => 'International Articles', 'value' => '5', 'order' => 4],
        ];

        foreach ($statistics as $stat) {
            Statistic::create($stat);
        }
    }
}
