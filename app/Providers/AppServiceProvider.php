<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Share data globally with Inertia
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => auth()->check() ? [
                        'id' => auth()->user()->id,
                        'name' => auth()->user()->name,
                        'email' => auth()->user()->email,
                        'avatar' => auth()->user()->avatar,
                        'theme' => auth()->user()->theme ?? 'system',
                    ] : null,
                ];
            },
            'userTeams' => function () {
                if (auth()->check()) {
                    return auth()->user()->teams->map(function ($team) {
                        return [
                            'id' => $team->id,
                            'name' => $team->name,
                            'slug' => $team->slug,
                            'logo' => $team->logo,
                            'plan' => $team->plan,
                        ];
                    });
                }
                return [];
            },
        ]);
    }
}
