<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'description' => 'nullable|string',
            'summary' => 'nullable|string',
            'highlights' => 'nullable|string',
            'review' => 'nullable|string',
            'rating' => 'nullable|integer|min:0|max:5',
            'isbn' => 'nullable|string',
            'read_date' => 'nullable|date',
            'is_recommended' => 'nullable|boolean',
            'order' => 'nullable|integer',
        ]);

        // Ensure is_recommended is boolean
        $validated['is_recommended'] = $request->has('is_recommended') ? (bool)$request->is_recommended : false;

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('books/covers', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }

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
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'description' => 'nullable|string',
            'summary' => 'nullable|string',
            'highlights' => 'nullable|string',
            'review' => 'nullable|string',
            'rating' => 'nullable|integer|min:0|max:5',
            'isbn' => 'nullable|string',
            'read_date' => 'nullable|date',
            'is_recommended' => 'nullable|boolean',
            'order' => 'nullable|integer',
        ]);

        // Ensure is_recommended is boolean
        $validated['is_recommended'] = $request->has('is_recommended') ? (bool)$request->is_recommended : $book->is_recommended;

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            // Delete old image if exists
            if ($book->cover_image && Storage::disk('public')->exists(str_replace('/storage/', '', $book->cover_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $book->cover_image));
            }

            $path = $request->file('cover_image')->store('books/covers', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        } else {
            // Don't update cover_image if no new file is uploaded
            unset($validated['cover_image']);
        }

        $book->update($validated);

        return redirect()->route('admin.books.index')
            ->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book)
    {
        // Delete cover image if exists
        if ($book->cover_image && Storage::disk('public')->exists(str_replace('/storage/', '', $book->cover_image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $book->cover_image));
        }

        $book->delete();

        return redirect()->route('admin.books.index')
            ->with('success', 'Book deleted successfully.');
    }
}
