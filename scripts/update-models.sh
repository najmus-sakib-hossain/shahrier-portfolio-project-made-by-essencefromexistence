#!/bin/bash

# This script updates all model files with fillable properties

echo "Updating Laravel Models with fillable properties..."

# Update HeroSection Model
cat > app/Models/HeroSection.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'image_url',
        'tagline',
        'description',
        'social_links',
        'is_active',
        'order',
    ];

    protected $casts = [
        'social_links' => 'array',
        'is_active' => 'boolean',
    ];
}
EOF

# Update Statistic Model
cat > app/Models/Statistic.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    protected $fillable = [
        'label',
        'value',
        'icon',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
EOF

# Update Book Model
cat > app/Models/Book.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'cover_image',
        'description',
        'summary',
        'highlights',
        'review',
        'rating',
        'isbn',
        'read_date',
        'is_recommended',
        'order',
    ];

    protected $casts = [
        'read_date' => 'date',
        'is_recommended' => 'boolean',
    ];
}
EOF

# Update Event Model
cat > app/Models/Event.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'location',
        'event_date',
        'event_time',
        'category',
        'organizer',
        'is_featured',
        'is_past',
    ];

    protected $casts = [
        'event_date' => 'date',
        'is_featured' => 'boolean',
        'is_past' => 'boolean',
    ];
}
EOF

# Update Video Model
cat > app/Models/Video.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'title',
        'description',
        'video_url',
        'thumbnail',
        'platform',
        'category',
        'duration',
        'is_short',
        'views',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'date',
        'is_short' => 'boolean',
    ];
}
EOF

# Update Technology Model
cat > app/Models/Technology.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Technology extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'category',
        'content',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];
}
EOF

# Update Donation Model
cat > app/Models/Donation.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'goal_amount',
        'raised_amount',
        'category',
        'end_date',
        'is_active',
        'beneficiary_info',
    ];

    protected $casts = [
        'goal_amount' => 'decimal:2',
        'raised_amount' => 'decimal:2',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];
}
EOF

# Update LifeEvent Model
cat > app/Models/LifeEvent.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LifeEvent extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'event_date',
        'category',
        'location',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'event_date' => 'date',
        'is_featured' => 'boolean',
    ];
}
EOF

# Update AboutSection Model
cat > app/Models/AboutSection.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model
{
    protected $fillable = [
        'section_type',
        'title',
        'content',
        'image',
        'additional_data',
        'order',
        'is_active',
    ];

    protected $casts = [
        'additional_data' => 'array',
        'is_active' => 'boolean',
    ];
}
EOF

# Update Award Model
cat > app/Models/Award.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    protected $fillable = [
        'title',
        'description',
        'organization',
        'image',
        'award_date',
        'order',
    ];

    protected $casts = [
        'award_date' => 'date',
    ];
}
EOF

# Update Certificate Model
cat > app/Models/Certificate.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'title',
        'issuer',
        'description',
        'image',
        'certificate_url',
        'issue_date',
        'expiry_date',
        'category',
        'order',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'expiry_date' => 'date',
    ];
}
EOF

# Update EntrepreneurshipContent Model
cat > app/Models/EntrepreneurshipContent.php << 'EOF'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EntrepreneurshipContent extends Model
{
    protected $fillable = [
        'type',
        'title',
        'content',
        'image',
        'author',
        'publish_date',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'publish_date' => 'date',
        'is_featured' => 'boolean',
    ];
}
EOF

echo "✅ All models updated successfully!"
echo "📝 Next steps:"
echo "   1. Run: php artisan migrate"
echo "   2. Implement remaining admin controllers (follow BlogPostController pattern)"
echo "   3. Create admin dashboard pages for each content type"
echo "   4. Update frontend components to use backend data"
echo ""
echo "See UPDATE_MODELS.md for detailed implementation guide"
