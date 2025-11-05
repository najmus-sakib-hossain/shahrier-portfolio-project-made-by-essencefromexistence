# 📋 Quick Deployment Checklist

## Pre-Deployment ✅

- [x] App name updated to "Notes of Shahrier"
- [x] Frontend built (`npm run build` completed successfully)
- [x] Config cached (`php artisan config:cache`)
- [x] Routes cached (`php artisan route:cache`)
- [x] Views cached (`php artisan view:cache`)
- [x] Default admin user created: shahrier@gmail.com
- [x] All asset paths updated to use `/assets/` direct paths
- [x] All database seeders ready with correct image paths

## Files to Exclude from Upload

```
❌ node_modules/
❌ vendor/ (regenerate on server)
❌ .env (create new on server)
❌ storage/logs/*.log
❌ storage/framework/cache/*
❌ storage/framework/sessions/*
❌ storage/framework/views/*
❌ .git/
❌ .idea/
❌ tests/
```

## Files to Include

```
✅ app/
✅ bootstrap/
✅ config/
✅ database/
✅ public/ (including build/ and assets/)
✅ resources/
✅ routes/
✅ storage/ (folders only)
✅ artisan
✅ composer.json
✅ composer.lock
✅ package.json
✅ .htaccess files
```

## On cPanel

### 1. Upload & Extract
- [ ] Upload ZIP to server
- [ ] Extract to appropriate directory
- [ ] Move files to correct structure (public folder separate)

### 2. Create .env File
- [ ] Copy `.env.example` to `.env`
- [ ] Update `APP_NAME="Notes of Shahrier"`
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Update `APP_URL` to your domain
- [ ] Configure database credentials

### 3. Database Setup
- [ ] Create MySQL database in cPanel
- [ ] Create database user
- [ ] Assign user to database (ALL PRIVILEGES)
- [ ] Update `.env` with credentials

### 4. Install Dependencies
- [ ] Run `composer install --optimize-autoloader --no-dev`
- [ ] Or upload `vendor/` folder

### 5. Laravel Setup
- [ ] Run `php artisan key:generate`
- [ ] Run `php artisan migrate --force`
- [ ] Run `php artisan db:seed --force`
- [ ] Run `php artisan storage:link`

### 6. File Permissions
- [ ] Set `storage/` to 755
- [ ] Set `bootstrap/cache/` to 755
- [ ] Verify `.env` is NOT publicly accessible

### 7. Cache & Optimize
- [ ] Run `php artisan config:cache`
- [ ] Run `php artisan route:cache`
- [ ] Run `php artisan view:cache`

### 8. Security
- [ ] Verify `APP_DEBUG=false`
- [ ] Verify `APP_ENV=production`
- [ ] Test `.env` not accessible via browser
- [ ] Enable HTTPS/SSL

### 9. Test Everything
- [ ] Visit homepage
- [ ] Test login with shahrier@gmail.com
- [ ] Check all frontend pages load
- [ ] Test admin dashboard
- [ ] Verify images display correctly
- [ ] Test CRUD operations
- [ ] Check mobile responsiveness

### 10. Setup Cron (Optional)
- [ ] Add Laravel scheduler to cron jobs

## Default Admin Credentials

```
Email: shahrier@gmail.com
Password: shahrier@password
```

**⚠️ CHANGE PASSWORD AFTER FIRST LOGIN!**

## Admin Panel Features

✅ Landing Page Management
✅ Hero Sections & Statistics
✅ Blog Posts (CRUD)
✅ Books Management
✅ Events Management
✅ Videos Library
✅ Technologies & Certificates
✅ Donations
✅ Life Events
✅ About Me Content
✅ Entrepreneurship Content
✅ Profile Settings with Theme Toggle

## Frontend Pages

- `/` - Home
- `/about-me` - About Me
- `/books` - Books
- `/blogs` - Blogs
- `/events` - Events
- `/videos` - Videos
- `/technology` - Technology
- `/donation` - Donation
- `/life-events` - Life Events
- `/entrepreneurship` - Entrepreneurship
- `/contact` - Contact

## Troubleshooting

### 500 Error
1. Check `storage/logs/laravel.log`
2. Verify `.htaccess` exists
3. Check file permissions
4. Run `php artisan config:clear`

### Assets not loading
1. Verify `public/build/` exists
2. Check `APP_URL` in `.env`
3. Run `php artisan storage:link`

### Database errors
1. Verify credentials in `.env`
2. Check user privileges
3. Test connection: `php artisan tinker` → `DB::connection()->getPdo();`

### Blank page
1. Set `APP_DEBUG=true` temporarily
2. Check PHP version (8.1+)
3. Verify `vendor/` exists
4. Run `composer dump-autoload`

## Success Indicators

✅ Homepage loads without errors
✅ Login works
✅ All images display correctly
✅ Admin dashboard accessible
✅ CRUD operations work
✅ Theme switcher works
✅ No console errors
✅ Mobile responsive
✅ HTTPS enabled

---

**Deployment Status: READY FOR PRODUCTION! 🚀**
