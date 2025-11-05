<?php
// Clear all caches and restart Laravel
echo "<h2>Cache Clear Script</h2>";

// 1. Clear OPcache
if (function_exists('opcache_reset')) {
    if (opcache_reset()) {
        echo "✓ <span style='color: green;'>OPcache cleared successfully</span><br>";
    } else {
        echo "✗ <span style='color: red;'>Failed to clear OPcache</span><br>";
    }
} else {
    echo "⊘ OPcache not available<br>";
}

// 2. Clear realpath cache
clearstatcache(true);
echo "✓ <span style='color: green;'>Realpath cache cleared</span><br>";

// 3. Show Laravel cache clear commands
echo "<hr>";
echo "<h3>Next Steps - Run These Commands:</h3>";
echo "<pre style='background: #f4f4f4; padding: 15px;'>";
echo "cd /home/notesofs/public_html\n";
echo "php artisan config:clear\n";
echo "php artisan cache:clear\n";
echo "php artisan route:clear\n";
echo "php artisan view:clear\n";
echo "php artisan config:cache\n";
echo "php artisan route:cache\n";
echo "</pre>";

echo "<hr>";
echo "<p><strong>After running those commands, visit your homepage:</strong></p>";
echo "<p><a href='/' style='color: blue; font-size: 18px;'>https://notesofshahrier.com</a></p>";
