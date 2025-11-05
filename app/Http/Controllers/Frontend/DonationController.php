<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Donation/Page/Donation', [
            'donations' => $donations,
        ]);
    }

    public function show($id)
    {
        $donation = Donation::findOrFail($id);

        return Inertia::render('DonateDetails/Page/DonateDetails', [
            'donation' => $donation,
        ]);
    }
}
