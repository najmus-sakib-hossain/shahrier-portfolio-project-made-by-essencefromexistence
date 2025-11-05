# Production Deployment Guide

## Fixed Issues

### Problem
The application was showing 500 errors in production for all pages with `.jsx` extension because:
1. The `app.blade.php` was hardcoded to only look for `.tsx` files
2. The `tsconfig.json` wasn't configured to include all `.jsx` files
3. The glob import pattern needed proper configuration for production builds

### Solution Applied

#### 1. Updated `resources/views/app.blade.php`
Changed from:
```blade
@vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
```

To:
```blade
@vite(['resources/js/app.tsx'])
```

This allows the dynamic page resolution in `app.tsx` to handle both `.tsx` and `.jsx` files.

#### 2. Updated `resources/js/app.tsx` and `resources/js/ssr.tsx`
Both files now use the correct glob pattern:
```typescript
const pages = import.meta.glob('./pages/**/*.{tsx,jsx}');
```

The resolver tries both extensions:
```typescript
for (const extension of ['tsx', 'jsx']) {
    const path = `./pages/${name}.${extension}`;
    if (pages[path]) {
        const module = await pages[path]();
        return module;
    }
}
```

#### 3. Updated `tsconfig.json`
Changed the include pattern to:
```json
"include": [
    "resources/js/**/*.ts",
    "resources/js/**/*.d.ts", 
    "resources/js/**/*.tsx",
    "resources/js/**/*.jsx"
]
```

## Deployment Steps for cPanel

### 1. Build Assets Locally
```bash
npm run build
```

This creates optimized production assets in `public/build/`.

### 2. Upload Files to cPanel
Upload these directories/files:
- `app/`
- `bootstrap/`
- `config/`
- `database/`
- `public/` (including `public/build/`)
- `resources/` (optional, only needed if you want to rebuild on server)
- `routes/`
- `storage/` (ensure proper permissions)
- `vendor/` (or run `composer install --no-dev` on server)
- `.env` (configure for production)
- `artisan`
- `composer.json`
- `composer.lock`

### 3. Configure .env for Production
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Set proper database credentials
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Configure other services as needed
```

### 4. Set Proper Permissions
```bash
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

### 5. Run Laravel Commands
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

### 6. Configure Web Server
Ensure your web server (Apache/Nginx) points to the `public` directory.

For Apache, your `.htaccess` in `public/` should contain:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ index.php [QSA,L]
</IfModule>
```

### 7. Verify Build Assets
Ensure these files exist on the server:
- `public/build/manifest.json`
- `public/build/assets/app-*.js`
- `public/build/assets/app-*.css`

## Verification Checklist

- [x] Production build completes without errors
- [x] All `.jsx` pages are in the manifest
- [x] All `.tsx` pages are in the manifest  
- [x] `app.blade.php` loads only `app.tsx`
- [x] Dynamic page resolution handles both extensions
- [x] TypeScript config includes `.jsx` files

## Testing Production Build Locally

If you want to test the production build locally before deploying:

```bash
# Build for production
npm run build

# Serve with Laravel
php artisan serve

# Test in browser - should work without Vite dev server
```

## Troubleshooting

### If you still get 500 errors:

1. Check Laravel logs: `storage/logs/laravel.log`
2. Enable debug mode temporarily: `APP_DEBUG=true` in `.env`
3. Clear all caches:
   ```bash
   php artisan config:clear
   php artisan route:clear
   php artisan view:clear
   php artisan cache:clear
   ```
4. Rebuild assets:
   ```bash
   npm run build
   ```

### If specific pages don't load:

1. Check the manifest file for the page:
   ```bash
   cat public/build/manifest.json | grep "PageName"
   ```

2. Verify the file exists in `resources/js/pages/`

3. Check the file extension matches (`.tsx` or `.jsx`)

## Notes

- Both `.tsx` and `.jsx` files are now fully supported
- The production build includes all page components
- No manual file listing is needed - glob pattern handles discovery
- SSR (Server-Side Rendering) is properly configured for both extensions
