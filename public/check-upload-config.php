<?php
/**
 * Upload Configuration Checker
 * Visit this file in your browser to check PHP upload settings
 * DELETE THIS FILE AFTER CHECKING!
 */

echo "<h1>PHP Upload Configuration Check</h1>";
echo "<style>body{font-family:sans-serif;padding:20px;}table{border-collapse:collapse;width:100%;}td,th{border:1px solid #ddd;padding:8px;text-align:left;}.good{color:green;}.bad{color:red;}</style>";

echo "<h2>PHP Upload Settings</h2>";
echo "<table>";
echo "<tr><th>Setting</th><th>Value</th><th>Status</th></tr>";

$settings = [
    'file_uploads' => [
        'value' => ini_get('file_uploads'),
        'expected' => 'On',
        'unit' => ''
    ],
    'upload_max_filesize' => [
        'value' => ini_get('upload_max_filesize'),
        'expected' => '>=5M',
        'unit' => ''
    ],
    'post_max_size' => [
        'value' => ini_get('post_max_size'),
        'expected' => '>=10M',
        'unit' => ''
    ],
    'max_file_uploads' => [
        'value' => ini_get('max_file_uploads'),
        'expected' => '>=20',
        'unit' => ''
    ],
    'memory_limit' => [
        'value' => ini_get('memory_limit'),
        'expected' => '>=128M',
        'unit' => ''
    ],
    'max_execution_time' => [
        'value' => ini_get('max_execution_time'),
        'expected' => '>=30',
        'unit' => 's'
    ],
];

foreach ($settings as $name => $info) {
    $value = $info['value'];
    $class = 'good';
    
    if ($name === 'file_uploads' && $value != '1' && strtolower($value) != 'on') {
        $class = 'bad';
    }
    
    echo "<tr>";
    echo "<td><strong>$name</strong></td>";
    echo "<td>$value {$info['unit']}</td>";
    echo "<td class='$class'>{$info['expected']}</td>";
    echo "</tr>";
}

echo "</table>";

echo "<h2>Upload Temp Directory</h2>";
$temp_dir = sys_get_temp_dir();
echo "<table>";
echo "<tr><th>Property</th><th>Value</th></tr>";
echo "<tr><td>Temp Directory</td><td>$temp_dir</td></tr>";
echo "<tr><td>Exists</td><td>" . (is_dir($temp_dir) ? '<span class="good">Yes</span>' : '<span class="bad">No</span>') . "</td></tr>";
echo "<tr><td>Writable</td><td>" . (is_writable($temp_dir) ? '<span class="good">Yes</span>' : '<span class="bad">No</span>') . "</td></tr>";
echo "<tr><td>upload_tmp_dir</td><td>" . (ini_get('upload_tmp_dir') ?: 'Default') . "</td></tr>";
echo "</table>";

echo "<h2>Storage Directory Check</h2>";
$storage_path = __DIR__ . '/../storage/app/public/index-page/logos';
echo "<table>";
echo "<tr><th>Property</th><th>Value</th></tr>";
echo "<tr><td>Storage Path</td><td>$storage_path</td></tr>";
echo "<tr><td>Exists</td><td>" . (is_dir($storage_path) ? '<span class="good">Yes</span>' : '<span class="bad">No</span>') . "</td></tr>";
echo "<tr><td>Writable</td><td>" . (is_writable($storage_path) ? '<span class="good">Yes</span>' : '<span class="bad">No</span>') . "</td></tr>";
if (is_dir($storage_path)) {
    echo "<tr><td>Permissions</td><td>" . substr(sprintf('%o', fileperms($storage_path)), -4) . "</td></tr>";
}
echo "</table>";

echo "<h2>Symlink Check</h2>";
$symlink = __DIR__ . '/storage';
echo "<table>";
echo "<tr><th>Property</th><th>Value</th></tr>";
echo "<tr><td>Symlink Path</td><td>$symlink</td></tr>";
echo "<tr><td>Exists</td><td>" . (file_exists($symlink) ? '<span class="good">Yes</span>' : '<span class="bad">No - Run: php artisan storage:link</span>') . "</td></tr>";
if (file_exists($symlink)) {
    echo "<tr><td>Is Symlink</td><td>" . (is_link($symlink) ? '<span class="good">Yes</span>' : '<span class="bad">No (regular directory)</span>') . "</td></tr>";
    if (is_link($symlink)) {
        echo "<tr><td>Points To</td><td>" . readlink($symlink) . "</td></tr>";
    }
}
echo "</table>";

echo "<h2>Test File Upload</h2>";
echo '<form method="post" enctype="multipart/form-data">';
echo '<input type="file" name="test_file" accept="image/*"><br><br>';
echo '<input type="submit" value="Test Upload">';
echo '</form>';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['test_file'])) {
    echo "<h3>Upload Test Result</h3>";
    echo "<table>";
    echo "<tr><th>Property</th><th>Value</th></tr>";
    echo "<tr><td>File Received</td><td>" . (isset($_FILES['test_file']) ? '<span class="good">Yes</span>' : '<span class="bad">No</span>') . "</td></tr>";
    if (isset($_FILES['test_file'])) {
        echo "<tr><td>Name</td><td>" . htmlspecialchars($_FILES['test_file']['name']) . "</td></tr>";
        echo "<tr><td>Type</td><td>" . htmlspecialchars($_FILES['test_file']['type']) . "</td></tr>";
        echo "<tr><td>Size</td><td>" . number_format($_FILES['test_file']['size'] / 1024, 2) . " KB</td></tr>";
        echo "<tr><td>Tmp Name</td><td>" . htmlspecialchars($_FILES['test_file']['tmp_name']) . "</td></tr>";
        echo "<tr><td>Error</td><td>" . $_FILES['test_file']['error'] . " - ";
        switch ($_FILES['test_file']['error']) {
            case UPLOAD_ERR_OK:
                echo '<span class="good">No error</span>';
                break;
            case UPLOAD_ERR_INI_SIZE:
                echo '<span class="bad">File exceeds upload_max_filesize</span>';
                break;
            case UPLOAD_ERR_FORM_SIZE:
                echo '<span class="bad">File exceeds MAX_FILE_SIZE</span>';
                break;
            case UPLOAD_ERR_PARTIAL:
                echo '<span class="bad">File was only partially uploaded</span>';
                break;
            case UPLOAD_ERR_NO_FILE:
                echo '<span class="bad">No file was uploaded</span>';
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                echo '<span class="bad">Missing temporary folder</span>';
                break;
            case UPLOAD_ERR_CANT_WRITE:
                echo '<span class="bad">Failed to write file to disk</span>';
                break;
            case UPLOAD_ERR_EXTENSION:
                echo '<span class="bad">PHP extension stopped the upload</span>';
                break;
            default:
                echo '<span class="bad">Unknown error</span>';
        }
        echo "</td></tr>";
        
        if ($_FILES['test_file']['error'] === UPLOAD_ERR_OK) {
            $test_dest = $storage_path . '/' . basename($_FILES['test_file']['name']);
            if (move_uploaded_file($_FILES['test_file']['tmp_name'], $test_dest)) {
                echo "<tr><td>Test Save</td><td><span class='good'>✓ Successfully saved to: $test_dest</span></td></tr>";
            } else {
                echo "<tr><td>Test Save</td><td><span class='bad'>✗ Failed to save file</span></td></tr>";
            }
        }
    }
    echo "</table>";
}

echo "<hr>";
echo "<p style='color: red;'><strong>IMPORTANT: DELETE THIS FILE AFTER CHECKING!</strong></p>";
?>
