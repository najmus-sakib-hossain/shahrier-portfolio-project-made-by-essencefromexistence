<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\EntrepreneurshipContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EntrepreneurshipController extends Controller
{
    public function index()
    {
        $blogs = EntrepreneurshipContent::where('type', 'blog')
            ->orderBy('publish_date', 'desc')
            ->get();

        $quotes = EntrepreneurshipContent::where('type', 'quote')
            ->orderBy('order')
            ->get();

        $events = EntrepreneurshipContent::where('type', 'event')
            ->orderBy('publish_date', 'desc')
            ->get();

        $innovations = EntrepreneurshipContent::where('type', 'innovation')
            ->orderBy('order')
            ->get();

        return Inertia::render('Entepreneourship/Page/Entepreneouship', [
            'blogs' => $blogs,
            'quotes' => $quotes,
            'events' => $events,
            'innovations' => $innovations,
        ]);
    }
}
