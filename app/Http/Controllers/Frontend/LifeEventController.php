<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\LifeEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LifeEventController extends Controller
{
    public function index()
    {
        $lifeEvents = LifeEvent::orderBy('event_date', 'desc')->get();
        
        $categories = LifeEvent::select('category')
            ->distinct()
            ->whereNotNull('category')
            ->pluck('category');

        return Inertia::render('LifeEvents/Page/LifeEvent', [
            'lifeEvents' => $lifeEvents,
            'categories' => $categories,
        ]);
    }
}
