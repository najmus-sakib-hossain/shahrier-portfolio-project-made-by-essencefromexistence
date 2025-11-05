# Chart Integration with Laravel Backend

This document describes how the interactive area chart has been integrated with the Laravel backend.

## Overview

The chart component (`chart-area-interactive.tsx`) now fetches real-time data from the Laravel backend instead of using static dummy data.

## Features

- **Real-time Data**: Chart displays actual visitor statistics based on content activity
- **Dynamic Time Ranges**: Support for 7 days, 30 days, and 90 days views
- **Loading States**: Shows loading indicator while fetching data
- **Error Handling**: Gracefully handles API errors

## API Endpoints

### 1. Get Visitor Statistics
**Endpoint**: `GET /api/activity/visitors`

**Parameters**:
- `days` (optional, default: 90): Number of days to retrieve data for

**Response**:
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

### 2. Get Recent Activity
**Endpoint**: `GET /api/activity/recent`

**Parameters**:
- `days` (optional, default: 90): Number of days to retrieve data for

**Response**:
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

### 3. Get Content Statistics
**Endpoint**: `GET /api/activity/content-stats`

**Response**:
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

## Implementation Details

### Backend

**Controller**: `app/Http/Controllers/Api/ActivityController.php`
- `getVisitorStats()`: Returns desktop/mobile visitor data based on content activity
- `getRecentActivity()`: Returns aggregated content creation activity
- `getContentStats()`: Returns overall content statistics

**Routes**: Defined in `routes/web.php`
```php
Route::prefix('api')->name('api.')->group(function () {
    Route::get('/activity/recent', [ActivityController::class, 'getRecentActivity']);
    Route::get('/activity/visitors', [ActivityController::class, 'getVisitorStats']);
    Route::get('/activity/content-stats', [ActivityController::class, 'getContentStats']);
});
```

### Frontend

**Component**: `resources/js/components/chart-area-interactive.tsx`
- Uses React hooks (`useEffect`, `useState`) to fetch data
- Automatically refetches when time range changes
- Displays loading/error states

**Usage**:
```tsx
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

// In your component
<ChartAreaInteractive />
```

## Bug Fixes

### Fixed: Videos Table Column Error
**Error**: `SQLSTATE[42S22]: Column not found: 1054 Unknown column 'published_at'`

**Solution**: Changed `VideoController` to use `created_at` instead of `published_at` for ordering:
```php
// Before
$videos = Video::where('is_short', false)
    ->orderBy('published_at', 'desc')
    ->get();

// After
$videos = Video::where('is_short', false)
    ->orderBy('created_at', 'desc')
    ->get();
```

## Future Enhancements

1. **Real Analytics Integration**: Replace simulated visitor data with actual analytics from Google Analytics, Plausible, or similar
2. **Caching**: Add Redis/cache layer to improve performance for frequently accessed data
3. **More Chart Types**: Add bar charts, pie charts for different metrics
4. **Real-time Updates**: Use WebSockets or polling for live data updates
5. **Export Functionality**: Allow users to export chart data as CSV/PDF

## Testing

Test the API endpoints:
```bash
# Test visitor stats
curl http://127.0.0.1:8000/api/activity/visitors?days=7

# Test recent activity
curl http://127.0.0.1:8000/api/activity/recent?days=30

# Test content stats
curl http://127.0.0.1:8000/api/activity/content-stats
```

## Notes

- The current visitor statistics are calculated based on content activity (blog posts, videos, events, books)
- Desktop/Mobile split is simulated (60/40 ratio with random variance)
- To integrate real visitor data, replace the calculation logic in `getVisitorStats()` with actual analytics data
