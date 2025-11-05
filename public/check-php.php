<?php
// Quick PHP Environment Check
echo "<h2>PHP Configuration Check</h2>";
echo "<strong>PHP Version:</strong> " . phpversion() . "<br>";
echo "<strong>Server API:</strong> " . php_sapi_name() . "<br>";
echo "<strong>Loaded Extensions:</strong><br>";

$extensions = get_loaded_extensions();
sort($extensions);

echo "<ul>";
foreach ($extensions as $ext) {
    echo "<li>" . $ext;
    if ($ext === 'mbstring') {
        echo " <span style='color: green; font-weight: bold;'>✓ FOUND</span>";
    }
    echo "</li>";
}
echo "</ul>";

echo "<hr>";
echo "<strong>mbstring functions available:</strong> " . (function_exists('mb_split') ? '<span style="color: green;">YES ✓</span>' : '<span style="color: red; font-weight: bold;">NO ✗ (THIS IS THE PROBLEM)</span>') . "<br>";
echo "<strong>mb_split function exists:</strong> " . (function_exists('mb_split') ? 'Yes' : 'No') . "<br>";

echo "<hr>";
echo "<h3>Full PHP Info:</h3>";
phpinfo();
