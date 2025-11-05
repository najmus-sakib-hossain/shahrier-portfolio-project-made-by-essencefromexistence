<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Team;
use App\Models\User;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user (admin)
        $user = User::first();

        if ($user) {
            // Create personal team
            $personalTeam = Team::create([
                'name' => $user->name . "'s Team",
                'slug' => 'personal-team',
                'logo' => 'https://github.com/manfromexistence.png',
                'plan' => 'Pro',
                'description' => 'Personal workspace for ' . $user->name,
            ]);

            // Create work team
            $workTeam = Team::create([
                'name' => 'Work Team',
                'slug' => 'work-team',
                'logo' => 'https://ui.shadcn.com/avatars/01.png',
                'plan' => 'Enterprise',
                'description' => 'Professional workspace',
            ]);

            // Create development team
            $devTeam = Team::create([
                'name' => 'Development Team',
                'slug' => 'dev-team',
                'logo' => 'https://ui.shadcn.com/avatars/02.png',
                'plan' => 'Startup',
                'description' => 'Development projects',
            ]);

            // Attach user to teams
            $user->teams()->attach($personalTeam->id, ['role' => 'admin']);
            $user->teams()->attach($workTeam->id, ['role' => 'admin']);
            $user->teams()->attach($devTeam->id, ['role' => 'member']);
        }
    }
}
