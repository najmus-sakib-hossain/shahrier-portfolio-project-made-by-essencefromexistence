<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\AboutController;
use App\Http\Controllers\Frontend\BlogController;
use App\Http\Controllers\Frontend\BookController;
use App\Http\Controllers\Frontend\EventController;
use App\Http\Controllers\Frontend\VideoController;
use App\Http\Controllers\Frontend\TechnologyController;
use App\Http\Controllers\Frontend\DonationController;
use App\Http\Controllers\Frontend\LifeEventController;
use App\Http\Controllers\Frontend\EntrepreneurshipController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\BookController as AdminBookController;
use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Admin\VideoController as AdminVideoController;
use App\Http\Controllers\Admin\TechnologyController as AdminTechnologyController;
use App\Http\Controllers\Admin\DonationController as AdminDonationController;
use App\Http\Controllers\Admin\LifeEventController as AdminLifeEventController;
use App\Http\Controllers\Admin\HeroSectionController;
use App\Http\Controllers\Admin\StatisticController;
use App\Http\Controllers\Admin\AboutSectionController;
use App\Http\Controllers\Admin\AwardController;
use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\Admin\EntrepreneurshipContentController;
use App\Http\Controllers\Admin\IndexPageController;
use App\Http\Controllers\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Admin\ContactPageSettingController;
use App\Http\Controllers\Api\ActivityController;

// Frontend Routes
Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('/home', [HomeController::class, 'home'])->name('home');
Route::get('/aboutme', [AboutController::class, 'index'])->name('aboutme');
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs');
Route::get('/blogs/{slug}', [BlogController::class, 'show'])->name('blogs.show');
Route::get('/books', [BookController::class, 'index'])->name('books');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');
Route::get('/donate-details/{id}', [DonationController::class, 'show'])->name('donate-details');
Route::get('/donation', [DonationController::class, 'index'])->name('donation');
Route::get('/entrepreneurship', [EntrepreneurshipController::class, 'index'])->name('entrepreneurship');
Route::get('/events', [EventController::class, 'index'])->name('events');
Route::get('/life-events', [LifeEventController::class, 'index'])->name('life-events');
Route::get('/technology', [TechnologyController::class, 'index'])->name('technology');
Route::get('/videos', [VideoController::class, 'index'])->name('videos');

// API Routes for Chart Data
Route::prefix('api')->name('api.')->group(function () {
    Route::get('/activity/recent', [ActivityController::class, 'getRecentActivity'])->name('activity.recent');
    Route::get('/activity/visitors', [ActivityController::class, 'getVisitorStats'])->name('activity.visitors');
    Route::get('/activity/content-stats', [ActivityController::class, 'getContentStats'])->name('activity.content-stats');
});

// Admin Dashboard Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\Dashboard\DashboardController::class, 'index'])->name('dashboard');

    // Profile Routes
    Route::get('/profile', [\App\Http\Controllers\Dashboard\ProfileController::class, 'index'])->name('profile');
    Route::post('/profile/update', [\App\Http\Controllers\Dashboard\ProfileController::class, 'update'])->name('dashboard.profile.update');
    Route::post('/profile/update-theme', [\App\Http\Controllers\Dashboard\ProfileController::class, 'updateTheme'])->name('profile.update-theme');

    // Admin Resource Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('blogs', BlogPostController::class);
        Route::resource('books', AdminBookController::class);
        Route::resource('events', AdminEventController::class);
        Route::resource('videos', AdminVideoController::class);
        Route::resource('technologies', AdminTechnologyController::class);
        Route::resource('donations', AdminDonationController::class);
        Route::resource('life-events', AdminLifeEventController::class);
        Route::resource('hero-sections', HeroSectionController::class);
        Route::resource('statistics', StatisticController::class);
        Route::resource('about-sections', AboutSectionController::class);
        Route::resource('awards', AwardController::class);
        Route::resource('certificates', CertificateController::class);
        Route::resource('entrepreneurship-content', EntrepreneurshipContentController::class);
        Route::resource('contacts', AdminContactController::class)->only(['index', 'show', 'update', 'destroy']);
        
        // Contact Page Settings
        Route::get('contact-page-settings', [ContactPageSettingController::class, 'index'])->name('contact-page-settings.index');
        Route::post('contact-page-settings/update', [ContactPageSettingController::class, 'update'])->name('contact-page-settings.update');
        
        // Index Page Management
        Route::get('index-page', [IndexPageController::class, 'index'])->name('index-page.index');
        Route::post('index-page/update', [IndexPageController::class, 'update'])->name('index-page.update');
        Route::post('index-page/logos', [IndexPageController::class, 'storeLogo'])->name('index-page.logos.store');
        Route::put('index-page/logos/{logo}', [IndexPageController::class, 'updateLogo'])->name('index-page.logos.update');
        Route::delete('index-page/logos/{logo}', [IndexPageController::class, 'deleteLogo'])->name('index-page.logos.delete');
        Route::post('index-page/logos/reorder', [IndexPageController::class, 'reorderLogos'])->name('index-page.logos.reorder');
    });
});

require __DIR__.'/settings.php';
