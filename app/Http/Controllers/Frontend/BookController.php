<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::where('is_recommended', true)
            ->orderBy('order')
            ->get();

        $allBooks = Book::orderBy('order')->get();

        return Inertia::render('Books/Page/Books', [
            'recommendedBooks' => $books,
            'allBooks' => $allBooks,
        ]);
    }
}
