<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\{BlogPost, Book, Event, Video, Technology, Donation, LifeEvent, AboutSection, Award, Certificate, EntrepreneurshipContent, HeroSection, Statistic};
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Get counts for each resource
        $stats = [
            'total_blogs' => BlogPost::count(),
            'total_books' => Book::count(),
            'total_events' => Event::count(),
            'total_videos' => Video::count(),
            'total_technologies' => Technology::count(),
            'total_donations' => Donation::count(),
            'total_life_events' => LifeEvent::count(),
            'total_awards' => Award::count(),
            'total_certificates' => Certificate::count(),
            'entrepreneurship_content' => EntrepreneurshipContent::count(),
        ];

        // Calculate changes from previous month
        $previousMonth = Carbon::now()->subMonth();
        $stats['blogs_change'] = $this->calculateChange('blog_posts', $previousMonth);
        $stats['books_change'] = $this->calculateChange('books', $previousMonth);
        $stats['events_change'] = $this->calculateChange('events', $previousMonth);
        $stats['videos_change'] = $this->calculateChange('videos', $previousMonth);
        $stats['donations_change'] = $this->calculateChange('donations', $previousMonth);

        // Get activity data for the chart (last 30 days)
        $activityData = $this->getActivityChartData();

        // Get recent operations for the table
        $recentActivity = $this->getRecentActivity();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'activityData' => $activityData,
            'recentActivity' => $recentActivity,
        ]);
    }

    private function calculateChange($table, $previousMonth)
    {
        $currentCount = DB::table($table)
            ->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->count();

        $previousCount = DB::table($table)
            ->whereMonth('created_at', $previousMonth->month)
            ->whereYear('created_at', $previousMonth->year)
            ->count();

        if ($previousCount == 0) {
            return $currentCount > 0 ? 100 : 0;
        }

        return round((($currentCount - $previousCount) / $previousCount) * 100, 1);
    }

    private function getActivityChartData()
    {
        $days = [];
        $data = [];

        // Get data for last 30 days
        for ($i = 29; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $days[] = $date;

            // Count all creates and updates for each day
            $creates = 0;
            $updates = 0;

            $tables = ['blog_posts', 'books', 'events', 'videos', 'technologies', 'donations', 'life_events', 'awards', 'certificates', 'entrepreneurship_content'];

            foreach ($tables as $table) {
                $creates += DB::table($table)
                    ->whereDate('created_at', $date)
                    ->count();

                $updates += DB::table($table)
                    ->whereDate('updated_at', $date)
                    ->where('created_at', '!=', DB::raw('updated_at'))
                    ->count();
            }

            $data[] = [
                'date' => $date,
                'creates' => $creates,
                'updates' => $updates,
            ];
        }

        return $data;
    }

    private function getRecentActivity()
    {
        $activities = [];

        // Get recent items from each table
        $tables = [
            'blog_posts' => BlogPost::class,
            'books' => Book::class,
            'events' => Event::class,
            'videos' => Video::class,
            'technologies' => Technology::class,
            'donations' => Donation::class,
            'life_events' => LifeEvent::class,
            'awards' => Award::class,
            'certificates' => Certificate::class,
            'entrepreneurship_content' => EntrepreneurshipContent::class,
        ];

        foreach ($tables as $table => $model) {
            // Get recently created
            $created = $model::latest('created_at')->take(5)->get()->map(function ($item) use ($table) {
                return [
                    'id' => $item->id,
                    'resource' => ucfirst(str_replace('_', ' ', $table)),
                    'action' => 'Created',
                    'title' => $item->title ?? $item->name ?? 'Untitled',
                    'date' => $item->created_at->format('Y-m-d H:i:s'),
                    'user' => 'Admin',
                ];
            });

            // Get recently updated (not created)
            $updated = $model::where('created_at', '!=', DB::raw('updated_at'))
                ->latest('updated_at')
                ->take(5)
                ->get()
                ->map(function ($item) use ($table) {
                    return [
                        'id' => $item->id,
                        'resource' => ucfirst(str_replace('_', ' ', $table)),
                        'action' => 'Updated',
                        'title' => $item->title ?? $item->name ?? 'Untitled',
                        'date' => $item->updated_at->format('Y-m-d H:i:s'),
                        'user' => 'Admin',
                    ];
                });

            $activities = array_merge($activities, $created->toArray(), $updated->toArray());
        }

        // Sort by date descending and take top 50
        usort($activities, function ($a, $b) {
            return strtotime($b['date']) - strtotime($a['date']);
        });

        return array_slice($activities, 0, 50);
    }
}
