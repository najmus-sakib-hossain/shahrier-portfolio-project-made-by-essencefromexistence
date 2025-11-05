# 📦 cPanel Deployment Guide - Laravel Inertia React Portfolio

## ✅ Pre-Deployment Checklist

Your project is now production-ready with:
- ✅ App name changed to "Notes of Shahrier"
- ✅ Default admin user: shahrier@gmail.com / shahrier@password
- ✅ Frontend assets built and optimized
- ✅ Configuration, routes, and views cached
- ✅ All backend integrations complete

---

## 🚀 Step-by-Step cPanel Deployment

### Step 1: Prepare Your Files

1. **Create a ZIP of your project** (exclude these folders/files):
   ```bash
   # Exclude:
   - node_modules/
   - vendor/ (will be regenerated)
   - .env (create new on server)
   - storage/logs/*
   - storage/framework/cache/*
   - storage/framework/sessions/*
   - storage/framework/views/*
   ```

2. **Files to include**:
   - `app/`, `bootstrap/`, `config/`, `database/`, `public/`, `resources/`, `routes/`, `storage/`
   - `artisan`, `composer.json`, `composer.lock`, `package.json`, `package-lock.json`
   - `.htaccess` files
   - All migration and seeder files

---

### Step 2: Upload to cPanel

1. **Login to cPanel**
2. **Go to File Manager**
3. **Navigate to `public_html` or your domain's root directory**
4. **Upload the ZIP file** using the Upload button
5. **Extract the ZIP file**

---

### Step 3: Configure Directory Structure

**Important**: Laravel's `public` folder should be your document root.

#### Option A: Main Domain (recommended for production)
```
/home/username/
  ├── laravel_app/          ← Your Laravel app (except public folder)
  │   ├── app/
  │   ├── bootstrap/
  │   ├── config/
  │   ├── database/
  │   ├── resources/
  │   ├── routes/
  │   ├── storage/
  │   ├── vendor/
  │   ├── artisan
  │   └── composer.json
  └── public_html/          ← Laravel's public folder contents go here
      ├── assets/
      ├── build/
      ├── index.php         ← Modified to point to laravel_app
      ├── .htaccess
      └── robots.txt
```

**Modify `public_html/index.php`**:
```php
<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// OLD: require __DIR__.'/../vendor/autoload.php';
// NEW:
require __DIR__.'/../laravel_app/vendor/autoload.php';

// OLD: $app = require_once __DIR__.'/../bootstrap/app.php';
// NEW:
$app = require_once __DIR__.'/../laravel_app/bootstrap/app.php';

// Rest remains the same...
$kernel = $app->make(Kernel::class);
$response = $kernel->handle(
    $request = Request::capture()
)->send();
$kernel->terminate($request, $response);
```

#### Option B: Subdomain
```
/home/username/
  └── subdomains/
      └── portfolio/
          ├── laravel_app/      ← Your Laravel app
          └── public_html/      ← Public folder
```

---

### Step 4: Create .env File

1. **In cPanel File Manager**, navigate to your Laravel root (`laravel_app/`)
2. **Create a new file named `.env`**
3. **Copy content from `.env.example`** or use this template:

```env
APP_NAME="Notes of Shahrier"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://yourdomain.com

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.yourhost.com
MAIL_PORT=587
MAIL_USERNAME=your_email@domain.com
MAIL_PASSWORD=your_email_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@yourdomain.com"
MAIL_FROM_NAME="${APP_NAME}"

VITE_APP_NAME="${APP_NAME}"
```

---

### Step 5: Setup Database

1. **In cPanel**, go to **MySQL Databases**
2. **Create a new database**
   - Database name: `username_portfolio`
3. **Create a new MySQL user**
   - Username: `username_admin`
   - Password: (strong password)
4. **Add user to database** with ALL PRIVILEGES
5. **Update `.env` file** with database credentials

---

### Step 6: Install Composer Dependencies

**Method 1: Using cPanel Terminal (if available)**
```bash
cd /home/username/laravel_app
php composer.phar install --optimize-autoloader --no-dev
```

**Method 2: SSH Access**
```bash
ssh username@yourdomain.com
cd laravel_app
composer install --optimize-autoloader --no-dev
```

**Method 3: Upload vendor folder** (not recommended but works)
- Run locally: `composer install --optimize-autoloader --no-dev`
- ZIP the `vendor` folder
- Upload and extract to `laravel_app/vendor/`

---

### Step 7: Generate Application Key

**Using Terminal/SSH:**
```bash
cd /home/username/laravel_app
php artisan key:generate
```

**Manual method:**
1. Run locally: `php artisan key:generate --show`
2. Copy the generated key
3. Paste into `.env` file: `APP_KEY=base64:...`

---

### Step 8: Set File Permissions

**Using File Manager:**
```
storage/                    → 755 (folders) / 644 (files)
storage/framework/          → 755
storage/framework/cache/    → 755
storage/framework/sessions/ → 755
storage/framework/views/    → 755
storage/logs/               → 755
bootstrap/cache/            → 755
```

**Using Terminal/SSH:**
```bash
cd /home/username/laravel_app
chmod -R 755 storage
chmod -R 755 bootstrap/cache
chmod -R 644 storage/logs
```

---

### Step 9: Run Migrations and Seeders

**Using Terminal/SSH:**
```bash
cd /home/username/laravel_app
php artisan migrate --force
php artisan db:seed --force
```

**Important Database Seeding:**
This will create:
- Admin user: **shahrier@gmail.com** / **shahrier@password**
- All sample content (blogs, books, events, videos, technologies, etc.)
- 14 seeders will run

---

### Step 10: Clear and Cache Config

```bash
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

### Step 11: Setup Storage Link

```bash
php artisan storage:link
```

This creates a symlink from `public/storage` to `storage/app/public`.

---

### Step 12: Configure .htaccess

**In `public_html/.htaccess`** (Laravel's public folder):
```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>

# Disable directory browsing
Options -Indexes

# Prevent access to .env
<Files .env>
    Order allow,deny
    Deny from all
</Files>
```

---

## 🔐 Security Checklist

- [ ] `APP_DEBUG=false` in production `.env`
- [ ] `APP_ENV=production` in `.env`
- [ ] Strong `DB_PASSWORD`
- [ ] `.env` file is NOT in public directory
- [ ] `storage/` and `bootstrap/cache/` are writable
- [ ] HTTPS/SSL certificate installed
- [ ] Default passwords changed
- [ ] File permissions set correctly (755/644)

---

## 📝 Post-Deployment Tasks

### 1. Test the Website
- [ ] Visit `https://yourdomain.com`
- [ ] Test login: `shahrier@gmail.com` / `shahrier@password`
- [ ] Check all frontend pages (Home, About, Books, Blogs, Events, etc.)
- [ ] Test admin dashboard at `/admin`
- [ ] Test CRUD operations

### 2. Setup Scheduled Tasks (Cron Jobs)
In cPanel → Cron Jobs, add:
```
* * * * * cd /home/username/laravel_app && php artisan schedule:run >> /dev/null 2>&1
```

### 3. Setup Queue Worker (if using queues)
```bash
php artisan queue:work --daemon
```

### 4. Monitor Logs
Check `storage/logs/laravel.log` for errors

---

## 🔧 Common Issues & Solutions

### Issue 1: 500 Internal Server Error
**Solution:**
- Check `.htaccess` is present
- Verify file permissions (755/644)
- Check `storage/logs/laravel.log`
- Run: `php artisan config:clear`

### Issue 2: Assets not loading (CSS/JS)
**Solution:**
- Verify `public/build/` folder exists
- Check `APP_URL` in `.env` matches your domain
- Run: `php artisan storage:link`

### Issue 3: Database connection error
**Solution:**
- Verify database credentials in `.env`
- Check database user has privileges
- Test: `php artisan tinker` then `DB::connection()->getPdo();`

### Issue 4: Blank page / White screen
**Solution:**
- Set `APP_DEBUG=true` temporarily to see errors
- Check PHP version (requires PHP 8.1+)
- Verify `vendor/` folder exists
- Run: `composer dump-autoload`

### Issue 5: Images not displaying
**Solution:**
- Verify `public/assets/` folder is uploaded
- Check file permissions
- Run: `php artisan storage:link`
- Verify image paths in database seeders

---

## 📊 Performance Optimization

### 1. Enable OPcache
In cPanel → Select PHP Version → Options:
- Enable OPcache
- opcache.enable = On
- opcache.memory_consumption = 128

### 2. Use Production Config
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 3. Optimize Composer Autoloader
```bash
composer install --optimize-autoloader --no-dev
composer dump-autoload --optimize
```

---

## 🆘 Support & Maintenance

### Update Commands (for future updates)
```bash
# Pull latest code
git pull origin main

# Install dependencies
composer install --no-dev
npm ci

# Build assets
npm run build

# Clear cache
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# Re-cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force
```

---

## 📱 Admin Panel Access

**Login URL:** `https://yourdomain.com/login`

**Default Credentials:**
- Email: `shahrier@gmail.com`
- Password: `shahrier@password`

**⚠️ IMPORTANT:** Change the password after first login!

**Admin Features:**
- ✅ Manage Landing Page Content
- ✅ Hero Sections & Statistics
- ✅ Blog Posts (Create, Edit, Delete)
- ✅ Books Management
- ✅ Events (Active & Past)
- ✅ Videos Library
- ✅ Technologies & Certifications
- ✅ Donations Management
- ✅ Life Events Timeline
- ✅ About Me Sections (Awards, Certificates)
- ✅ Entrepreneurship Content
- ✅ Profile Settings with Theme Toggle (Light/Dark/System)

---

## 🎉 Deployment Complete!

Your Laravel Inertia React portfolio is now live!

**Frontend Pages:**
- Home: `/`
- About Me: `/about-me`
- Books: `/books`
- Blogs: `/blogs`
- Events: `/events`
- Videos: `/videos`
- Technology: `/technology`
- Donation: `/donation`
- Life Events: `/life-events`
- Entrepreneurship: `/entrepreneurship`
- Contact: `/contact`

**Admin Dashboard:** `/admin`

**Settings:** `/settings/profile`

---

## 📞 Need Help?

If you encounter any issues:
1. Check `storage/logs/laravel.log`
2. Enable `APP_DEBUG=true` temporarily
3. Verify all environment variables in `.env`
4. Check PHP version compatibility (8.1+)
5. Ensure all dependencies are installed
6. Verify database migrations ran successfully

---

**Happy Deploying! 🚀**
