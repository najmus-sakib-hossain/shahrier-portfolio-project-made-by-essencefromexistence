#!/bin/bash

# Fresh Database Seeder Script
# This script will reset the database and seed it with sample data

echo "🗄️  Refreshing database..."
php artisan migrate:fresh

echo "🌱 Seeding database with sample data..."
php artisan db:seed

echo "✅ Database seeded successfully!"
echo ""
echo "📊 Seeded content:"
echo "  - Index Page (landing page)"
echo "  - Hero Sections (home banner)"
echo "  - Statistics (home stats)"
echo "  - Blog Posts"
echo "  - Books"
echo "  - Events"
echo "  - Videos"
echo "  - Technologies"
echo "  - Donations"
echo "  - Life Events"
echo "  - About Sections"
echo "  - Awards"
echo "  - Certificates"
echo "  - Entrepreneurship Content"
echo ""
echo "🎯 You can now:"
echo "  1. Visit / to see the landing page"
echo "  2. Visit /home to see the home page"
echo "  3. Visit /admin/index-page to manage landing page"
echo "  4. Login to /dashboard to manage all content"
