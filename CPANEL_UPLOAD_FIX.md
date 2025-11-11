# cPanel File Upload Issue - Diagnostic & Fix Guide

## Problem
The logs show: `"has_file":false` - The file is NOT reaching the Laravel server at all.

## Immediate Steps to Diagnose

### Step 1: Check Upload Configuration on cPanel
1. Upload the file `public/check-upload-config.php` to your cPanel
2. Visit: `https://yourdomain.com/check-upload-config.php`
3. Look for these issues:
   - ❌ `file_uploads` = Off (must be On)
   - ❌ `upload_max_filesize` < 5M (increase to at least 10M)
   - ❌ `post_max_size` < 10M (increase to at least 20M)
   - ❌ Temp directory not writable
   - ❌ Storage directory doesn't exist or not writable
   - ❌ Symlink doesn't exist

4. **Use the test upload form** on that page to verify basic PHP uploads work
5. **DELETE the file** after checking!

### Step 2: Fix PHP Upload Limits on cPanel

Create or edit `.user.ini` file in the `public` directory:

```ini
file_uploads = On
upload_max_filesize = 20M
post_max_size = 25M
max_file_uploads = 20
memory_limit = 256M
max_execution_time = 300
```

**Wait 5-10 minutes** for changes to take effect, or restart PHP-FPM in cPanel:
- cPanel → MultiPHP Manager → select your domain → Apply

### Step 3: Create Required Directories

Via SSH or cPanel Terminal:
```bash
cd /home/yourusername/public_html/yourlaravelroot
mkdir -p storage/app/public/index-page/logos
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

Via cPanel File Manager:
1. Navigate to `storage/app/public/`
2. Create folder: `index-page`
3. Inside `index-page`, create folder: `logos`
4. Right-click `storage` → Change Permissions → 755 (recursively)

### Step 4: Create Storage Symlink

**Option A - Via SSH:**
```bash
php artisan storage:link
```

**Option B - Via cPanel Terminal:**
```bash
cd /home/yourusername/public_html/yourlaravelroot
php artisan storage:link
```

**Option C - Without SSH (use temporary PHP file):**

Create `public/create-symlink-temp.php`:
```php
<?php
$target = __DIR__ . '/../storage/app/public';
$link = __DIR__ . '/storage';

if (file_exists($link)) {
    if (is_link($link)) {
        echo "Symlink already exists!";
    } else {
        echo "A directory named 'storage' exists. Please rename it first.";
    }
} else {
    if (symlink($target, $link)) {
        echo "✓ Symlink created successfully!";
    } else {
        echo "✗ Failed. Contact hosting provider to enable symlink function.";
    }
}
// DELETE THIS FILE AFTER RUNNING!
?>
```

Visit it once, then **DELETE IT**.

### Step 5: Check .htaccess

Ensure `public/.htaccess` has proper settings:
```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>

# Increase upload size limits (if mod_php)
<IfModule mod_php.c>
    php_value upload_max_filesize 20M
    php_value post_max_size 25M
</IfModule>
```

### Step 6: Update .env on cPanel

Make sure your production `.env` has:
```env
FILESYSTEM_DISK=public
APP_URL=https://yourdomain.com
```

### Step 7: Clear All Caches

Via SSH/Terminal:
```bash
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
composer dump-autoload
```

Or create `public/clear-cache-temp.php`:
```php
<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$commands = ['config:clear', 'cache:clear', 'view:clear', 'route:clear'];
foreach ($commands as $command) {
    $kernel->call($command);
    echo "✓ $command\n";
}
echo "\n✓ All caches cleared!";
// DELETE THIS FILE AFTER RUNNING!
?>
```

## Common cPanel-Specific Issues

### Issue 1: Symlink Disabled
Some shared hosts disable `symlink()` for security. Solutions:

1. **Ask hosting support** to enable symlink function
2. **Or manually copy** storage files:
   ```bash
   cp -r storage/app/public public/storage
   ```
   (But you'll need to do this every time you upload new files)

3. **Or use a different storage disk** (like S3)

### Issue 2: ModSecurity Blocking
Some cPanel servers have ModSecurity that blocks file uploads. Check:

1. cPanel → ModSecurity → View Modsec Logs
2. If you see blocks, add rules to whitelist your domain

### Issue 3: Suhosin/Security Extensions
Some hosts have Suhosin which limits POST data:

Add to `.user.ini`:
```ini
suhosin.post.max_value_length = 25000000
suhosin.request.max_value_length = 25000000
```

### Issue 4: Wrong Document Root
Make sure your domain points to the `public` folder:

In cPanel → Domains → Manage → Document Root should be: `/public_html/yourlaravelroot/public`

## Test Again

After applying fixes:

1. Visit your admin panel
2. Open browser console (F12)
3. Try to add a logo
4. Check console for the debug log showing file info
5. If still failing, check `storage/logs/laravel.log` for detailed errors

## Still Not Working?

If after all these steps it still shows `has_file: false`, the issue is likely:

1. **cPanel blocks file uploads** - Contact hosting support
2. **Wrong PHP handler** - Try switching from CGI to FastCGI or vice versa
3. **Firewall/WAF blocking** - Check firewall logs in cPanel
4. **Wrong multipart/form-data encoding** - Check browser Network tab

Let me know what you find and we'll fix it!
