<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $upcomingEvents = Event::where('is_past', false)
            ->orderBy('event_date', 'desc')
            ->get();

        $pastEvents = Event::where('is_past', true)
            ->orderBy('event_date', 'desc')
            ->get();

        $featuredEvents = Event::where('is_featured', true)
            ->orderBy('event_date', 'desc')
            ->get();

        return Inertia::render('Events/Page/Events', [
            'upcomingEvents' => $upcomingEvents,
            'pastEvents' => $pastEvents,
            'featuredEvents' => $featuredEvents,
        ]);
    }
}
