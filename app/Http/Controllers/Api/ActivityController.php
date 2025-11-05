<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Video;
use App\Models\Event;
use App\Models\Book;
use App\Models\Donation;
use App\Models\Award;
use App\Models\Certificate;
use App\Models\LifeEvent;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ActivityController extends Controller
{
    /**
     * Get recent activity data for charts
     * Returns aggregated data for blog posts, videos, events, and books
     */
    public function getRecentActivity(Request $request)
    {
        $days = $request->input('days', 90); // Default to 90 days
        $startDate = Carbon::now()->subDays($days)->startOfDay();
        
        // Generate date range
        $dates = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $dates[] = Carbon::now()->subDays($i)->format('Y-m-d');
        }
        
        // Initialize data structure
        $activityData = collect($dates)->mapWithKeys(function ($date) {
            return [$date => [
                'date' => $date,
                'blog_posts' => 0,
                'videos' => 0,
                'events' => 0,
                'books' => 0,
                'total' => 0,
            ]];
        });
        
        // Get blog posts created per day
        $blogPosts = BlogPost::where('created_at', '>=', $startDate)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->get()
            ->keyBy('date');
        
        // Get videos created per day
        $videos = Video::where('created_at', '>=', $startDate)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->get()
            ->keyBy('date');
        
        // Get events created per day
        $events = Event::where('created_at', '>=', $startDate)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->get()
            ->keyBy('date');
        
        // Get books created per day
        $books = Book::where('created_at', '>=', $startDate)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->get()
            ->keyBy('date');
        
        // Merge data
        $activityData = $activityData->map(function ($item) use ($blogPosts, $videos, $events, $books) {
            $date = $item['date'];
            
            $item['blog_posts'] = $blogPosts->get($date)?->count ?? 0;
            $item['videos'] = $videos->get($date)?->count ?? 0;
            $item['events'] = $events->get($date)?->count ?? 0;
            $item['books'] = $books->get($date)?->count ?? 0;
            $item['total'] = $item['blog_posts'] + $item['videos'] + $item['events'] + $item['books'];
            
            return $item;
        });
        
        return response()->json([
            'success' => true,
            'data' => $activityData->values(),
        ]);
    }
    
    /**
     * Get content activity statistics
     */
    public function getVisitorStats(Request $request)
    {
        $days = $request->input('days', 90);
        $startDate = Carbon::now()->subDays($days)->startOfDay();
        
        // Generate date range
        $dates = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $dates[] = Carbon::now()->subDays($i)->format('Y-m-d');
        }
        
        // Get actual content activity data for all content types
        $activityData = collect($dates)->map(function ($date) {
            // Get actual counts for each content type on this date
            $blogCount = BlogPost::whereDate('created_at', $date)->count();
            $videoCount = Video::whereDate('created_at', $date)->count();
            $eventCount = Event::whereDate('created_at', $date)->count();
            $bookCount = Book::whereDate('created_at', $date)->count();
            $donationCount = Donation::whereDate('created_at', $date)->count();
            $awardCount = Award::whereDate('created_at', $date)->count();
            $certificateCount = Certificate::whereDate('created_at', $date)->count();
            $lifeEventCount = LifeEvent::whereDate('created_at', $date)->count();
            $teamCount = Team::whereDate('created_at', $date)->count();
            
            return [
                'date' => $date,
                'blogs' => $blogCount,
                'videos' => $videoCount,
                'events' => $eventCount,
                'books' => $bookCount,
                'donations' => $donationCount,
                'awards' => $awardCount,
                'certificates' => $certificateCount,
                'lifeEvents' => $lifeEventCount,
                'team' => $teamCount,
            ];
        });
        
        return response()->json([
            'success' => true,
            'data' => $activityData,
        ]);
    }
    
    /**
     * Get content statistics
     */
    public function getContentStats()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_blog_posts' => BlogPost::count(),
                'total_videos' => Video::count(),
                'total_events' => Event::count(),
                'total_books' => Book::count(),
                'recent_blog_posts' => BlogPost::where('created_at', '>=', Carbon::now()->subDays(30))->count(),
                'recent_videos' => Video::where('created_at', '>=', Carbon::now()->subDays(30))->count(),
                'recent_events' => Event::where('created_at', '>=', Carbon::now()->subDays(30))->count(),
                'recent_books' => Book::where('created_at', '>=', Carbon::now()->subDays(30))->count(),
            ],
        ]);
    }
}
