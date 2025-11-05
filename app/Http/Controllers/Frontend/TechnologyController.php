<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    public function index()
    {
        $technologies = Technology::orderBy('order')->get();
        
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();
        
        $cyberSecurity = Technology::where('category', 'cybersecurity')
            ->orderBy('order')
            ->get();

        return Inertia::render('Technology/Page/Technology', [
            'technologies' => $technologies,
            'certificates' => $certificates,
            'cyberSecurity' => $cyberSecurity,
        ]);
    }
}
