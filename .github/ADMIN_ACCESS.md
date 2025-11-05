# Admin Access Configuration

## Admin Credentials

The application is configured for **admin-only access** with the following credentials:

- **Email:** `shahrier@gmail.com`
- **Password:** `shahrier@password`

## Security Features

### Disabled Features
The following features have been disabled to restrict access to admin only:

1. ✅ **User Registration** - Disabled
2. ✅ **Password Reset** - Disabled  
3. ✅ **Email Verification** - Disabled

### Enabled Features
- ✅ **Login** - Available at `/login`
- ✅ **Two-Factor Authentication** - Available for enhanced security
- ✅ **Dashboard** - Available at `/dashboard` (requires authentication)

## Configuration Changes

### Modified Files
1. **`config/fortify.php`**
   - Commented out `Features::registration()`
   - Commented out `Features::resetPasswords()`
   - Commented out `Features::emailVerification()`

### Database
The admin user is automatically created via the `DatabaseSeeder` class:
- File: `database/seeders/DatabaseSeeder.php`
- The user is created with `firstOrCreate()` to prevent duplicates

## How to Login

1. Navigate to `/login`
2. Enter email: `shahrier@gmail.com`
3. Enter password: `shahrier@password`
4. Click "Log in"

## Important Notes

- There is **NO** registration page or functionality
- Password reset functionality is disabled
- Only the predefined admin user can access the dashboard
- To add more users, you must manually create them via database seeder or tinker

## Adding Additional Admin Users (If Needed)

If you need to add more admin users in the future, use Laravel Tinker:

```bash
php artisan tinker
```

Then run:

```php
use Illuminate\Support\Facades\Hash;

App\Models\User::create([
    'name' => 'Admin Name',
    'email' => 'admin@example.com',
    'password' => Hash::make('your-password'),
    'email_verified_at' => now(),
]);
```

**Note:** Always use `Hash::make()` to properly hash passwords, or let Laravel's automatic hashing handle it via the model mutator.

## Updating Existing User Password

To update the password for an existing user:

```bash
php artisan tinker
```

Then run:

```php
use Illuminate\Support\Facades\Hash;

$user = App\Models\User::where('email', 'shahrier@gmail.com')->first();
$user->password = Hash::make('new-password');
$user->save();
```
