<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use App\Models\Award;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $sections = AboutSection::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->groupBy('section_type');

        $awards = Award::orderBy('order')->get();

        return Inertia::render('AboutMe/Page/AboutMe', [
            'sections' => $sections,
            'awards' => $awards,
        ]);
    }
}
