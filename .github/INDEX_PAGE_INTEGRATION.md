# Index Page Backend Integration - Complete Setup

## Overview
Successfully created a complete backend management system for the Index landing page, allowing dynamic control of all images, text, and logos through the admin dashboard.

## What Was Created

### 1. Database Structure
**Migration:** `2024_01_20_000000_create_index_page_settings_table.php`

Two tables created:
- `index_page_settings` - Main page settings (title, hero image, button)
- `index_page_logos` - Logo grid management with ordering

### 2. Models
- **IndexPageSetting.php** - Main page settings model with logo relationships
- **IndexPageLogo.php** - Individual logo model

### 3. Database Seeder
**IndexPageSeeder.php** - Populated with current images:
- Title: "SHAHRIAR"
- Hero Image: /assets/shahrier.png
- Button: "Play Now" → /home
- 8 Logos: ICT Olympiad, Nexfly, Mechanix, NexAcademy, MindShopper, NEX Real Estate, NexSports, Brand

### 4. Admin Controller
**Admin/IndexPageController.php** with routes:
- `GET /admin/index-page` - Management page
- `POST /admin/index-page/update` - Update main settings
- `POST /admin/index-page/logos` - Add new logo
- `PUT /admin/index-page/logos/{id}` - Update logo
- `DELETE /admin/index-page/logos/{id}` - Delete logo
- `POST /admin/index-page/logos/reorder` - Reorder logos

### 5. Admin UI
**resources/js/pages/Admin/IndexPage/Index.tsx**

Features:
- ✅ Update page title text (SHAHRIAR)
- ✅ Change hero image (bottom character image)
- ✅ Edit button text and link
- ✅ Add/Edit/Delete logos
- ✅ Reorder logos with display_order
- ✅ Toggle active/inactive status
- ✅ Live image previews
- ✅ Responsive grid layout

### 6. Frontend Integration
**resources/js/pages/Index.tsx** - Updated to use backend data:
- Accepts `indexPage` prop from HomeController
- Uses dynamic logos from database
- Falls back to default images if database empty
- Dynamic title text, hero image, button text/link

### 7. Routes
Added to `routes/web.php`:
```php
// Frontend
Route::get('/', [HomeController::class, 'index']); // Now passes indexPage data

// Admin
Route::get('admin/index-page', [IndexPageController::class, 'index']);
Route::post('admin/index-page/update', [IndexPageController::class, 'update']);
Route::post('admin/index-page/logos', [IndexPageController::class, 'storeLogo']);
// ... more routes
```

### 8. Sidebar Navigation
Added "Landing Page" link to admin sidebar under Content Management

## How to Use

### Access Admin Panel
1. Navigate to `/admin/index-page` in your admin dashboard
2. You'll see two cards:
   - **Page Settings**: Change title, button, hero image
   - **Add Logo**: Upload and manage logos

### Manage Main Settings
- **Title Text**: The large text displayed (default: SHAHRIAR)
- **Button Text**: The CTA button text (default: Play Now)
- **Button Link**: Where the button navigates (default: /home)
- **Hero Image**: The character image at the bottom

### Manage Logos
- **Add Logo**: Upload image, set name, order
- **Edit Logo**: Click "Edit" on any logo card
- **Delete Logo**: Click trash icon
- **Reorder**: Change display_order number
- **Toggle Active**: Enable/disable logos without deleting

### Image Upload
All images uploaded through admin are stored in:
- Hero images: `storage/app/public/index-page/`
- Logos: `storage/app/public/index-page/logos/`

Access via: `/storage/index-page/image.jpg`

## Database Fields

### index_page_settings
```
id, title_text, hero_image, button_text, button_link, is_active, timestamps
```

### index_page_logos
```
id, index_page_setting_id, name, logo_path, display_order, is_active, timestamps
```

## Frontend Props Structure
```typescript
interface IndexPage {
    id: number;
    title_text: string;
    hero_image: string;
    button_text: string;
    button_link: string;
    active_logos: [
        {
            id: number;
            name: string;
            logo_path: string;
            display_order: number;
        }
    ];
}
```

## Testing Checklist

### Admin Panel
- [ ] Access `/admin/index-page`
- [ ] Update title text and see changes
- [ ] Upload new hero image
- [ ] Change button text/link
- [ ] Add a new logo
- [ ] Edit existing logo
- [ ] Delete a logo
- [ ] Toggle active/inactive status

### Frontend
- [ ] Visit `/` to see landing page
- [ ] Verify logos display from database
- [ ] Verify title text from database
- [ ] Verify hero image from database
- [ ] Click button and verify navigation
- [ ] Test double-click for dashboard access

## Default Fallbacks
If database is empty, frontend shows:
- Title: "SHAHRIAR"
- Hero: "/assets/shahrier.png"
- Button: "Play Now" → "/home"
- 8 default logos from /assets/

## Files Modified/Created

### Created
1. `database/migrations/2024_01_20_000000_create_index_page_settings_table.php`
2. `app/Models/IndexPageSetting.php`
3. `app/Models/IndexPageLogo.php`
4. `database/seeders/IndexPageSeeder.php`
5. `app/Http/Controllers/Admin/IndexPageController.php`
6. `resources/js/pages/Admin/IndexPage/Index.tsx`

### Modified
1. `routes/web.php` - Added index page routes
2. `app/Http/Controllers/Frontend/HomeController.php` - Pass indexPage prop
3. `resources/js/pages/Index.tsx` - Accept and use backend data
4. `resources/js/components/app-sidebar.tsx` - Added "Landing Page" menu item

## Commands Run
```bash
php artisan migrate
php artisan db:seed --class=IndexPageSeeder
```

## Next Steps
1. ✅ Migration run successfully
2. ✅ Database seeded with current images
3. ✅ Admin UI created
4. ✅ Frontend connected
5. 🎯 **You can now**: Visit `/admin/index-page` and start customizing!

## Storage Configuration
Make sure storage is linked:
```bash
php artisan storage:link
```

This creates a symbolic link from `public/storage` to `storage/app/public` so uploaded images are accessible.
