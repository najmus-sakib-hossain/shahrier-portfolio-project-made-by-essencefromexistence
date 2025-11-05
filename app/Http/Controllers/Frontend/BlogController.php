<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = BlogPost::where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('Blogs/Page/Blogs', [
            'blogs' => $blogs
        ]);
    }

    public function show($slug)
    {
        $blog = BlogPost::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        // Increment views
        $blog->increment('views');

        return Inertia::render('Blogs/Page/BlogDetail', [
            'blog' => $blog
        ]);
    }
}
