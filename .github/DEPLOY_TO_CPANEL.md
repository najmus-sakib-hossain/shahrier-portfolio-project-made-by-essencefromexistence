# Deploy to cPanel - Complete Guide

## ✅ Issues Fixed in This Codebase

1. ✅ **Duplicate Migration Removed**: Deleted `2025_11_04_170837_add_avatar_to_users_table.php`
2. ✅ **Root .htaccess Created**: Added `.htaccess` in root directory for cPanel
3. ✅ **Production .env Updated**: Set to production mode with correct database credentials
4. ✅ **Public .htaccess Exists**: Already has proper Laravel routes configuration

## 📋 Deployment Steps for cPanel

### Step 1: Upload Files
Upload all files to `/home/notesofs/public_html/` via:
- File Manager (cPanel)
- FTP Client (FileZilla)
- Git (if available)

### Step 2: Upload the Root .htaccess File
**CRITICAL**: Upload the `.htaccess` file from the root of this project to `/home/notesofs/public_html/.htaccess`

This file contains:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

This redirects all requests to the `public` folder where Laravel's entry point is.

### Step 3: Verify Document Root in cPanel
1. Login to cPanel
2. Go to **Domains** section
3. Click on your domain
4. **Document Root** should be: `/home/notesofs/public_html`
5. If it says `/home/notesofs/public_html/public`, change it to `/home/notesofs/public_html`

### Step 4: Database Already Configured
Your `.env` file is already configured with:
```
DB_DATABASE=notesofs_shahriar
DB_USERNAME=notesofs_shahriar
DB_PASSWORD=notesofs_shahriar
```

### Step 5: Run These Commands on Server (via SSH or Terminal in cPanel)

```bash
# Navigate to your directory
cd /home/notesofs/public_html

# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Run migrations (database is already migrated, but run to be safe)
php artisan migrate --force

# Re-cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create storage symlink manually (since exec() is disabled)
cd public
ln -s ../storage/app/public storage
cd ..

# Set correct permissions
chmod -R 755 storage bootstrap/cache
```

### Step 6: Verify PHP Version
```bash
php -v
```
Should show **PHP 8.2 or higher**. If not:
1. Go to cPanel → **Select PHP Version**
2. Select **PHP 8.2** or **PHP 8.3**

### Step 7: Check if Website Works
Visit: https://notesofshahrier.com

If you still get 503:
1. Check `.htaccess` exists: `ls -la /home/notesofs/public_html/.htaccess`
2. Check Laravel logs: `tail -50 storage/logs/laravel.log`
3. Verify document root is `/home/notesofs/public_html` (not `/home/notesofs/public_html/public`)

## 🔧 Troubleshooting

### If .htaccess Keeps Getting Deleted
Some security plugins remove .htaccess files. To prevent this:
1. Make file immutable: `chattr +i /home/notesofs/public_html/.htaccess`
2. Or disable security plugin temporarily
3. Contact hosting support

### If You See Blank Page Instead of 503
Check file permissions:
```bash
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

### Manual Storage Link (Since exec() is Disabled)
```bash
cd /home/notesofs/public_html/public
ln -s ../storage/app/public storage
```

## 🎯 Admin Login
After deployment works:
- URL: https://notesofshahrier.com/admin/login
- Email: `shahrier@gmail.com`
- Password: `shahrier@password`

## 📁 File Structure on Server
```
/home/notesofs/public_html/
├── .htaccess              ← Root .htaccess (redirects to public/)
├── .env                   ← Production environment config
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
│   ├── .htaccess          ← Laravel .htaccess (handles routes)
│   ├── index.php          ← Entry point
│   ├── build/             ← Frontend assets
│   ├── assets/            ← Images
│   └── storage → ../storage/app/public
├── resources/
├── routes/
├── storage/
└── vendor/
```

## ✅ What's Already Done
- ✅ Frontend built for production (`npm run build` completed)
- ✅ All assets organized in `public/assets/`
- ✅ Database structure created (23 tables)
- ✅ All seeders completed (sample data loaded)
- ✅ Admin user created
- ✅ Production .env configured
- ✅ Both .htaccess files ready

## 🚀 Next Steps
1. Upload `.htaccess` from root to server
2. Verify document root in cPanel
3. Run the commands in Step 5
4. Visit your website!
