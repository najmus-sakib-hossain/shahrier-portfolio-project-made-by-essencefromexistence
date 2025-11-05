<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::latest()->get();
        
        return Inertia::render('dashboard/books/index', [
            'books' => $books
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/books/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'cover_image' => 'nullable|string',
            'description' => 'nullable|string',
            'summary' => 'nullable|string',
            'highlights' => 'nullable|string',
            'review' => 'nullable|string',
            'rating' => 'nullable|integer|min:0|max:5',
            'isbn' => 'nullable|string',
            'read_date' => 'nullable|date',
            'is_recommended' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        Book::create($validated);

        return redirect()->route('admin.books.index')
            ->with('success', 'Book added successfully.');
    }

    public function edit(Book $book)
    {
        return Inertia::render('dashboard/books/edit', [
            'book' => $book
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'cover_image' => 'nullable|string',
            'description' => 'nullable|string',
            'summary' => 'nullable|string',
            'highlights' => 'nullable|string',
            'review' => 'nullable|string',
            'rating' => 'nullable|integer|min:0|max:5',
            'isbn' => 'nullable|string',
            'read_date' => 'nullable|date',
            'is_recommended' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        $book->update($validated);

        return redirect()->route('admin.books.index')
            ->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('admin.books.index')
            ->with('success', 'Book deleted successfully.');
    }
}
