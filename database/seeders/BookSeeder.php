<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            [
                'title' => 'Atomic Habits',
                'author' => 'James Clear',
                'cover_image' => '/assets/books/recommended_book1.png',
                'description' => 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
                'summary' => 'James Clear presents a proven framework for improving every day. The book demonstrates how tiny changes can lead to remarkable results over time.',
                'highlights' => 'Focus on systems, not goals. Make it obvious, attractive, easy, and satisfying. The aggregation of marginal gains.',
                'review' => 'A transformative book that changed how I approach daily habits and productivity. The practical strategies are immediately applicable.',
                'rating' => 5,
                'isbn' => '9780735211292',
                'read_date' => now()->subMonths(6),
                'is_recommended' => true,
                'order' => 1,
            ],
            [
                'title' => 'Thinking, Fast and Slow',
                'author' => 'Daniel Kahneman',
                'cover_image' => '/assets/books/recommended_book2.png',
                'description' => 'Understanding how we make decisions',
                'summary' => 'Explores the two systems that drive the way we think. System 1 is fast, intuitive, and emotional. System 2 is slower, more deliberative, and logical.',
                'highlights' => 'System 1 is fast and intuitive. System 2 is slow and deliberate. We often trust our intuition too much.',
                'review' => 'Essential reading for anyone interested in psychology and decision-making. Kahneman brilliantly explains cognitive biases.',
                'rating' => 5,
                'isbn' => '9780374533557',
                'read_date' => now()->subMonths(8),
                'is_recommended' => true,
                'order' => 2,
            ],
            [
                'title' => 'Zero to One',
                'author' => 'Peter Thiel',
                'cover_image' => '/assets/books/recommended_book3.png',
                'description' => 'Notes on Startups, or How to Build the Future',
                'summary' => 'Insights on innovation and building breakthrough companies. Thiel argues that we must create entirely new things rather than copying what works.',
                'highlights' => 'Competition is for losers. Create monopolies through innovation. Ask yourself: what important truth do very few people agree with you on?',
                'review' => 'A must-read for entrepreneurs and innovators. Challenges conventional wisdom about startups and business.',
                'rating' => 4,
                'isbn' => '9780804139298',
                'read_date' => now()->subMonths(10),
                'is_recommended' => true,
                'order' => 3,
            ],
            [
                'title' => 'The Lean Startup',
                'author' => 'Eric Ries',
                'cover_image' => '/assets/books/recommended_book4.png',
                'description' => 'How Entrepreneurs Use Continuous Innovation to Create Successful Businesses',
                'summary' => 'A systematic approach to creating and managing startups in an age of uncertainty. The core idea is to build-measure-learn.',
                'highlights' => 'Build-Measure-Learn feedback loop. Validated learning. Minimum Viable Product (MVP).',
                'review' => 'Revolutionary approach to building startups. The framework has become industry standard.',
                'rating' => 5,
                'isbn' => '9780307887894',
                'read_date' => now()->subYear(),
                'is_recommended' => true,
                'order' => 4,
            ],
            [
                'title' => 'The 4-Hour Workweek',
                'author' => 'Timothy Ferriss',
                'cover_image' => '/assets/books/recommended_book5.png',
                'description' => 'Escape 9-5, Live Anywhere, and Join the New Rich',
                'summary' => 'A blueprint for escaping the traditional work paradigm and designing your ideal lifestyle.',
                'highlights' => 'Focus on effectiveness over efficiency. Automate and delegate. Mini-retirements instead of deferred life plan.',
                'review' => 'Mind-opening perspectives on work, life, and entrepreneurship. Some ideas need adaptation but core concepts are powerful.',
                'rating' => 4,
                'isbn' => '9780307465351',
                'read_date' => now()->subMonths(14),
                'is_recommended' => true,
                'order' => 5,
            ],
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}
