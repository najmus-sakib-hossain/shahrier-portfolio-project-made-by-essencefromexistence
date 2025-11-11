<?php
/**
 * Storage Link Diagnostic and Fix Tool
 * DELETE THIS FILE AFTER USE!
 */

echo "<h1>Storage Link Diagnostic</h1>";
echo "<style>body{font-family:sans-serif;padding:20px;}pre{background:#f4f4f4;padding:10px;}.good{color:green;}.bad{color:red;}.warning{color:orange;}</style>";

$publicStorage = __DIR__ . '/storage';
$actualStorage = __DIR__ . '/../storage/app/public';
$testFile = 'index-page/logos/6WoOf9bSPimTVBYwP4zyFusuExicktZPS5vV101G.jpg';

echo "<h2>1. Symlink Status</h2>";
echo "<table border='1' cellpadding='5'>";
echo "<tr><th>Check</th><th>Result</th><th>Status</th></tr>";

// Check if public/storage exists
echo "<tr><td>public/storage exists</td><td>";
if (file_exists($publicStorage)) {
    echo "Yes";
    echo "</td><td class='good'>✓</td></tr>";
    
    // Check if it's a symlink
    echo "<tr><td>Is symlink</td><td>";
    if (is_link($publicStorage)) {
        echo "Yes → " . readlink($publicStorage);
        echo "</td><td class='good'>✓</td></tr>";
    } else {
        echo "No (it's a directory)";
        echo "</td><td class='bad'>✗ PROBLEM!</td></tr>";
    }
} else {
    echo "No";
    echo "</td><td class='bad'>✗ MISSING!</td></tr>";
}

// Check actual storage directory
echo "<tr><td>storage/app/public exists</td><td>";
if (file_exists($actualStorage)) {
    echo "Yes";
    echo "</td><td class='good'>✓</td></tr>";
} else {
    echo "No";
    echo "</td><td class='bad'>✗ MISSING!</td></tr>";
}

// Check permissions
if (file_exists($actualStorage)) {
    echo "<tr><td>storage/app/public writable</td><td>";
    if (is_writable($actualStorage)) {
        echo "Yes";
        echo "</td><td class='good'>✓</td></tr>";
    } else {
        echo "No";
        echo "</td><td class='bad'>✗ NOT WRITABLE!</td></tr>";
    }
    
    echo "<tr><td>storage/app/public permissions</td><td>";
    echo substr(sprintf('%o', fileperms($actualStorage)), -4);
    echo "</td><td class='warning'>Should be 755</td></tr>";
}

echo "</table>";

echo "<h2>2. Test File Access</h2>";
$testFileFull = $actualStorage . '/' . $testFile;
echo "<table border='1' cellpadding='5'>";
echo "<tr><th>Check</th><th>Result</th><th>Status</th></tr>";

echo "<tr><td>File exists in storage</td><td>";
if (file_exists($testFileFull)) {
    echo "Yes: " . $testFileFull;
    echo "</td><td class='good'>✓</td></tr>";
    
    echo "<tr><td>File readable</td><td>";
    if (is_readable($testFileFull)) {
        echo "Yes";
        echo "</td><td class='good'>✓</td></tr>";
    } else {
        echo "No";
        echo "</td><td class='bad'>✗ NOT READABLE!</td></tr>";
    }
    
    echo "<tr><td>File permissions</td><td>";
    echo substr(sprintf('%o', fileperms($testFileFull)), -4);
    echo "</td><td class='warning'>Should be 644</td></tr>";
    
    echo "<tr><td>File size</td><td>";
    echo number_format(filesize($testFileFull)) . " bytes";
    echo "</td><td class='good'>✓</td></tr>";
} else {
    echo "No";
    echo "</td><td class='bad'>✗ FILE NOT FOUND!</td></tr>";
}

// Check via symlink
$testViaSymlink = $publicStorage . '/' . $testFile;
echo "<tr><td>Accessible via symlink</td><td>";
if (file_exists($testViaSymlink)) {
    echo "Yes: " . $testViaSymlink;
    echo "</td><td class='good'>✓</td></tr>";
} else {
    echo "No";
    echo "</td><td class='bad'>✗ SYMLINK BROKEN!</td></tr>";
}

echo "</table>";

echo "<h2>3. Quick Fixes</h2>";

// Fix 1: Delete and recreate symlink
if (isset($_GET['fix']) && $_GET['fix'] == 'symlink') {
    echo "<div style='background:#ffffcc;padding:10px;margin:10px 0;'>";
    
    // Remove existing
    if (file_exists($publicStorage)) {
        if (is_link($publicStorage)) {
            unlink($publicStorage);
            echo "✓ Removed old symlink<br>";
        } else {
            // It's a directory, can't automatically remove
            echo "<span class='bad'>✗ public/storage is a directory, not a symlink. Please delete it manually first!</span><br>";
        }
    }
    
    // Create new symlink
    if (!file_exists($publicStorage)) {
        if (symlink($actualStorage, $publicStorage)) {
            echo "✓ Created new symlink successfully!<br>";
            echo "Reload this page to verify.";
        } else {
            echo "<span class='bad'>✗ Failed to create symlink. Your hosting might not allow symlinks.</span><br>";
        }
    }
    
    echo "</div>";
}

// Fix 2: Set permissions
if (isset($_GET['fix']) && $_GET['fix'] == 'permissions') {
    echo "<div style='background:#ffffcc;padding:10px;margin:10px 0;'>";
    
    if (file_exists($actualStorage)) {
        chmod($actualStorage, 0755);
        echo "✓ Set storage/app/public to 755<br>";
        
        $logoDir = $actualStorage . '/index-page/logos';
        if (file_exists($logoDir)) {
            chmod($actualStorage . '/index-page', 0755);
            chmod($logoDir, 0755);
            echo "✓ Set logo directories to 755<br>";
            
            // Set all files to 644
            $files = glob($logoDir . '/*');
            foreach ($files as $file) {
                if (is_file($file)) {
                    chmod($file, 0644);
                }
            }
            echo "✓ Set all logo files to 644<br>";
        }
        
        echo "Reload this page to verify.";
    }
    
    echo "</div>";
}

if (!isset($_GET['fix'])) {
    echo "<p><strong>Available Fixes:</strong></p>";
    echo "<p><a href='?fix=symlink' style='background:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;'>Fix Symlink</a></p>";
    echo "<p><a href='?fix=permissions' style='background:#28a745;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;'>Fix Permissions</a></p>";
}

echo "<hr>";
echo "<h2>4. Manual Fix Instructions</h2>";
echo "<div style='background:#f8f9fa;padding:15px;'>";
echo "<p><strong>If symlink doesn't work (some hosts block it):</strong></p>";
echo "<pre>1. Delete public/storage if it exists
2. Copy storage/app/public to public/storage
3. Set permissions: chmod -R 755 public/storage</pre>";

echo "<p><strong>Via cPanel File Manager:</strong></p>";
echo "<pre>1. Navigate to storage/app/public/
2. Select all folders and files
3. Right-click → Change Permissions
4. Folders: 755, Files: 644
5. Check 'Recurse into subdirectories'</pre>";
echo "</div>";

echo "<hr>";
echo "<p style='color:red;font-weight:bold;'>⚠️ DELETE THIS FILE AFTER FIXING! (storage-diagnostic.php)</p>";
?>
