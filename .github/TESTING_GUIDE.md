# Testing Guide - Chart Integration

## Prerequisites

1. Ensure your development server is running:
   ```bash
   php artisan serve
   ```

2. Make sure the database is set up and migrations have been run:
   ```bash
   php artisan migrate
   ```

## Test 1: Verify the Video Controller Fix

### Before Fix
You would see this error when visiting `/videos`:
```
SQLSTATE[42S22]: Column not found: 1054 Unknown column 'published_at' in 'order clause'
```

### After Fix
1. Visit: `http://127.0.0.1:8000/videos`
2. The page should load without errors
3. Videos should be displayed (if any exist in the database)

### Test Command
```bash
# If server is running on 127.0.0.1:8000
curl -I http://127.0.0.1:8000/videos
```

**Expected Result**: HTTP 200 OK (or 302 redirect)

## Test 2: API Endpoints

### Test Visitor Statistics
```bash
# 7 days
curl http://127.0.0.1:8000/api/activity/visitors?days=7

# 30 days  
curl http://127.0.0.1:8000/api/activity/visitors?days=30

# 90 days
curl http://127.0.0.1:8000/api/activity/visitors?days=90
```

**Expected Response**:
```json
{
  "success": true,
  "data": [
    {
      "date": "2025-11-04",
      "desktop": 150,
      "mobile": 120
    },
    ...
  ]
}
```

### Test Recent Activity
```bash
curl http://127.0.0.1:8000/api/activity/recent?days=30
```

**Expected Response**:
```json
{
  "success": true,
  "data": [
    {
      "date": "2025-11-04",
      "blog_posts": 2,
      "videos": 1,
      "events": 0,
      "books": 1,
      "total": 4
    },
    ...
  ]
}
```

### Test Content Statistics
```bash
curl http://127.0.0.1:8000/api/activity/content-stats
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "total_blog_posts": 10,
    "total_videos": 5,
    "total_events": 3,
    "total_books": 8,
    "recent_blog_posts": 2,
    "recent_videos": 1,
    "recent_events": 0,
    "recent_books": 1
  }
}
```

## Test 3: Chart Component in Browser

### Using Browser DevTools

1. Open your dashboard page where the chart is displayed
2. Open Browser DevTools (F12)
3. Go to the Network tab
4. Look for requests to `/api/activity/visitors`
5. Verify the response is successful (200 OK)
6. Check the response data is in the expected format

### Visual Testing

1. Load the page with the chart component
2. You should see:
   - A loading message while data is fetching
   - The chart renders with data from the API
   - Time range toggles (7d, 30d, 90d) work
   - Chart updates when you change the time range

### Error Handling

Test error handling by:
1. Stopping the Laravel server
2. Refresh the page with the chart
3. You should see an error message: "Error: Failed to fetch visitor data"

## Test 4: Verify Routes

```bash
php artisan route:list --path=api
```

**Expected Output**:
```
GET|HEAD  api/activity/content-stats
GET|HEAD  api/activity/recent
GET|HEAD  api/activity/visitors
```

## Test 5: Database Queries

Check that the controller is querying the correct tables:

```bash
# Enable query logging in Laravel
# Add this to your controller temporarily to see queries
DB::enableQueryLog();
// ... your code ...
dd(DB::getQueryLog());
```

**Expected Queries**:
- Should query: `blog_posts`, `videos`, `events`, `books`
- Should use: `created_at` column (not `published_at`)
- Should group by: `DATE(created_at)`

## Troubleshooting

### Issue: API returns 404
**Solution**: Clear route cache
```bash
php artisan route:clear
php artisan optimize:clear
```

### Issue: Chart shows "No data available"
**Possible causes**:
1. Database is empty (no blog posts, videos, etc.)
2. API endpoint is not returning data correctly

**Solution**: 
```bash
# Check if you have data in the database
php artisan tinker
>>> App\Models\BlogPost::count()
>>> App\Models\Video::count()
>>> App\Models\Event::count()
>>> App\Models\Book::count()
```

If counts are 0, seed the database:
```bash
php artisan db:seed
```

### Issue: Chart shows loading forever
**Possible causes**:
1. Server is not running
2. JavaScript error in console
3. CORS issues

**Solution**:
1. Check browser console for errors
2. Verify server is running: `php artisan serve`
3. Check Network tab for failed requests

### Issue: Build error with profile routes
**Note**: There's an existing build error in `resources/js/routes/profile/index.ts` (duplicate 'update' identifier) that's unrelated to our changes. This doesn't affect the chart functionality at runtime.

## Success Criteria

✅ Video page loads without database errors
✅ API endpoints return data in correct format
✅ Chart component fetches and displays data
✅ Time range selector works and updates the chart
✅ Loading and error states display correctly
✅ No console errors related to the chart

## Next Steps

After successful testing:

1. **Monitor Performance**: Check query performance with large datasets
2. **Add Caching**: Implement Redis caching for API responses
3. **Real Analytics**: Replace simulated data with real analytics
4. **Rate Limiting**: Add rate limiting to API endpoints
5. **Authentication**: Consider adding authentication if needed
