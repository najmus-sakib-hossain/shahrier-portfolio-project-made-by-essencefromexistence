# Deployment Guide for cPanel

## Storage Setup Issues

If you're getting "The logo path failed to upload" error on cPanel, follow these steps:

### 1. Create Storage Symlink

Run this command via SSH or in cPanel Terminal:

```bash
php artisan storage:link
```

If you don't have SSH access, create a temporary PHP file in your public directory:

**public/create-storage-link.php**
```php
<?php
// Remove this file after running it once!
$target = __DIR__ . '/../storage/app/public';
$link = __DIR__ . '/storage';

if (file_exists($link)) {
    echo "Symlink already exists at: $link\n";
} else {
    if (symlink($target, $link)) {
        echo "Symlink created successfully!\n";
        echo "Target: $target\n";
        echo "Link: $link\n";
    } else {
        echo "Failed to create symlink. Contact your hosting provider.\n";
    }
}
```

Visit: `https://yourdomain.com/create-storage-link.php`

**IMPORTANT: Delete this file after running it!**

### 2. Set Storage Directory Permissions

Via SSH or cPanel File Manager, set these permissions:

```bash
chmod -R 755 storage
chmod -R 755 bootstrap/cache
chmod -R 755 storage/app/public
chmod -R 755 storage/framework
chmod -R 755 storage/logs
```

If using File Manager in cPanel:
1. Navigate to `storage` folder
2. Right-click → Change Permissions
3. Set to 755 (or check: Read, Write, Execute for Owner; Read, Execute for Group and World)
4. Check "Recurse into subdirectories"
5. Apply

### 3. Verify Storage Directories Exist

Make sure these directories exist:
- `storage/app/public/index-page/logos/`
- `storage/app/public/books/covers/`

Create them manually if needed via File Manager or SSH:

```bash
mkdir -p storage/app/public/index-page/logos
mkdir -p storage/app/public/books/covers
chmod -R 755 storage/app/public
```

### 4. Check .htaccess Configuration

Ensure your `.htaccess` in public directory has:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

### 5. Verify PHP Configuration

Check if these PHP functions are enabled:
- `symlink` - Required for storage link
- `file_put_contents` - Required for file uploads
- `mkdir` - Required for creating directories

Create a temporary file to check:

**public/check-php-functions.php**
```php
<?php
// Remove this file after checking!
$functions = ['symlink', 'file_put_contents', 'mkdir', 'chmod'];
foreach ($functions as $func) {
    echo "$func: " . (function_exists($func) ? 'Enabled' : 'DISABLED') . "\n";
}

echo "\nUpload Max Filesize: " . ini_get('upload_max_filesize') . "\n";
echo "Post Max Size: " . ini_get('post_max_size') . "\n";
echo "Memory Limit: " . ini_get('memory_limit') . "\n";

$storagePath = __DIR__ . '/../storage/app/public';
echo "\nStorage path exists: " . (file_exists($storagePath) ? 'Yes' : 'No') . "\n";
echo "Storage path writable: " . (is_writable($storagePath) ? 'Yes' : 'No') . "\n";
```

### 6. Clear Cache After Deployment

```bash
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
```

Or create a cache clearing script:

**public/clear-all-cache.php**
```php
<?php
// Remove this file after running!
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$commands = [
    'config:clear',
    'cache:clear',
    'view:clear',
    'route:clear',
];

foreach ($commands as $command) {
    $kernel->call($command);
    echo "Executed: $command\n";
}

echo "\nAll caches cleared successfully!";
```

### 7. Common cPanel Issues

**If symlink() is disabled:**
- Some shared hosting providers disable symlink for security
- Alternative: Copy storage/app/public to public/storage manually
- Or ask hosting provider to enable symlink function

**If still not working:**
- Check Laravel logs: `storage/logs/laravel.log`
- Check Apache error logs in cPanel
- Contact hosting support to verify PHP configuration

### 8. Environment Configuration

Make sure your `.env` file on cPanel has:

```env
APP_URL=https://yourdomain.com
FILESYSTEM_DISK=public
```

### 9. File Upload Limits

If you need to increase upload limits, create/edit `.user.ini` in public directory:

```ini
upload_max_filesize = 10M
post_max_size = 10M
memory_limit = 256M
max_execution_time = 300
```

Wait 5 minutes for changes to take effect, or restart PHP-FPM in cPanel.

## Testing After Deployment

1. Visit your admin panel
2. Try to add a logo
3. Check if the error message is more descriptive now
4. If still failing, check `storage/logs/laravel.log` for detailed error messages

## Quick Troubleshooting Command

Run this single command to set up everything (via SSH):

```bash
cd /path/to/your/laravel/root && \
php artisan storage:link && \
chmod -R 755 storage bootstrap/cache && \
mkdir -p storage/app/public/index-page/logos && \
mkdir -p storage/app/public/books/covers && \
php artisan config:clear && \
php artisan cache:clear && \
echo "Setup complete!"
```

Replace `/path/to/your/laravel/root` with your actual Laravel installation path on cPanel.
